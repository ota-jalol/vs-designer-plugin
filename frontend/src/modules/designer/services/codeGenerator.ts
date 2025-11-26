import type { ComponentDefinition, PageDefinition } from '../types';

interface GeneratedCode {
  components: Record<string, string>;
  pages: Record<string, string>;
  router: string;
  store: string;
}

export function generateVueCode(
  components: ComponentDefinition[],
  pages: PageDefinition[]
): GeneratedCode {
  const generatedCode: GeneratedCode = {
    components: {},
    pages: {},
    router: '',
    store: ''
  };

  // Generate component files
  components.forEach(component => {
    const componentCode = generateComponentCode(component);
    generatedCode.components[`${component.name || component.type}.vue`] = componentCode;
  });

  // Generate page files
  pages.forEach(page => {
    const pageCode = generatePageCode(page);
    generatedCode.pages[`${page.name}.vue`] = pageCode;
  });

  // Generate router configuration
  generatedCode.router = generateRouterCode(pages);

  // Generate store
  generatedCode.store = generateStoreCode();

  return generatedCode;
}

function generateComponentCode(component: ComponentDefinition): string {
  const props = Object.entries(component.props || {})
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const childrenCode = component.children
    ? component.children.map(child => generateComponentCode(child)).join('\n    ')
    : '';

  return `<template>
  <${component.type} ${props}>
    ${childrenCode || component.props?.content || component.props?.text || ''}
  </${component.type}>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Define component props
defineProps<{
  // Add props here
}>();
</script>

<style scoped>
/* Add component styles here */
</style>
`;
}

function generatePageCode(page: PageDefinition): string {
  const componentsImports = page.components
    .map((_c, i) => `import Component${i} from '@/modules/designer/components/${_c.name || _c.type}.vue';`)
    .join('\n');

  const componentsUsage = page.components
    .map((_c, i) => `    <Component${i} />`)
    .join('\n');

  return `<template>
  <div class="page-${page.name.toLowerCase()}">
    <h1>${page.name}</h1>
${componentsUsage}
  </div>
</template>

<script setup lang="ts">
${componentsImports}
</script>

<style scoped>
.page-${page.name.toLowerCase()} {
  padding: 20px;
}
</style>
`;
}

function generateRouterCode(pages: PageDefinition[]): string {
  const routes = pages.map(page => `  {
    path: '${page.path}',
    name: '${page.name}',
    component: () => import('@/modules/designer/pages/${page.name}.vue')
  }`).join(',\n');

  return `import { createRouter, createWebHistory } from 'vue-router';

const routes = [
${routes}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
`;
}

function generateStoreCode(): string {
  return `import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGeneratedStore = defineStore('generated', () => {
  const data = ref({});

  function updateData(newData: any) {
    data.value = { ...data.value, ...newData };
  }

  return {
    data,
    updateData
  };
});
`;
}
