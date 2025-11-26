<template>
  <div class="properties-panel">
    <h3>Properties</h3>
    <div v-if="selectedComponent" class="properties-content">
      <div class="property-group">
        <label>Component ID</label>
        <input type="text" :value="selectedComponent.id" readonly />
      </div>
      
      <div class="property-group">
        <label>Type</label>
        <input type="text" :value="selectedComponent.type" readonly />
      </div>

      <div class="property-group">
        <label>Name</label>
        <input type="text" v-model="localComponent.name" @input="updateComponent" />
      </div>

      <div class="properties-section">
        <h4>Props</h4>
        <div
          v-for="(value, key) in localComponent.props"
          :key="key"
          class="property-group"
        >
          <label>{{ key }}</label>
          <input
            v-if="typeof value === 'string'"
            type="text"
            v-model="localComponent.props[key]"
            @input="updateComponent"
          />
          <input
            v-else-if="typeof value === 'number'"
            type="number"
            v-model.number="localComponent.props[key]"
            @input="updateComponent"
          />
          <input
            v-else-if="typeof value === 'boolean'"
            type="checkbox"
            v-model="localComponent.props[key]"
            @change="updateComponent"
          />
          <textarea
            v-else
            v-model="localComponent.props[key]"
            @input="updateComponent"
          ></textarea>
        </div>
      </div>

      <div class="property-actions">
        <button @click="addProperty" class="btn-secondary">Add Property</button>
      </div>
    </div>
    <div v-else class="no-selection">
      <p>Select a component to edit its properties</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDesignerStore } from '../stores/designer';
import type { ComponentDefinition } from '../types';

const store = useDesignerStore();

const selectedComponent = computed(() => store.selectedComponent);

const localComponent = ref<ComponentDefinition>({
  id: '',
  type: '',
  name: '',
  props: {}
});

watch(selectedComponent, (newVal) => {
  if (newVal) {
    localComponent.value = JSON.parse(JSON.stringify(newVal));
  }
}, { immediate: true });

function updateComponent() {
  if (localComponent.value && selectedComponent.value) {
    store.updateComponent(localComponent.value);
  }
}

function addProperty() {
  const propName = prompt('Enter property name:');
  if (propName && localComponent.value) {
    localComponent.value.props[propName] = '';
    updateComponent();
  }
}
</script>

<style scoped>
.properties-panel {
  width: 300px;
  background: #f5f5f5;
  border-left: 1px solid #ddd;
  padding: 16px;
  overflow-y: auto;
}

.properties-panel h3 {
  margin: 0 0 16px;
  font-size: 18px;
}

.properties-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.property-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.property-group label {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.property-group input,
.property-group textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.property-group input[type="checkbox"] {
  width: auto;
}

.property-group textarea {
  min-height: 80px;
  resize: vertical;
}

.properties-section {
  border-top: 1px solid #ddd;
  padding-top: 16px;
}

.properties-section h4 {
  margin: 0 0 12px;
  font-size: 14px;
  color: #666;
}

.property-actions {
  display: flex;
  gap: 8px;
}

.btn-secondary {
  padding: 8px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #e8f4f8;
  border-color: #4CAF50;
}

.no-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999;
  text-align: center;
}
</style>
