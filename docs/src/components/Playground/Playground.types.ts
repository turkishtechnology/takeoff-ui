export type ControlType = 'text' | 'select' | 'checkbox' | 'number';

export interface ControlConfig {
  key: string;
  label: string;
  type: ControlType;
  defaultValue: string | number | boolean;
  options?: { label: string; value: string | number | boolean }[];
  min?: number;
  max?: number;
  tooltip?: string | {}; // Optional tooltip for the control
}

export interface ChildConfig {
  type: 'text' | 'component';
  content?: string; // for type: 'text'
  componentName?: string; // for type: 'component'
  props?: Record<string, string | number | boolean>;
  children?: ChildConfig[]; // recursive nesting
  slot?: string; // named slot target (e.g. "content", "header")
}

export interface ComponentConfig {
  name: string;
  component?: React.ComponentType<any>;
  componentName?: string;
  defaultChildren?: React.ReactNode;
  hasChildren?: boolean; // Indicates if the component can have children
  children?: ChildConfig[];
  fullWidth?: boolean; // Stretch component to fill preview width
  props: ControlConfig[];
  examples?: {
    name: string;
    props: Record<string, string | number | boolean>;
    children?: React.ReactNode;
  }[];
}

export interface PlaygroundProps {
  configs: (ComponentConfig | ConfigWithComponentName)[];
  componentMap?: Record<string, React.ComponentType<any>>;
  defaultConfigIndex?: number;
}

// JSON'dan gelen config için yeni type
export interface ConfigWithComponentName {
  name: string;
  component?: React.ComponentType<any>;
  componentName?: string;
  defaultChildren?: React.ReactNode;
  hasChildren?: boolean; // Indicates if the component can have children
  children?: ChildConfig[];
  fullWidth?: boolean; // Stretch component to fill preview width
  props: ControlConfig[];
  examples?: {
    name: string;
    props: Record<string, string | number | boolean>;
    children?: React.ReactNode;
  }[];
}
