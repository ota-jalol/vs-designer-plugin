<template>
  <div class="component-palette">
    <h3>Components</h3>
    <div class="palette-sections">
      <div class="palette-section">
        <h4>HTML Elements</h4>
        <draggable
          :list="htmlElements"
          :group="{ name: 'components', pull: 'clone', put: false }"
          :clone="cloneComponent"
          :sort="false"
          class="palette-items"
          itemKey="type"
        >
          <template #item="{ element }">
            <div class="palette-item">
              <span class="icon">{{ element.icon }}</span>
              <span class="name">{{ element.name }}</span>
            </div>
          </template>
        </draggable>
      </div>
      
      <div class="palette-section">
        <h4>Vue Components</h4>
        <draggable
          :list="vueComponents"
          :group="{ name: 'components', pull: 'clone', put: false }"
          :clone="cloneComponent"
          :sort="false"
          class="palette-items"
          itemKey="type"
        >
          <template #item="{ element }">
            <div class="palette-item">
              <span class="icon">{{ element.icon }}</span>
              <span class="name">{{ element.name }}</span>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import type { PaletteItem } from '../types';

const htmlElements = ref<PaletteItem[]>([
  { type: 'div', name: 'Div', icon: '□', defaultProps: { class: '', style: '' } },
  { type: 'button', name: 'Button', icon: '▭', defaultProps: { text: 'Click me' } },
  { type: 'input', name: 'Input', icon: '▢', defaultProps: { type: 'text', placeholder: '' } },
  { type: 'text', name: 'Text', icon: 'T', defaultProps: { content: 'Text' } },
  { type: 'image', name: 'Image', icon: '🖼', defaultProps: { src: '', alt: '' } },
  { type: 'section', name: 'Section', icon: '▭', defaultProps: { class: '' } },
  { type: 'header', name: 'Header', icon: '▬', defaultProps: { class: '' } },
  { type: 'footer', name: 'Footer', icon: '▬', defaultProps: { class: '' } }
]);

const vueComponents = ref<PaletteItem[]>([
  { type: 'Card', name: 'Card', icon: '🃏', defaultProps: { title: '', content: '' } },
  { type: 'Modal', name: 'Modal', icon: '🗔', defaultProps: { visible: false } },
  { type: 'Table', name: 'Table', icon: '▦', defaultProps: { data: [] } },
  { type: 'Form', name: 'Form', icon: '📋', defaultProps: { fields: [] } }
]);

function cloneComponent(item: PaletteItem) {
  return {
    id: `${item.type}-${Date.now()}`,
    type: item.type,
    name: item.name,
    props: { ...item.defaultProps },
    children: []
  };
}
</script>

<style scoped>
.component-palette {
  width: 250px;
  background: #f5f5f5;
  border-right: 1px solid #ddd;
  padding: 16px;
  overflow-y: auto;
}

.component-palette h3 {
  margin: 0 0 16px;
  font-size: 18px;
}

.palette-section {
  margin-bottom: 24px;
}

.palette-section h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #666;
}

.palette-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.palette-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: move;
  transition: all 0.2s;
}

.palette-item:hover {
  background: #e8f4f8;
  border-color: #4CAF50;
  transform: translateX(4px);
}

.palette-item .icon {
  font-size: 18px;
}

.palette-item .name {
  font-size: 14px;
}
</style>
