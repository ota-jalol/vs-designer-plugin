<template>
  <div class="designer-page">
    <header class="designer-header">
      <h1>Visual Designer</h1>
      <div class="header-actions">
        <span :class="['connection-status', { connected: isConnected }]">
          {{ isConnected ? '● Connected' : '○ Disconnected' }}
        </span>
        <button @click="exportCode" class="btn-primary">Export Code</button>
      </div>
    </header>
    
    <div class="designer-layout">
      <ComponentPalette />
      <div class="designer-main">
        <DesignCanvas />
        <CodeEditor />
      </div>
      <PropertiesPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComponentPalette from '../components/ComponentPalette.vue';
import DesignCanvas from '../components/DesignCanvas.vue';
import PropertiesPanel from '../components/PropertiesPanel.vue';
import CodeEditor from '../components/CodeEditor.vue';
import { useRealtimeSync } from '../composables/useRealtimeSync';
import { useDesignerStore } from '../stores/designer';
import { generateVueCode } from '../services/codeGenerator';

const { isConnected } = useRealtimeSync();
const store = useDesignerStore();

function exportCode() {
  const code = generateVueCode(store.components, store.pages);
  
  // Create a download
  const blob = new Blob([JSON.stringify(code, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'exported-design.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  alert('Code exported successfully!');
}
</script>

<style scoped>
.designer-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.designer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #2c3e50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.designer-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.connection-status {
  font-size: 14px;
  color: #e0e0e0;
}

.connection-status.connected {
  color: #4CAF50;
}

.btn-primary {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #45a049;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.designer-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.designer-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
</style>
