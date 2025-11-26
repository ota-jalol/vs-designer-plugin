<template>
  <div class="code-editor">
    <div class="editor-header">
      <h4>Code Editor</h4>
      <div class="editor-tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: currentTab === tab }"
          @click="currentTab = tab as 'template' | 'script' | 'style'"
        >
          {{ tab }}
        </button>
      </div>
    </div>
    <div class="editor-container" ref="editorRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { autocompletion } from '@codemirror/autocomplete';
import { useDesignerStore } from '../stores/designer';

const store = useDesignerStore();
const editorRef = ref<HTMLElement | null>(null);
const currentTab = ref<'template' | 'script' | 'style'>('template');
let editorView: EditorView | null = null;

const tabs = ['template', 'script', 'style'];

const selectedComponent = computed(() => store.selectedComponent);

const editorLanguage = computed(() => {
  switch (currentTab.value) {
    case 'template':
      return html();
    case 'script':
      return javascript({ typescript: true });
    case 'style':
      return css();
    default:
      return html();
  }
});

const editorContent = computed(() => {
  if (!selectedComponent.value) return '';
  
  switch (currentTab.value) {
    case 'template':
      return generateTemplate(selectedComponent.value);
    case 'script':
      return generateScript(selectedComponent.value);
    case 'style':
      return generateStyle(selectedComponent.value);
    default:
      return '';
  }
});

function generateTemplate(component: any): string {
  const props = Object.entries(component.props || {})
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  return `<${component.type} ${props}></${component.type}>`;
}

function generateScript(component: any): string {
  return `import { defineComponent } from 'vue';

export default defineComponent({
  name: '${component.name || component.type}',
  props: {
    // Define props here
  },
  setup() {
    // Component logic here
    return {
      // Return reactive state
    };
  }
});`;
}

function generateStyle(component: any): string {
  return `.${component.type} {
  /* Add styles here */
}`;
}

function initializeEditor() {
  if (!editorRef.value) return;

  const state = EditorState.create({
    doc: editorContent.value,
    extensions: [
      basicSetup,
      editorLanguage.value,
      autocompletion(),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          // Handle code changes
          const newCode = update.state.doc.toString();
          console.log('Code changed:', newCode);
        }
      })
    ]
  });

  editorView = new EditorView({
    state,
    parent: editorRef.value
  });
}

function updateEditor() {
  if (!editorView) return;

  const state = EditorState.create({
    doc: editorContent.value,
    extensions: [
      basicSetup,
      editorLanguage.value,
      autocompletion()
    ]
  });

  editorView.setState(state);
}

onMounted(() => {
  initializeEditor();
});

watch([currentTab, selectedComponent], () => {
  updateEditor();
});
</script>

<style scoped>
.code-editor {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  border-top: 1px solid #ddd;
  height: 300px;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #fff;
  border-bottom: 1px solid #ddd;
}

.editor-header h4 {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.editor-tabs {
  display: flex;
  gap: 4px;
}

.editor-tabs button {
  padding: 6px 12px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.editor-tabs button:hover {
  background: #f5f5f5;
}

.editor-tabs button.active {
  background: #e8f4f8;
  border-color: #4CAF50;
  color: #4CAF50;
  font-weight: 600;
}

.editor-container {
  flex: 1;
  overflow: auto;
}

.editor-container :deep(.cm-editor) {
  height: 100%;
}

.editor-container :deep(.cm-scroller) {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
}
</style>
