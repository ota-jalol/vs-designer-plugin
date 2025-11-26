import { describe, it, expect } from 'vitest';
import { generateVueCode } from '../services/codeGenerator';
import type { ComponentDefinition, PageDefinition } from '../types';

describe('Code Generator', () => {
  it('generates component code', () => {
    const components: ComponentDefinition[] = [
      {
        id: 'test-1',
        type: 'div',
        name: 'TestComponent',
        props: { class: 'test-class' }
      }
    ];

    const code = generateVueCode(components, []);
    
    expect(code.components).toHaveProperty('TestComponent.vue');
    expect(code.components['TestComponent.vue']).toContain('<template>');
    expect(code.components['TestComponent.vue']).toContain('<script setup lang="ts">');
    expect(code.components['TestComponent.vue']).toContain('<style scoped>');
  });

  it('generates page code', () => {
    const pages: PageDefinition[] = [
      {
        id: 'page-1',
        name: 'HomePage',
        path: '/',
        components: []
      }
    ];

    const code = generateVueCode([], pages);
    
    expect(code.pages).toHaveProperty('HomePage.vue');
    expect(code.pages['HomePage.vue']).toContain('HomePage');
  });

  it('generates router code', () => {
    const pages: PageDefinition[] = [
      {
        id: 'page-1',
        name: 'HomePage',
        path: '/',
        components: []
      }
    ];

    const code = generateVueCode([], pages);
    
    expect(code.router).toContain('createRouter');
    expect(code.router).toContain('HomePage');
    expect(code.router).toContain("path: '/'");
  });

  it('generates store code', () => {
    const code = generateVueCode([], []);
    
    expect(code.store).toContain('defineStore');
    expect(code.store).toContain('useGeneratedStore');
  });
});
