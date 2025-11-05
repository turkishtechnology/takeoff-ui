/**
 * Configuration interface for click outside functionality.
 */
export interface ClickOutsideConfig {
  /**
   * The reference element(s) to check clicks against.
   * Clicks outside these elements will trigger the handler.
   */
  referenceElements: Element[];

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
  ignoredElements?: Element[];

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
  private config: Partial<ClickOutsideConfig> = {
    useCapture: true,
    ignoredElements: [],
    disabled: false,
  };

  private _isListenerActive: boolean = false;

  private checkConfig(): void {
    if (!this.config.referenceElements || (Array.isArray(this.config.referenceElements) && this.config.referenceElements.length === 0)) {
      throw new Error('Reference element(s) must be provided');
    }
    if (!this.config.handler) {
      throw new Error('Handler must be provided');
    }
  }

  constructor(initialConfig: ClickOutsideConfig) {
    this.updateConfig(initialConfig);
    this.checkConfig();
  }

  private evaluateListenerState(): void {
    console.log(this.config.referenceElements, 'EVAL');
    if (!this.config.disabled && !this._isListenerActive) {
      console.log(this.config.referenceElements, 'EVAL BIND');
      this.bindListener();
    } else if (this.config.disabled && this._isListenerActive) {
      console.log(this.config.referenceElements, 'EVAL UNBIND');
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
  private bindListener(): void {
    console.log(this.config.referenceElements, 'BIND');
    if (this.config.disabled || this._isListenerActive) return;
    console.log(this.config.referenceElements, 'BIND - AFTER');

    window.addEventListener('click', this._handleWindowClick, this.config.useCapture);
    this._isListenerActive = true;
  }

  /**
   * Unbinds the window click listener.
   * Should be called when the component no longer needs to listen for outside clicks.
   */
  private unbindListener(): void {
    console.log(this.config.referenceElements, 'UNBIND');
    if (!this._isListenerActive) return;
    console.log(this.config.referenceElements, 'UNBIND - AFTERCHECK');

    window.removeEventListener('click', this._handleWindowClick, this.config.useCapture);
    this._isListenerActive = false;
  }

  /**
   * Handles the window click event and determines if it's an outside click.
   */
  private _handleWindowClick = (event: MouseEvent): void => {
    const composedPath = event.composedPath();

    // Check if click is inside any of the reference elements
    const referenceElements = Array.isArray(this.config.referenceElements) ? this.config.referenceElements : [this.config.referenceElements];

    const isInsideReference = referenceElements.some(refEl => composedPath.some(item => item === refEl));

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
