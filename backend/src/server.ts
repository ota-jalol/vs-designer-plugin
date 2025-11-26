import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

interface ComponentDefinition {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  children?: ComponentDefinition[];
}

interface PageDefinition {
  id: string;
  name: string;
  path: string;
  components: ComponentDefinition[];
}

interface DesignState {
  components: ComponentDefinition[];
  pages: PageDefinition[];
  routes: any[];
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Store the current design state
let designState: DesignState = {
  components: [],
  pages: [],
  routes: []
};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send current state to new client
  socket.emit('design:state', designState);

  // Handle component updates
  socket.on('design:update', (data) => {
    designState = { ...designState, ...data };
    // Broadcast to all other clients
    socket.broadcast.emit('design:state', designState);
  });

  // Handle component add
  socket.on('component:add', (component) => {
    designState.components.push(component);
    io.emit('design:state', designState);
  });

  // Handle component update
  socket.on('component:update', (component) => {
    const index = designState.components.findIndex(c => c.id === component.id);
    if (index !== -1) {
      designState.components[index] = component;
      io.emit('design:state', designState);
    }
  });

  // Handle component remove
  socket.on('component:remove', (componentId) => {
    designState.components = designState.components.filter(c => c.id !== componentId);
    io.emit('design:state', designState);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
