<template>
  <component :is="componentTag" v-bind="componentProps">
    <template v-if="component.children && component.children.length">
      <component-renderer
        v-for="child in component.children"
        :key="child.id"
        :component="child"
      />
    </template>
    <template v-else-if="componentContent">
      {{ componentContent }}
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ComponentDefinition } from '../types';

interface Props {
  component: ComponentDefinition;
}

const props = defineProps<Props>();

const componentTag = computed(() => {
  // Map component types to HTML tags
  const tagMap: Record<string, string> = {
    text: 'span',
    image: 'img'
  };
  return tagMap[props.component.type] || props.component.type;
});

const componentProps = computed(() => {
  const { text, content, ...restProps } = props.component.props || {};
  return restProps;
});

const componentContent = computed(() => {
  return props.component.props?.text || props.component.props?.content || '';
});
</script>
