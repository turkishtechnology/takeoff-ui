/**
 * Mixin that provides click outside functionality for components.
 * Handles event listener management, binding, cleanup, and click detection.
 */
export class ClickOutsideMixin {
  /**
   * The reference element to check clicks against.
   * Clicks outside this element will trigger the handler.
   * @defaultValue this.el
   */
  referenceElement?: HTMLElement;

  /**
   * Handler function called when a click outside occurs.
   * Must be provided by the implementing component.
   */
  clickOutsideHandler?: (event: MouseEvent) => void;

  /**
   * Whether to use capture phase for event listening.
   * @defaultValue false
   */
  useCapture: boolean = false;

  /**
   * Array of elements that should be ignored when checking for outside clicks.
   * Clicks on these elements won't trigger the clickOutsideHandler.
   * @defaultValue []
   */
  ignoredElements: HTMLElement[] = [];

  /**
   * Whether the click outside functionality is disabled.
   * When true, no event listeners are attached.
   * @defaultValue false
   */
  clickOutsideDisabled: boolean = false;

  private _isClickOutsideListenerActive: boolean = false;

  /**
   * Binds the window click listener.
   * Should be called when the component needs to start listening for outside clicks.
   */
  protected bindClickOutsideListener(): void {
    if (this.clickOutsideDisabled || this._isClickOutsideListenerActive || !this._handleWindowClick) {
      return;
    }

    window.addEventListener('click', this._handleWindowClick, this.useCapture);
    this._isClickOutsideListenerActive = true;
  }

  /**
   * Unbinds the window click listener.
   * Should be called when the component no longer needs to listen for outside clicks.
   */
  protected unbindClickOutsideListener(): void {
    if (!this._isClickOutsideListenerActive || !this._handleWindowClick) {
      return;
    }

    window.removeEventListener('click', this._handleWindowClick, this.useCapture);
    this._isClickOutsideListenerActive = false;
  }

  /**
   * Handles the window click event and determines if it's an outside click.
   */
  private _handleWindowClick = (event: MouseEvent): void => {
    if (!this.referenceElement || !this.clickOutsideHandler) {
      return;
    }

    const composedPath = event.composedPath();

    // Check if click is inside the reference element
    const isInsideReference = composedPath.some(item => item === this.referenceElement);

    // Check if click is on any ignored elements
    const isOnIgnoredElement = this.ignoredElements.some(ignoredEl => composedPath.some(item => item === ignoredEl));

    // If click is outside reference and not on ignored elements, trigger handler
    if (!isInsideReference && !isOnIgnoredElement) {
      this.clickOutsideHandler(event);
    }
  };

  /**
   * Automatic binding/unbinding in componentDidUpdate.
   * Child components can override and call super.componentDidUpdate() if needed.
   */
  componentDidUpdate(): void {
    if (!this.clickOutsideDisabled && !this._isClickOutsideListenerActive) {
      this.bindClickOutsideListener();
    } else if (this.clickOutsideDisabled && this._isClickOutsideListenerActive) {
      this.unbindClickOutsideListener();
    }
  }

  /**
   * Automatic cleanup in disconnectedCallback.
   * Child components can override and call super.disconnectedCallback() if needed.
   */
  disconnectedCallback(): void {
    this.unbindClickOutsideListener();
  }
}
