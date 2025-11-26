import { ref, onMounted, onUnmounted } from 'vue';
import { initializeSocket, onDesignStateUpdate, socketState } from '../services/socket';
import { useDesignerStore } from '../stores/designer';

export function useRealtimeSync() {
  const store = useDesignerStore();
  const isConnected = ref(false);

  onMounted(() => {
    initializeSocket();
    
    onDesignStateUpdate((state) => {
      store.setState(state);
    });

    isConnected.value = socketState.connected;
  });

  onUnmounted(() => {
    if (socketState.socket) {
      socketState.socket.disconnect();
    }
  });

  return {
    isConnected
  };
}
