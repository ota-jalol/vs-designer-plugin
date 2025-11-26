# Visual Designer Plugin

A hybrid Node.js + Vue 3 (TypeScript) visual page builder with real-time collaboration, drag-and-drop UI editing, and code generation capabilities.

## Features

### 🎨 Visual Page Builder
- **Drag & Drop Interface**: Intuitive component palette with HTML elements and Vue components
- **Live Canvas**: Real-time visual editing with grid-based layout
- **Properties Panel**: Edit component properties and attributes dynamically
- **Code Editor**: Integrated CodeMirror 6 with syntax highlighting and autocomplete for HTML, JavaScript/TypeScript, and CSS

### 🔄 Real-Time Collaboration
- **WebSocket Integration**: Socket.IO powered real-time synchronization
- **Live Updates**: See changes from other users instantly
- **Connection Status**: Visual indicator of connection state

### 📦 Code Generation
- **Export Vue Code**: Generate complete Vue 3 component files
- **Modular Architecture**: Organized by feature modules with components, pages, stores
- **TypeScript Support**: Full TypeScript integration with type safety
- **Router & Store**: Auto-generate Vue Router and Pinia store configurations

### 🧪 Testing
- **Unit Tests**: Vitest for fast, Vite-optimized testing
- **Component Tests**: Vue Test Utils integration
- **E2E Ready**: Structured for Cypress integration

## Architecture

### Technology Stack

**Backend:**
- Node.js with Express
- Socket.IO for WebSocket communication
- TypeScript for type safety

**Frontend:**
- Vue 3 with Composition API
- TypeScript
- Vite (build tool)
- Pinia (state management)
- Vue Router (navigation)
- Vue.Draggable/SortableJS (drag & drop)
- CodeMirror 6 (code editor)
- Socket.IO Client (real-time sync)

### Project Structure

```
vs-designer-plugin/
├── backend/
│   ├── src/
│   │   └── server.ts          # Express + Socket.IO server
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── modules/
│   │   │   └── designer/      # Designer feature module
│   │   │       ├── components/
│   │   │       │   ├── ComponentPalette.vue
│   │   │       │   ├── DesignCanvas.vue
│   │   │       │   ├── PropertiesPanel.vue
│   │   │       │   ├── CodeEditor.vue
│   │   │       │   └── ComponentRenderer.vue
│   │   │       ├── pages/
│   │   │       │   └── DesignerPage.vue
│   │   │       ├── services/
│   │   │       │   ├── socket.ts
│   │   │       │   └── codeGenerator.ts
│   │   │       ├── stores/
│   │   │       │   └── designer.ts
│   │   │       ├── types/
│   │   │       │   └── index.ts
│   │   │       ├── composables/
│   │   │       │   └── useRealtimeSync.ts
│   │   │       └── __tests__/
│   │   │           ├── designer.store.test.ts
│   │   │           └── codeGenerator.test.ts
│   │   ├── router.ts
│   │   ├── main.ts
│   │   └── App.vue
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ota-jalol/vs-designer-plugin.git
   cd vs-designer-plugin
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Development

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:3000`

2. **Start Frontend Dev Server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Application runs on `http://localhost:5173`

3. **Open in Browser**
   Navigate to `http://localhost:5173` to use the visual designer

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Usage

### Designing a Page

1. **Drag Components**: Drag HTML elements or Vue components from the left palette onto the canvas
2. **Arrange & Edit**: Click components to select them and edit properties in the right panel
3. **Code View**: Switch between Template, Script, and Style tabs in the code editor to see generated code
4. **Export**: Click "Export Code" to download your design as a JSON file with Vue component code

### Real-Time Collaboration

- Multiple users can connect to the same designer instance
- Changes are synchronized in real-time via WebSocket
- Connection status indicator shows if you're connected to the server

### Code Generation

The export feature generates:
- **Components**: Individual `.vue` files for each component
- **Pages**: Complete page files with imports
- **Router**: Vue Router configuration
- **Store**: Pinia store setup

## Testing

### Run Unit Tests
```bash
cd frontend
npm test
```

### Run Tests with UI
```bash
npm run test:ui
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

## Extending the Designer

### Adding New Components

1. Add component definition to `ComponentPalette.vue`:
```typescript
const customComponents = ref<PaletteItem[]>([
  { 
    type: 'MyComponent', 
    name: 'My Component', 
    icon: '🎯', 
    defaultProps: { title: 'Hello' } 
  }
]);
```

2. Register the component in your application
3. The component will be draggable and editable automatically

### Adding UI Libraries

You can integrate any Vue UI library (Vuetify, Element Plus, etc.):

1. Install the library: `npm install <library>`
2. Register components globally or import them
3. Add them to the component palette
4. They'll work seamlessly with the drag & drop system

## API Reference

### WebSocket Events

**Client → Server:**
- `design:update`: Update the design state
- `component:add`: Add a new component
- `component:update`: Update an existing component
- `component:remove`: Remove a component

**Server → Client:**
- `design:state`: Broadcast current design state

### Store API

```typescript
// Add component
store.addComponent(component);

// Update component
store.updateComponent(component);

// Remove component
store.removeComponent(componentId);

// Select component
store.selectComponent(componentId);

// Add page
store.addPage(page);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [Builder.io](https://github.com/BuilderIO/builder), [TeleportHQ](https://teleporthq.io/), and [Vuegg](https://github.com/vuegg/vuegg)
- Built with the amazing Vue 3 ecosystem
- Uses [Socket.IO](https://socket.io/) for real-time features
- Code editing powered by [CodeMirror 6](https://codemirror.net/)
