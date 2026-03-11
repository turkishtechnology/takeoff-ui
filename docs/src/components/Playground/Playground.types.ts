export type ControlType = 'text' | 'select' | 'checkbox' | 'number' | 'json';

export interface ControlConfig {
  key: string;
  label: string;
  type: ControlType;
  defaultValue: string | number | boolean | object;
  options?: { label: string; value: string | number | boolean }[];
  min?: number;
  max?: number;
  tooltip?: string | {}; // Optional tooltip for the control
}

export interface ChildConfig {
  type: 'text' | 'component';
  content?: string; // for type: 'text'
  componentName?: string; // for type: 'component'
  props?: Record<string, any>;
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
  height?: number; // Custom playground height in px (default: 600)
  staticProps?: Record<string, any>; // Props always passed to the component but not shown as controls
  triggerProp?: string; // Boolean prop key toggled by a trigger button (e.g. "visible", "open")
  triggerLabel?: string; // Label for the trigger button (e.g. "Open Dialog")
  triggerCloseEvent?: string; // React event handler name to close the overlay (e.g. "onTkVisibleChange")
  props: ControlConfig[];
  examples?: {
    name: string;
    props: Record<string, any>;
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
  height?: number; // Custom playground height in px (default: 600)
  staticProps?: Record<string, any>; // Props always passed to the component but not shown as controls
  triggerProp?: string;
  triggerLabel?: string;
  triggerCloseEvent?: string;
  props: ControlConfig[];
  examples?: {
    name: string;
    props: Record<string, any>;
    children?: React.ReactNode;
  }[];
}
