# Contributing to Visual Designer Plugin

Thank you for your interest in contributing to the Visual Designer Plugin! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to:
- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of Vue 3, TypeScript, and Node.js

### Setting Up Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/vs-designer-plugin.git
   cd vs-designer-plugin
   ```

2. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

4. **Run Tests**
   ```bash
   cd frontend
   npm test
   ```

## Project Structure

```
vs-designer-plugin/
├── backend/              # Node.js backend server
│   ├── src/
│   │   └── server.ts    # Express + Socket.IO server
│   └── package.json
├── frontend/            # Vue 3 frontend application
│   ├── src/
│   │   ├── modules/
│   │   │   └── designer/    # Designer feature module
│   │   │       ├── components/  # Vue components
│   │   │       ├── pages/       # Page components
│   │   │       ├── services/    # Business logic
│   │   │       ├── stores/      # Pinia stores
│   │   │       ├── types/       # TypeScript types
│   │   │       ├── composables/ # Vue composables
│   │   │       └── __tests__/   # Test files
│   │   ├── router.ts
│   │   └── main.ts
│   └── package.json
└── README.md
```

## How to Contribute

### Reporting Bugs

1. **Search Existing Issues**: Check if the bug has already been reported
2. **Create a New Issue**: Use the bug report template
3. **Include Details**:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. **Search Existing Issues**: Check if the feature has been suggested
2. **Create a Feature Request**: Describe the feature and its benefits
3. **Provide Context**: Explain the use case and potential implementation

### Submitting Pull Requests

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make Your Changes**
   - Follow the coding standards (see below)
   - Write/update tests as needed
   - Update documentation

3. **Test Your Changes**
   ```bash
   # Run tests
   cd frontend
   npm test
   
   # Build to check for errors
   npm run build
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature" # or "fix: resolve bug"
   ```
   
   Use conventional commits:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Use `const` and `let`, avoid `var`
- Prefer arrow functions for callbacks
- Use async/await over callbacks
- Add JSDoc comments for complex functions

### Vue Components

- Use `<script setup lang="ts">` syntax
- Define props with TypeScript interfaces
- Keep components focused (single responsibility)
- Extract reusable logic into composables
- Use meaningful component names (PascalCase)

Example:
```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  title: string;
  items: string[];
}

const props = defineProps<Props>();
const selectedItem = ref<string | null>(null);

const hasItems = computed(() => props.items.length > 0);
</script>
```

### Styling

- Use scoped styles in components
- Follow BEM naming convention when applicable
- Keep styles modular and reusable
- Use CSS variables for theme colors
- Ensure responsive design

### Testing

- Write tests for new features
- Maintain existing test coverage
- Use descriptive test names
- Test edge cases and error conditions
- Mock external dependencies

Example:
```typescript
describe('ComponentName', () => {
  it('should render correctly with props', () => {
    // Test implementation
  });
  
  it('should handle user interaction', () => {
    // Test implementation
  });
});
```

## Development Workflow

### Adding a New Component

1. Create component file in `frontend/src/modules/designer/components/`
2. Define TypeScript interfaces for props
3. Implement the component logic
4. Add styles (scoped)
5. Export from module
6. Write tests in `__tests__/` directory
7. Update documentation

### Adding a New Feature

1. Create a new branch
2. Plan the feature architecture
3. Implement backend changes (if needed)
4. Implement frontend changes
5. Add tests for all changes
6. Update documentation
7. Create pull request

### Fixing a Bug

1. Create a new branch
2. Write a test that reproduces the bug
3. Fix the bug
4. Verify the test passes
5. Check for regression
6. Create pull request

## Code Review Process

All pull requests will be reviewed by maintainers. The review process includes:

1. **Code Quality**: Adherence to coding standards
2. **Functionality**: Does it work as expected?
3. **Tests**: Are there adequate tests?
4. **Documentation**: Is documentation updated?
5. **Performance**: Any performance concerns?
6. **Security**: Any security issues?

## Testing Guidelines

### Unit Tests

```bash
cd frontend
npm test
```

- Test individual functions and components
- Mock dependencies and external services
- Aim for high coverage of business logic

### Integration Tests

- Test component interactions
- Verify data flow between components
- Test store mutations and actions

### E2E Tests (Future)

When Cypress is configured:
```bash
npm run test:e2e
```

- Test complete user workflows
- Verify drag-and-drop functionality
- Test code export feature

## Documentation

Update documentation when:
- Adding new features
- Changing existing behavior
- Modifying APIs or interfaces
- Adding configuration options

Documentation files:
- `README.md`: Project overview and quick start
- `USER_GUIDE.md`: Detailed usage instructions
- `CONTRIBUTING.md`: This file
- Inline code comments: For complex logic

## Performance Considerations

- Avoid unnecessary re-renders
- Use `computed` for derived state
- Implement virtual scrolling for large lists
- Lazy load components when possible
- Optimize bundle size with code splitting

## Accessibility

- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain adequate color contrast

## Release Process

1. Version bump in `package.json`
2. Update CHANGELOG.md
3. Create git tag
4. Push tag to trigger release workflow
5. Generate release notes on GitHub

## Questions?

- Open an issue for questions
- Join discussions in GitHub Discussions
- Check existing documentation
- Review closed issues and PRs

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Visual Designer Plugin!
