import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ComponentDefinition, PageDefinition, DesignState } from '../types';

export const useDesignerStore = defineStore('designer', () => {
  const components = ref<ComponentDefinition[]>([]);
  const pages = ref<PageDefinition[]>([]);
  const selectedComponentId = ref<string | null>(null);
  const currentPageId = ref<string | null>(null);

  const selectedComponent = computed(() => {
    if (!selectedComponentId.value) return null;
    return findComponent(components.value, selectedComponentId.value);
  });

  const currentPage = computed(() => {
    if (!currentPageId.value) return null;
    return pages.value.find(p => p.id === currentPageId.value);
  });

  function findComponent(items: ComponentDefinition[], id: string): ComponentDefinition | null {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findComponent(item.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  function addComponent(component: ComponentDefinition) {
    components.value.push(component);
  }

  function updateComponent(component: ComponentDefinition) {
    const index = components.value.findIndex(c => c.id === component.id);
    if (index !== -1) {
      components.value[index] = component;
    }
  }

  function removeComponent(componentId: string) {
    components.value = components.value.filter(c => c.id !== componentId);
  }

  function selectComponent(componentId: string | null) {
    selectedComponentId.value = componentId;
  }

  function addPage(page: PageDefinition) {
    pages.value.push(page);
  }

  function updatePage(page: PageDefinition) {
    const index = pages.value.findIndex(p => p.id === page.id);
    if (index !== -1) {
      pages.value[index] = page;
    }
  }

  function setCurrentPage(pageId: string | null) {
    currentPageId.value = pageId;
  }

  function setState(state: Partial<DesignState>) {
    if (state.components) components.value = state.components;
    if (state.pages) pages.value = state.pages;
    if (state.selectedComponentId !== undefined) {
      selectedComponentId.value = state.selectedComponentId;
    }
  }

  return {
    components,
    pages,
    selectedComponentId,
    selectedComponent,
    currentPage,
    currentPageId,
    addComponent,
    updateComponent,
    removeComponent,
    selectComponent,
    addPage,
    updatePage,
    setCurrentPage,
    setState
  };
});
