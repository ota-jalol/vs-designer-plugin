<template>
  <div class="design-canvas">
    <h3>Canvas</h3>
    <div class="canvas-container" ref="canvasRef">
      <draggable
        v-model="localComponents"
        group="components"
        class="canvas-area"
        itemKey="id"
        @change="onComponentsChange"
      >
        <template #item="{ element }">
          <div
            class="canvas-component"
            :class="{ selected: element.id === selectedComponentId }"
            @click.stop="selectComponent(element.id)"
          >
            <div class="component-header">
              <span class="component-type">{{ element.type }}</span>
              <button @click.stop="removeComponent(element.id)" class="remove-btn">×</button>
            </div>
            <div class="component-preview">
              <component-renderer :component="element" />
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import draggable from 'vuedraggable';
import { useDesignerStore } from '../stores/designer';
import ComponentRenderer from './ComponentRenderer.vue';
import type { ComponentDefinition } from '../types';

const store = useDesignerStore();
const canvasRef = ref<HTMLElement | null>(null);

const localComponents = computed({
  get: () => store.components,
  // Setter intentionally does nothing - updates are handled by onComponentsChange event
  // when Vue.Draggable modifies the list through drag operations
  set: (_value) => {
    // Update will be handled by onComponentsChange
  }
});

const selectedComponentId = computed(() => store.selectedComponentId);

function selectComponent(id: string) {
  store.selectComponent(id);
}

function removeComponent(id: string) {
  store.removeComponent(id);
}

function onComponentsChange(event: any) {
  if (event.added) {
    const component = event.added.element as ComponentDefinition;
    store.addComponent(component);
  }
}
</script>

<style scoped>
.design-canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-right: 1px solid #ddd;
}

.design-canvas h3 {
  margin: 0;
  padding: 16px;
  font-size: 18px;
  border-bottom: 1px solid #ddd;
}

.canvas-container {
  flex: 1;
  overflow: auto;
  padding: 16px;
}

.canvas-area {
  min-height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 19px,
    #e0e0e0 19px,
    #e0e0e0 20px
  ),
  repeating-linear-gradient(
    90deg,
    transparent,
    transparent 19px,
    #e0e0e0 19px,
    #e0e0e0 20px
  );
  background-size: 20px 20px;
  padding: 16px;
}

.canvas-component {
  margin-bottom: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.canvas-component:hover {
  border-color: #4CAF50;
}

.canvas-component.selected {
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.3);
}

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.component-type {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.remove-btn {
  background: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #d32f2f;
}

.component-preview {
  padding: 12px;
}
</style>
