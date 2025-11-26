# Visual Designer User Guide

## Overview

The Visual Designer is a powerful drag-and-drop UI builder for creating Vue 3 applications visually. It features real-time collaboration, code generation, and an integrated code editor.

## Getting Started

### Starting the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on `http://localhost:3000`

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Open in Browser**
   Navigate to `http://localhost:5173`

## Interface Overview

The Visual Designer interface consists of four main areas:

### 1. Component Palette (Left Panel)

The component palette contains two sections:

- **HTML Elements**: Basic HTML5 elements
  - Div: Container element
  - Button: Interactive button
  - Input: Text input field
  - Text: Text content
  - Image: Image element
  - Section: Section container
  - Header: Header element
  - Footer: Footer element

- **Vue Components**: Pre-built Vue components
  - Card: Card component
  - Modal: Modal dialog
  - Table: Data table
  - Form: Form component

### 2. Design Canvas (Center)

The main work area where you build your UI:
- Grid background for alignment
- Visual representation of components
- Click to select components
- Remove button (×) to delete components

### 3. Properties Panel (Right Panel)

Edit the selected component's properties:
- **Component ID**: Unique identifier (read-only)
- **Type**: Component type (read-only)
- **Name**: Display name
- **Props**: Dynamic properties based on component type
- **Add Property**: Add custom properties

### 4. Code Editor (Bottom Panel)

View and edit generated code:
- **Template Tab**: Vue template code
- **Script Tab**: Component logic
- **Style Tab**: CSS styles

## How to Use

### Creating a Page

1. **Drag Components**
   - Click and hold a component from the palette
   - Drag it onto the canvas
   - Release to drop

2. **Edit Properties**
   - Click on a component in the canvas
   - The properties panel will show its details
   - Modify any property value
   - Changes are saved automatically

3. **Arrange Components**
   - Components can be reordered by dragging within the canvas
   - Remove unwanted components using the × button

4. **View Code**
   - Switch between Template, Script, and Style tabs
   - See the generated Vue code in real-time
   - Code updates as you modify components

### Exporting Your Design

1. Click the **"Export Code"** button in the header
2. A JSON file will be downloaded containing:
   - Component definitions
   - Page structures
   - Router configuration
   - Store setup

### Real-Time Collaboration

The connection status indicator shows:
- **● Connected** (green): Real-time sync is active
- **○ Disconnected** (gray): Working offline

When connected:
- Changes are synchronized across all users
- Multiple people can work on the same design
- Updates appear instantly

## Component Properties

### HTML Elements

**Div**
- class: CSS class names
- style: Inline styles

**Button**
- text: Button label
- Additional props can be added

**Input**
- type: Input type (text, email, password, etc.)
- placeholder: Placeholder text

**Text**
- content: Text content

**Image**
- src: Image URL
- alt: Alternative text

**Section, Header, Footer**
- class: CSS class names

### Vue Components

**Card**
- title: Card title
- content: Card content

**Modal**
- visible: Show/hide modal (boolean)

**Table**
- data: Table data (array)

**Form**
- fields: Form field definitions (array)

## Tips and Best Practices

### Design Tips

1. **Start with Structure**: Begin with container elements (div, section) before adding content
2. **Use Meaningful Names**: Give components descriptive names for better organization
3. **Organize Hierarchically**: Use nested components to create logical structures
4. **Test Responsively**: Consider how your design will look on different screen sizes

### Code Organization

1. **Component Naming**: Use PascalCase for component names (e.g., "UserCard", "NavigationMenu")
2. **Property Naming**: Use camelCase for properties (e.g., "userName", "isActive")
3. **Consistent Styling**: Define common styles and reuse class names

### Workflow Suggestions

1. **Sketch First**: Plan your layout before building
2. **Iterate**: Build incrementally, testing as you go
3. **Export Regularly**: Save your work by exporting frequently
4. **Review Code**: Check the generated code in the Code Editor

## Keyboard Shortcuts

Currently, the designer uses mouse interactions. Future versions may include:
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Y`: Redo
- `Delete`: Remove selected component
- `Ctrl/Cmd + C`: Copy component
- `Ctrl/Cmd + V`: Paste component

## Troubleshooting

### Connection Issues

**Problem**: Shows "Disconnected"
**Solution**:
- Ensure the backend server is running on port 3000
- Check browser console for connection errors
- Verify firewall settings

### Component Not Appearing

**Problem**: Dragged component doesn't appear
**Solution**:
- Ensure you're dragging to the canvas area
- Check browser console for JavaScript errors
- Try refreshing the page

### Properties Not Updating

**Problem**: Changes to properties don't save
**Solution**:
- Make sure a component is selected
- Check that you're editing the correct field
- Try clicking outside the input to trigger save

### Build Errors

**Problem**: `npm run build` fails
**Solution**:
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check for TypeScript errors in console

## Advanced Features

### Custom Components

To add your own components:

1. Create a new component in `frontend/src/components/`
2. Add it to the palette in `ComponentPalette.vue`
3. Register it in your Vue application

Example:
```typescript
const customComponents = ref<PaletteItem[]>([
  { 
    type: 'MyComponent', 
    name: 'My Custom Component', 
    icon: '🎨', 
    defaultProps: { title: 'Hello' } 
  }
]);
```

### Integrating UI Libraries

To use Vuetify, Element Plus, or other libraries:

1. Install the library: `npm install <library>`
2. Register components globally in `main.ts`
3. Add them to the component palette
4. They'll work with drag-and-drop automatically

Example with Vuetify:
```typescript
// main.ts
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'

const vuetify = createVuetify()
app.use(vuetify)
```

### Code Generation Customization

Modify `frontend/src/modules/designer/services/codeGenerator.ts` to customize:
- Template structure
- Script setup format
- Style conventions
- File organization

## Future Enhancements

Planned features for future versions:
- Undo/Redo functionality
- Component templates library
- Responsive design tools
- CSS visual editor
- Asset management
- Version control integration
- Team collaboration features
- Plugin system for extensions

## Support

For issues, questions, or contributions:
- GitHub Issues: https://github.com/ota-jalol/vs-designer-plugin/issues
- Documentation: See README.md in the repository root

## License

MIT License - See LICENSE file for details
