import { io, Socket } from 'socket.io-client';
import { reactive } from 'vue';
import type { DesignState } from '../types';

interface SocketState {
  connected: boolean;
  socket: Socket | null;
}

export const socketState = reactive<SocketState>({
  connected: false,
  socket: null
});

export function initializeSocket(url = 'http://localhost:3000') {
  const socket = io(url);
  socketState.socket = socket;

  socket.on('connect', () => {
    console.log('Connected to server');
    socketState.connected = true;
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
    socketState.connected = false;
  });

  return socket;
}

export function emitDesignUpdate(data: Partial<DesignState>) {
  if (socketState.socket) {
    socketState.socket.emit('design:update', data);
  }
}

export function onDesignStateUpdate(callback: (state: DesignState) => void) {
  if (socketState.socket) {
    socketState.socket.on('design:state', callback);
  }
}
