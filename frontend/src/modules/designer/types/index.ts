export interface ComponentDefinition {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  children?: ComponentDefinition[];
  position?: { x: number; y: number };
}

export interface PageDefinition {
  id: string;
  name: string;
  path: string;
  components: ComponentDefinition[];
}

export interface DesignState {
  components: ComponentDefinition[];
  pages: PageDefinition[];
  selectedComponentId: string | null;
}

export interface PaletteItem {
  type: string;
  name: string;
  icon?: string;
  defaultProps?: Record<string, any>;
}
