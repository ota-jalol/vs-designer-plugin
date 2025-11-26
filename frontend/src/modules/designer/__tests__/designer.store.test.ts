import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useDesignerStore } from '../stores/designer';
import type { ComponentDefinition } from '../types';

describe('Designer Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with empty components', () => {
    const store = useDesignerStore();
    expect(store.components).toEqual([]);
    expect(store.pages).toEqual([]);
    expect(store.selectedComponentId).toBeNull();
  });

  it('adds a component', () => {
    const store = useDesignerStore();
    const component: ComponentDefinition = {
      id: 'test-1',
      type: 'div',
      name: 'Test Div',
      props: { class: 'test' }
    };

    store.addComponent(component);
    expect(store.components).toHaveLength(1);
    expect(store.components[0]).toEqual(component);
  });

  it('updates a component', () => {
    const store = useDesignerStore();
    const component: ComponentDefinition = {
      id: 'test-1',
      type: 'div',
      name: 'Test Div',
      props: { class: 'test' }
    };

    store.addComponent(component);
    
    const updatedComponent = {
      ...component,
      name: 'Updated Div'
    };
    
    store.updateComponent(updatedComponent);
    expect(store.components[0]?.name).toBe('Updated Div');
  });

  it('removes a component', () => {
    const store = useDesignerStore();
    const component: ComponentDefinition = {
      id: 'test-1',
      type: 'div',
      name: 'Test Div',
      props: { class: 'test' }
    };

    store.addComponent(component);
    expect(store.components).toHaveLength(1);
    
    store.removeComponent('test-1');
    expect(store.components).toHaveLength(0);
  });

  it('selects a component', () => {
    const store = useDesignerStore();
    const component: ComponentDefinition = {
      id: 'test-1',
      type: 'div',
      name: 'Test Div',
      props: { class: 'test' }
    };

    store.addComponent(component);
    store.selectComponent('test-1');
    
    expect(store.selectedComponentId).toBe('test-1');
    expect(store.selectedComponent).toEqual(component);
  });
});
