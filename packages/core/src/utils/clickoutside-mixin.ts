/**
 * Configuration interface for click outside functionality.
 */
export interface ClickOutsideConfig {
  /**
   * The reference element to check clicks against.
   * Clicks outside this element will trigger the handler.
   */
  referenceElement: HTMLElement;

  /**
   * Handler function called when a click outside occurs.
   * Must be provided by the implementing component.
   */
  handler: (event: MouseEvent) => void;

  /**
   * Whether to use capture phase for event listening.
   * @defaultValue true
   */
  useCapture?: boolean;

  /**
   * Array of elements that should be ignored when checking for outside clicks.
   * Clicks on these elements won't trigger the handler.
   * @defaultValue []
   */
  ignoredElements?: HTMLElement[];

  /**
   * Whether the click outside functionality is disabled.
   * When true, no event listeners are attached.
   * @defaultValue false
   */
  disabled?: boolean;
}

/**
 * Mixin that provides click outside functionality for components.
 * Handles event listener management, binding, cleanup, and click detection.
 */
export class ClickOutsideMixin {
  /**
   * Configuration object containing all click outside settings.
   */
  protected config: Partial<ClickOutsideConfig> = {
    useCapture: true,
    ignoredElements: [],
    disabled: false,
  };

  private _isListenerActive: boolean = false;

  private checkConfig(): void {
    if (!this.config.referenceElement) {
      throw new Error('Reference element must be provided');
    }
    if (!this.config.handler) {
      throw new Error('Handler must be provided');
    }
  }

  constructor(initialConfig: Partial<ClickOutsideConfig> = {}) {
    this.updateConfig(initialConfig);
    this.checkConfig();
  }

  private evaluateListenerState(): void {
    if (!this.config.disabled && !this._isListenerActive) {
      this.bindListener();
    } else if (this.config.disabled && this._isListenerActive) {
      this.unbindListener();
    }
  }

  /**
   * Updates the configuration with partial config object.
   * @param partialConfig - Partial configuration to merge with current config
   */
  updateConfig(partialConfig: Partial<ClickOutsideConfig>): void {
    this.config = { ...this.config, ...partialConfig };

    // Re-evaluate listener state based on new config
    this.evaluateListenerState();
  }

  /**
   * Binds the window click listener.
   * Should be called when the component needs to start listening for outside clicks.
   */
  protected bindListener(): void {
    if (this.config.disabled || this._isListenerActive) return;

    window.addEventListener('click', this._handleWindowClick, this.config.useCapture);
    this._isListenerActive = true;
  }

  /**
   * Unbinds the window click listener.
   * Should be called when the component no longer needs to listen for outside clicks.
   */
  protected unbindListener(): void {
    if (!this._isListenerActive) return;

    window.removeEventListener('click', this._handleWindowClick, this.config.useCapture);
    this._isListenerActive = false;
  }

  /**
   * Handles the window click event and determines if it's an outside click.
   */
  private _handleWindowClick = (event: MouseEvent): void => {
    const composedPath = event.composedPath();

    // Check if click is inside the reference element
    const isInsideReference = composedPath.some(item => item === this.config.referenceElement);

    // Check if click is on any ignored elements
    const isOnIgnoredElement = this.config.ignoredElements?.some(ignoredEl => composedPath.some(item => item === ignoredEl));

    // If click is outside reference and not on ignored elements, trigger handler
    if (!isInsideReference && !isOnIgnoredElement) {
      this.config.handler(event);
    }
  };

  /**
   * Cleanup in disconnectedCallback.
   */
  disconnectedCallback(): void {
    this.unbindListener();
  }
}
