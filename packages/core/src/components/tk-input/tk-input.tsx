import { Component, ComponentInterface, Element, Event, EventEmitter, Method, Prop, State, h, AttachInternals, Watch } from '@stencil/core';
import classNames from 'classnames';
import Cleave from 'cleave.js';
import { v4 as uuidv4 } from 'uuid';
import { IInputMaskOptions } from './types';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { isEqual, isNil } from 'lodash-es';
import { CleaveOptions } from 'cleave.js/options';
import { IChipOptions } from '../tk-chips/types';
import { renderIcons, getIconElementProps } from '../../utils/icon-utils';
import { getNestedValue } from '../../utils/object-utils';
import { renderHint } from '../../utils/hint-utils';
import { getDataTestId } from '../../utils/test-id-utils';
import { createIncrementalMatcher, stripAnchors, FAILED, MatchState } from '../../utils/regex-mask-utils';

/**
 * The TkInput component is used to capture text input from the user.
 * @slot label - Custom label content.
 * @react `import { TkInput } from '@takeoff-ui/react'`
 * @vue `import { TkInput } from '@takeoff-ui/vue'`
 * @angular `import { TkInput } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-input',
  styleUrl: 'tk-input.scss',
  formAssociated: true,
})
export class TkInput implements ComponentInterface {
  private nativeInput?: HTMLInputElement;
  private tabindex?: string | number;
  private uniqueId = uuidv4();
  private cleaveInstance?: Cleave;
  private readOnly: boolean = false;
  private editable: boolean = true;
  /** Memoized incremental matcher for `maskOptions.regex`; null when the regex is unsupported/invalid. */
  private regexMatcher?: ((value: string) => MatchState) | null;
  /** Source string the current `regexMatcher` was built from, to detect regex changes. */
  private regexMatcherSource?: string;
  /** Last value accepted by the regex mask, used to revert a rejected keystroke. */
  private lastRegexAcceptedValue = '';
  /**
   * Whether the field holds an edit the user has just typed. Armed by a keystroke and spent by
   * the first programmatic write that changes the field - a consumer reformatting that very
   * edit. Cleared on focus, so a value arriving from elsewhere (a day picked in a datepicker
   * panel, which hands focus back to the input before writing) is not mistaken for one.
   */
  private caretFollowsUserEdit = false;

  @Element() el!: HTMLTkInputElement;

  @AttachInternals() internals: ElementInternals;

  @State() hasFocus = false;
  @State() inputType: string;
  @State() isCounter = false;
  @State() isPassword = false;
  @State() passwordStrength: number = 0;
  @State() hasLabelSlot: boolean = false;

  /**
   * the user cannot interact with the input.
   */
  @Prop() disabled = false;

  /**
   * Indicates whether the input is in an invalid state
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * Indicates whether the input can be cleared
   * @defaultValue false
   */
  @Prop() clearable: boolean = false;

  /**
   * This is the error message that will be displayed.
   */
  @Prop() error: string;

  /**
   * Provided a hint or additional information about the input.
   */
  @Prop() hint: string;

  /**
   * Specifies a material icon name to be displayed.
   */
  @Prop() icon?: string | IIconOptions | IMultiIconOptions;

  /**
   * Defines the position of the icon.
   * @defaultValue left
   */
  @Prop() iconPosition: 'left' | 'right' = 'left';

  /**
   * Defines the label for the input.
   */
  @Prop() label: string;

  /**
   * Defines the prefix of the input;
   */
  @Prop() pre?: string;

  /**
   * The maskOptions prop is used to define masking configurations supported by the Cleave.js library. With this prop, you can specify any masking options described in the Cleave.js documentation (https://nosir.github.io/cleave.js/). For example, you can configure it for formatting dates, phone numbers, or credit card numbers as needed.
   */
  @Prop() maskOptions: IInputMaskOptions;
  @Watch('maskOptions')
  protected maskOptionsChanged(newValue: IInputMaskOptions, oldValue: IInputMaskOptions) {
    if (isEqual(newValue, oldValue) || !this.nativeInput) return;
    this.cleaveInstance?.destroy();
    this.cleaveInstance = undefined;
    // Drop any memoized regex matcher so it rebuilds for the new options, and
    // re-seed the revert target from the current field value under the new mask.
    this.regexMatcher = undefined;
    this.regexMatcherSource = undefined;
    this.lastRegexAcceptedValue = '';
    if (this.shouldUseCleave()) {
      this.cleaveInstance = new Cleave(this.nativeInput, {
        ...this.maskOptions,
      } as CleaveOptions);
    } else {
      this.syncRegexAcceptedValue(this.nativeInput.value);
    }
  }

  /**
   * Maximum value for number inputs
   */
  @Prop() max?: string | number;

  /**
   * Minimum value for number inputs
   */
  @Prop() min?: string | number;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string;

  /**
   * Placeholder text displayed when the input is empty.
   */
  @Prop() placeholder?: string | null;

  /**
   * If `true`, the user cannot modify the value.
   * @defaultValue false
   */
  @Prop() readonly: boolean = false;

  /**
   * Sets size for the component.
   * @defaultValue base
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  /**
   * if type = password safety status bar visible
   */
  @Prop() showSafetyStatus: boolean = false;

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * The key to use for option labels
   * @defaultValue label
   */
  @Prop() chipLabelKey: string = 'label';

  /**
   * Sets options for all chips rendered in chips mode.
   */
  @Prop() chipOptions: IChipOptions;
  /**
   * input type
   */
  @Prop() mode: 'text' | 'password' | 'counter' | 'number' | 'chips' = 'text';

  /**
   * Sets step for decimal value with mode number
   */
  @Prop() step: string;

  /**
   * A function that determines whether a chip is disabled.
   */
  @Prop() chipDisabled: Function;

  /**
   * Shows a loading spinner on the right side of the input.
   * @defaultValue false
   */
  @Prop() loading: boolean = false;

  /**
   * Hides the password lock icon.
   * @defaultValue false
   */
  @Prop() hidePasswordIcon: boolean = false;

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string | string[] | number | any[];
  @Watch('value')
  protected valueChanged(newValue, oldValue) {
    if (!isEqual(newValue, oldValue) && this.mode !== 'chips' && this.nativeInput) {
      if (typeof newValue === 'object' && typeof oldValue === 'object') {
        this.writeNativeValue(getNestedValue(newValue, this.chipLabelKey));
      } else {
        this.writeNativeValue(newValue);
      }
      // A programmatic value bypasses keystroke handling; keep the regex revert
      // target in sync so a later rejected keystroke restores this value.
      this.syncRegexAcceptedValue(this.nativeInput.value);
    }
  }

  /**
   * Sets the data-testid attribute on the root container element.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  /**
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'tk-change', composed: false }) tkChange!: EventEmitter<any>;

  /**
   * Emitted when the input loses focus.
   */
  @Event({ eventName: 'tk-blur' }) tkBlur: EventEmitter<void>;

  /**
   * Emitted when the input has focus.
   */
  @Event({ eventName: 'tk-focus' }) tkFocus: EventEmitter<void>;

  /**
   * Emitted when the clear button has click.
   */
  @Event({ eventName: 'tk-clear-click' }) tkClearClick: EventEmitter<void>;

  componentWillLoad() {
    this.hasLabelSlot = Array.from(this.el.children).some((child: Element) => child.getAttribute?.('slot') === 'label');

    // If the tk-input has a tabindex attribute we get the value
    // and pass it down to the native input, then remove it from the
    // tk-input to avoid causing tabbing twice on the same element
    if (this.el.hasAttribute('tabindex')) {
      const tabindex = this.el.getAttribute('tabindex');
      this.tabindex = tabindex !== null ? tabindex : undefined;
      this.el.removeAttribute('tabindex');
    }

    if (this.mode == 'text') {
      this.inputType = 'text';
    } else if (this.mode == 'number') {
      this.inputType = 'number';
    } else if (this.mode == 'password') {
      this.inputType = 'password';
      this.isPassword = true;
    } else if (this.mode == 'counter') {
      this.inputType = 'number';
      this.isCounter = true;
    }
  }

  componentDidLoad(): void {
    this.nativeInput = this.el.querySelector('input');
    if (this.mode === 'counter') {
      this.nativeInput.value = this.clampValueByLimit(this.value)?.toString() ?? '';
    }
    if (this.shouldUseCleave()) {
      this.cleaveInstance = new Cleave(this.nativeInput, {
        ...this.maskOptions,
      } as CleaveOptions);
    } else {
      // Seed the regex revert target from any initial value so the first rejected
      // keystroke restores it instead of wiping the field.
      this.syncRegexAcceptedValue(this.nativeInput.value);
    }
  }
  componentDidUpdate(): void {
    if (this.mode === 'counter') {
      this.nativeInput.value = this.clampValueByLimit(this.value)?.toString() ?? '';
    }
  }

  formResetCallback() {
    this.handleFormReset();
  }

  /**
   * Sets focus on the specified `tk-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    this.nativeInput?.focus();
  }

  private validateMinMax() {
    if (this.min === undefined && this.max === undefined) return;

    const numValue = parseFloat(this.value as string);
    if (isNaN(numValue)) return;

    if (this.min !== undefined && numValue < Number(this.min)) {
      this.value = this.mode === 'counter' ? Number(this.min) : this.min.toString();
      this.tkChange.emit(this.value);
    } else if (this.max !== undefined && numValue > Number(this.max)) {
      this.value = this.mode === 'counter' ? Number(this.max) : this.max.toString();
      this.tkChange.emit(this.value);
    }
  }

  /**
   * Toggles the visibility of the password input field.
   *
   * This method is called when the user interacts with the visibility toggle icon.
   *
   * @param event The mouse event triggered by the user interaction.
   * @param val A boolean value indicating whether to show or hide the password.
   */
  private visiblePassword(event, val: boolean) {
    if (val) {
      this.nativeInput.type = 'text';
      event.target.innerHTML = 'visibility_off';
    } else {
      this.nativeInput.type = 'password';
      event.target.innerHTML = 'visibility';
    }
  }

  /**
   * Calculates the strength of a given password.
   *
   * The password strength is determined based on the following criteria:
   * - Length of at least 8 characters
   * - Presence of uppercase letters
   * - Presence of lowercase letters
   * - Presence of numbers
   * - Presence of special characters
   *
   * Each met criterion increases the strength by 1. The maximum strength is 5.
   *
   * @param password The password to be evaluated.
   * @returns A number representing the password strength.
   */
  private calculatePasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }

  private clampValueByLimit = (value, operation?: string): number | null => {
    if (value === null || value === undefined || isNaN(value)) {
      return null;
    }

    const numValue = Number(value);

    if (this.min !== null && this.min !== undefined && numValue < Number(this.min)) {
      if (operation === 'increment') {
        return Number(this.min) + 1;
      }
      return Number(this.min);
    }

    if (this.max !== null && this.max !== undefined && numValue > Number(this.max)) {
      if (operation === 'decrement') {
        return Number(this.max) - 1;
      }
      return Number(this.max);
    }
    return numValue;
  };

  private isMaskDelimiterCharacter(charToCheck?: string): boolean {
    const delimiterChars = new Set<string>();
    if (typeof this.maskOptions.delimiter === 'string' && this.maskOptions.delimiter.length > 0) {
      delimiterChars.add(this.maskOptions.delimiter);
    }
    if (Array.isArray(this.maskOptions.delimiters)) {
      this.maskOptions.delimiters.forEach(delimiter => {
        if (typeof delimiter === 'string' && delimiter.length > 0) {
          delimiterChars.add(delimiter);
        }
      });
    }

    const decimalMark = this.maskOptions.numeralDecimalMark ?? '.';
    const isConfiguredDelimiter = !!charToCheck && delimiterChars.has(charToCheck);
    const isNumericThousandsDelimiterFallback =
      !!charToCheck && !!this.maskOptions.numeral && delimiterChars.size === 0 && /[^0-9]/.test(charToCheck) && charToCheck !== decimalMark;

    return !!charToCheck && (isConfiguredDelimiter || isNumericThousandsDelimiterFallback) && charToCheck !== decimalMark;
  }

  /**
   * Writes a programmatic value into the field without throwing the user out of it.
   * Assigning `input.value` always parks the caret at the end, which is fine for an idle
   * field but not while it has focus: a consumer that echoes `tk-change` back into `value`
   * (a controlled datepicker normalising "09:30" to "09:30 AM", for instance) would send
   * the caret to the end on every keystroke.
   *
   * Only that reformat keeps the caret. A value replacing what the user typed - the day picked
   * in a datepicker panel, which hands focus back to the input before writing - keeps the
   * native behaviour and lands the caret at the end, so the next keystroke appends instead of
   * dropping into the middle of a value the user never typed.
   */
  private writeNativeValue(value: unknown): void {
    const input = this.nativeInput;
    if (!input) return;

    const selection = this.getSelection(input);
    const previousValue = input.value;
    input.value = value as string;

    // An unchanged field left the caret alone: this is the keystroke being echoed back into
    // `value` by our own handler, so leave the edit armed for the reformat that follows it.
    if (input.value === previousValue) return;

    // Only the text after the caret may have been reformatted; anything else is a different
    // value, where the captured offset no longer points at what the user was editing.
    const isReformatOfUserEdit = !!selection && this.caretFollowsUserEdit && input.value.startsWith(previousValue.slice(0, selection[0]));
    this.caretFollowsUserEdit = false;
    if (isReformatOfUserEdit) this.restoreCaret(input, selection[1]);
  }

  /**
   * Re-syncs Cleave (its own listener runs after this one, so it still holds the previous
   * keystroke) and returns the formatted value. `setRawValue` writes the delimiter-less value
   * into the field first, which parks the caret at the end, so restore the caret afterwards.
   */
  private resyncCleaveValue(input: HTMLInputElement, cleave: Cleave): string {
    const selection = this.getSelection(input);
    // The caret sits at the end of the selection, which is where it stays once the keystroke
    // replaces a selected range.
    const wasAtEnd = !!selection && selection[1] >= input.value.length;

    cleave.setRawValue(cleave.getRawValue());
    const formattedValue = cleave.getFormattedValue();

    // At the end, follow any delimiter the mask appended ("2026" -> "2026-") - it belongs to
    // the keystroke that just landed; otherwise stay put.
    this.restoreCaret(input, wasAtEnd ? input.value.length : (selection?.[1] ?? null));

    return formattedValue;
  }

  /**
   * Current selection of a focused field, or null when there is nothing to preserve.
   * Only the text-like types carry a selection: on the `type="number"` that `mode="number"`
   * and `mode="counter"` render, `selectionStart` reads back as null and `setSelectionRange`
   * throws an InvalidStateError.
   */
  private getSelection(input: HTMLInputElement): [number, number] | null {
    const isFocused = (input.getRootNode() as Document | ShadowRoot)?.activeElement === input;
    const isSelectable = input.type === 'text' || input.type === 'password';
    if (!isFocused || !isSelectable || typeof input.setSelectionRange !== 'function') return null;
    return isNil(input.selectionStart) || isNil(input.selectionEnd) ? null : [input.selectionStart, input.selectionEnd];
  }

  /**
   * Puts the caret back where it was before the field was rewritten, clamped to the new value.
   * Always collapsed, never a range: the text underneath was rewritten, so a restored range
   * would cover an arbitrary slice of the new value and the next keystroke would delete it.
   */
  private restoreCaret(input: HTMLInputElement, caret: number | null): void {
    if (isNil(caret)) return;
    const position = Math.min(caret, input.value.length);
    input.setSelectionRange(position, position);
  }

  /**
   * Whether a Cleave.js instance should back the current mask. Cleave is only used
   * for its own formatting options; a `regex` mask is handled by the incremental
   * matcher instead, so we never build a (useless and side-effecting) Cleave
   * instance for it.
   */
  private shouldUseCleave(): boolean {
    return this.mode === 'text' && !!this.maskOptions && !this.maskOptions.regex;
  }

  /**
   * Re-seeds `lastRegexAcceptedValue` from a value that bypassed keystroke handling
   * (initial render, programmatic `value` set, mask change). Keeps the revert target
   * in sync so a later rejected keystroke restores the displayed value, not a stale one.
   */
  private syncRegexAcceptedValue(value: unknown): void {
    if (this.mode !== 'text' || !this.maskOptions?.regex) return;
    const next = value == null ? '' : String(value);
    const matcher = this.getRegexMatcher();
    // Only adopt values the mask would accept; an invalid programmatic value should
    // not become the revert target.
    if (!matcher || matcher(next) !== FAILED) {
      this.lastRegexAcceptedValue = next;
    }
  }

  /**
   * Picks the value to keep when `candidate` is rejected by the regex mask.
   *
   * Defaults to the last accepted value, which correctly handles a single bad key
   * pressed anywhere (the valid suffix is preserved). For a paste that introduces
   * new valid content followed by junk, it instead keeps the longest leading prefix
   * the matcher still accepts when that prefix is longer than the last accepted value.
   */
  private longestAcceptedPrefix(matcher: (value: string) => MatchState, candidate: string): string {
    let best = this.lastRegexAcceptedValue;
    for (let end = candidate.length; end > best.length; end--) {
      const prefix = candidate.slice(0, end);
      if (matcher(prefix) !== FAILED) {
        best = prefix;
        break;
      }
    }
    return best;
  }

  /**
   * Returns the incremental matcher for the current `maskOptions.regex`, rebuilding
   * it only when the regex source changes. Returns null when the regex is invalid or
   * uses syntax we cannot model (caller then skips masking and warns once).
   */
  private getRegexMatcher(): ((value: string) => MatchState) | null {
    const regex = this.maskOptions?.regex;
    if (!regex) return null;
    const source = typeof regex === 'string' ? regex : regex.source;
    if (this.regexMatcherSource !== source) {
      this.regexMatcherSource = source;
      this.regexMatcher = createIncrementalMatcher(stripAnchors(source));
      if (!this.regexMatcher) {
        // eslint-disable-next-line no-console
        console.warn(`[tk-input] maskOptions.regex "${source}" is invalid or unsupported (lookarounds/back-references are not supported); the regex mask is disabled.`);
      }
    }
    return this.regexMatcher ?? null;
  }

  private handleInput = (ev: Event) => {
    // The value about to be written back is the user's own edit; keep its caret when a
    // controlled consumer echoes a reformatted version of it back into `value`.
    this.caretFollowsUserEdit = true;
    if (this.mode != 'chips') {
      const input = ev.target as HTMLInputElement;
      let _value;

      if (this.mode == 'number' || this.mode == 'counter') {
        _value = input.value ? Number(input.value) : null;
      } else {
        _value = input.value || '';
      }

      if (this.maskOptions) {
        // Custom regex mask
        if (this.maskOptions?.regex && this.mode === 'text') {
          // The regex describes the final value, so we validate the typed value
          // incrementally: a complete match (DONE) or a valid prefix (MORE) is
          // accepted, while an impossible value (FAILED) is rejected and the input
          // reverts to the last accepted value — never wiping the whole field.
          const matcher = this.getRegexMatcher();
          if (matcher) {
            if (matcher(_value as string) === FAILED) {
              // The new value can't be valid. Salvage the longest prefix the matcher
              // still accepts — this keeps "ABC" when a single bad key is typed and,
              // on a paste like "AB!CD", keeps the leading "AB" instead of discarding
              // everything. Falls back to the last accepted value when nothing fits.
              _value = this.longestAcceptedPrefix(matcher, _value as string);
              const caretPos = _value.length;
              input.value = _value;
              input.setSelectionRange?.(caretPos, caretPos);
              this.lastRegexAcceptedValue = _value as string;
            } else {
              this.lastRegexAcceptedValue = _value as string;
            }
          }
        } else {
          if (this.maskOptions.letterOnly) {
            // If letterOnly option is enabled, filter out non-letters
            const selection = this.getSelection(input);
            const filtered = _value.replace(/[^a-zA-Z]/g, '');
            if (filtered !== input.value) {
              // Rewriting the field parks the caret at the end, so put it back where the user is
              // typing, moved left by however many characters the filter dropped before it. Done
              // here rather than after the Cleave re-sync, which captures the caret this leaves.
              const lettersBefore = (offset: number) => _value.slice(0, offset).replace(/[^a-zA-Z]/g, '').length;
              const caret = selection ? lettersBefore(selection[1]) : null;
              input.value = filtered;
              this.restoreCaret(input, caret);
            }
            _value = filtered;
          }

          if (this.cleaveInstance) {
            _value = this.resyncCleaveValue(input, this.cleaveInstance);
          }
        }
      }

      if (!isEqual(this.value, _value)) {
        this.value = _value;
        this.tkChange.emit(_value);
      }
    }

    if (this.mode == 'password' && this.showSafetyStatus) {
      this.passwordStrength = this.calculatePasswordStrength(String(this.value));
    }
  };

  private handleInputKeyUp = (ev: KeyboardEvent) => {
    const newInput = ev.target as HTMLInputElement;
    if (this.mode === 'counter' && newInput) {
      if (newInput.value === '') {
        this.nativeInput.value = '';
      } else {
        this.nativeInput.value = this.clampValueByLimit(Number(newInput.value))?.toString() ?? '';
      }
    }
  };

  private handleInputBlur = () => {
    this.hasFocus = false;
    this.validateMinMax();
    this.tkBlur.emit();
  };

  private handleFormReset() {
    if (this.mode === 'chips' && this.chipDisabled && Array.isArray(this.value)) {
      this.value = this.value.filter(item => this.chipDisabled(item));
    } else {
      this.value = null;
    }
    this.lastRegexAcceptedValue = '';
    this.tkChange.emit(this.value);
  }

  // for add chip
  private handleInputKeyDown = (e: KeyboardEvent) => {
    // --- Cleave.js maske ayırıcı karakterlerinin silinmesi için genel çözüm ---
    // Regex masks have no Cleave instance and manage their own value, so this
    // Cleave-specific delimiter handling must not run for them.
    if (this.maskOptions && !this.maskOptions.regex && this.cleaveInstance && this.mode == 'text' && (e.key === 'Backspace' || e.key === 'Delete')) {
      const input = this.nativeInput;
      const value = input.value;
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      // Sadece imleç varsa (seçili alan yoksa) işle
      if (selectionStart === selectionEnd) {
        let charToCheck: string | undefined;
        let posToRemove = -1;
        if (e.key === 'Backspace' && selectionStart > 0) {
          charToCheck = value[selectionStart - 1];
          posToRemove = selectionStart - 1;
        } else if (e.key === 'Delete' && selectionStart < value.length) {
          charToCheck = value[selectionStart];
          posToRemove = selectionStart;
        }

        // Eğer karakter bir ayırıcı ise (rakam/harf değilse)
        if (this.isMaskDelimiterCharacter(charToCheck)) {
          e.preventDefault();
          // Ayırıcıyı ve öncesindeki (Backspace) veya sonrasındaki (Delete) karakteri sil
          let newValue;
          let newCaretPos;
          if (e.key === 'Backspace') {
            // Ayırıcının öncesindeki karakteri sil
            newValue = value.slice(0, posToRemove - 1) + value.slice(posToRemove + 1);
            newCaretPos = posToRemove - 1;
          } else {
            // Ayırıcının sonrasındaki karakteri sil
            newValue = value.slice(0, posToRemove) + value.slice(posToRemove + 2);
            newCaretPos = posToRemove;
          }
          this.cleaveInstance.setRawValue(newValue);
          const formattedValue = this.cleaveInstance.getFormattedValue();
          input.value = formattedValue;
          this.value = formattedValue;
          this.tkChange.emit(this.value);

          // DOM güncellendikten sonra imleç pozisyonunu ayarla
          setTimeout(() => {
            input.setSelectionRange(newCaretPos, newCaretPos);
          }, 0);
          return; // Daha fazla işlem yapma
        }
      }
    }
    if (
      e.key == 'Enter' &&
      this.nativeInput.value.trim() &&
      this.mode == 'chips' &&
      // (!this.value || (this.value as string[])?.indexOf(this.nativeInput.value) == -1) &&
      (this.el.classList.contains('allow-custom-value-select') || !this.el.classList.contains('tk-select-input'))
    ) {
      if (this.value) {
        this.value = [...(this.value as string[]), this.nativeInput.value];
        this.tkChange.emit(this.value);
      } else {
        this.value = [this.nativeInput.value];
        this.tkChange.emit([this.nativeInput.value]);
      }

      this.nativeInput.value = '';
    }
  };

  private handleMinusButtonClick() {
    if (!this.disabled) {
      const currentValue = Number(this.value) || 0;
      const newValue = this.clampValueByLimit(currentValue - 1, 'decrement');
      if (newValue !== null && newValue !== Number(this.value)) {
        this.value = newValue;
        this.tkChange.emit(newValue);
      }
    }
  }

  private handlePlusButtonClick() {
    if (!this.disabled) {
      let currentValue: number;
      if (this.value === '' || this.value === null || this.value === undefined) {
        currentValue = !isNil(this.min) ? Number(this.min) : 0;
      } else {
        currentValue = Number(this.value);
      }

      const newValue = this.clampValueByLimit(currentValue + 1, 'increment');
      if (newValue !== null && newValue !== Number(this.value)) {
        this.value = newValue;
        this.tkChange.emit(newValue);
      }
    }
  }

  private handleChipsRemove(index: number) {
    if (this.readonly || this.disabled) return;
    const chipsArr = [...(this.value as any[])];

    if (index >= 0 && index < chipsArr.length) {
      chipsArr.splice(index, 1);
      this.value = chipsArr;
      this.tkChange.emit(chipsArr);
    }
  }

  private handleClearButtonClick = (e: Event) => {
    if (this.readonly || this.disabled) return;
    e.stopPropagation();
    this.handleFormReset();
    this.tkClearClick.emit();
  };

  private handleClearButtonKeyDown = (e: KeyboardEvent) => {
    // Make clear button accessible via Space and Enter keys
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.handleFormReset();
      this.tkClearClick.emit();
    }
  };

  private handleInputFocus = () => {
    this.hasFocus = true;
    // Focus arriving from outside ends the edit the caret was being kept for.
    this.caretFollowsUserEdit = false;

    this.tkFocus.emit();
  };

  private handleMouseDown = (event: MouseEvent) => {
    this.visiblePassword(event, true);
  };

  private handleMouseUp = (event: MouseEvent) => {
    this.visiblePassword(event, false);
  };

  /**
   * Handles label click:
   * - preventDefault() stops the browser from dispatching a synthetic click
   *   on the associated <input> (caused by htmlFor).
   * - Manual focus() preserves the label-click-to-focus UX.
   */
  private handleLabelClick = (e: MouseEvent): void => {
    e.preventDefault();
    this.nativeInput?.focus();
  };

  /**
   * Renders the password strength indicator lines.
   *
   * The strength lines visually indicate the password strength:
   * - 1 or 2 filled lines: Weak (red color)
   * - 3 filled lines: Medium (yellow color)
   * - 4 filled lines: Strong (green color)
   *
   * The method creates four lines and assigns a CSS class based on the current password strength.
   *
   * @returns An array of JSX elements representing the strength indicator lines.
   */
  private renderStrengthLines(): HTMLElement[] {
    const lines: HTMLElement[] = [];
    for (let i = 0; i < 4; i++) {
      let className = 'line';
      if (i < this.passwordStrength) {
        if (this.passwordStrength < 3) className += ' weak';
        else if (this.passwordStrength < 4) className += ' medium';
        else className += ' strong';
      }
      lines.push(
        <span class={className} data-testid={getDataTestId(this.dataTestid, 'strength-line', i.toString())}>
          &nbsp;
        </span>,
      );
    }
    return lines;
  }

  private renderChips() {
    if (this.mode == 'chips' && typeof this.value == 'object' && (this.value as any[])?.length > 0) {
      return (this.value as any[]).map((item, index) => {
        const itemChipOptions = this.chipOptions || {};
        let isRemovable;
        if (this.chipDisabled?.(item) || this.disabled) {
          isRemovable = false;
        } else if (typeof item === 'object' && item !== null && item.hasOwnProperty('removable')) {
          isRemovable = item.removable;
        } else {
          isRemovable = true;
        }
        const baseProps = {
          ...itemChipOptions,
          removable: isRemovable,
          key: index,
          autoSelfDestroy: false,
          value: item,
          variant: (itemChipOptions.variant ?? 'neutral') as IChipOptions['variant'],
          type: (itemChipOptions.type ?? 'outlined') as IChipOptions['type'],
          size: (itemChipOptions.size ?? 'small') as IChipOptions['size'],
          disabled: this.disabled,
        };
        const isIndicator = typeof item === 'object' && item !== null && (item.__isOthersIndicator || item.__isAllIndicator);
        const label = isIndicator ? item.label : typeof item === 'object' ? getNestedValue(item, this.chipLabelKey) : String(item);

        return (
          <tk-chips
            label={label}
            onTk-remove={() => this.handleChipsRemove(index)}
            {...baseProps}
            dataTestid={getDataTestId(this.dataTestid, 'chips', index.toString())}
          ></tk-chips>
        );
      });
    }
  }

  private renderInput(): HTMLInputElement {
    return (
      <input
        id={this.uniqueId}
        ref={el => (this.nativeInput = el)}
        disabled={this.disabled}
        autoComplete="off"
        type={this.inputType}
        name={this.name}
        min={this.min}
        max={this.max}
        step={this.step}
        placeholder={this.placeholder || ''}
        readOnly={this.readOnly || !this.editable}
        tabindex={this.tabindex}
        value={this.mode === 'chips' ? undefined : typeof this.value === 'object' && this.value !== null ? getNestedValue(this.value, this.chipLabelKey) : this.value}
        onInput={this.handleInput}
        onBlur={this.handleInputBlur}
        onFocus={this.handleInputFocus}
        onKeyDown={this.handleInputKeyDown}
        onKeyUp={this.handleInputKeyUp}
        data-testid={getDataTestId(this.dataTestid, 'native-input')}
      />
    );
  }

  private renderLabel(): HTMLLabelElement {
    let label;
    if (this.label?.length > 0 || this.hasLabelSlot) {
      const asterisk = (
        <span class="asterisk" data-testid={getDataTestId(this.dataTestid, 'label-asterisk')}>
          *
        </span>
      );
      const labelContent = this.hasLabelSlot ? <slot name="label"></slot> : this.label;
      label = (
        <label htmlFor={this.uniqueId} class="label" onClick={this.handleLabelClick} data-testid={getDataTestId(this.dataTestid, 'label')}>
          {labelContent}
          {this.showAsterisk ? asterisk : ''}
        </label>
      );
    }
    return label;
  }

  private renderAlignmentButtons() {
    let leftButton: HTMLTkButtonElement;
    let rightButton: HTMLTkButtonElement;
    if (this.isCounter) {
      leftButton = (
        <tk-icon
          {...getIconElementProps(
            'remove',
            {
              class: classNames('counter-icon clickable', { disabled: this.disabled || Number(this.value) <= Number(this.min) }),
              onClick: this.handleMinusButtonClick.bind(this),
            },
            undefined,
            'span',
          )}
          dataTestid={getDataTestId(this.dataTestid, 'counter-decrease-icon')}
        />
      );

      rightButton = (
        <tk-icon
          {...getIconElementProps(
            'add',
            {
              class: classNames('counter-icon clickable', { disabled: this.disabled || Number(this.value) >= Number(this.max) }),
              onClick: this.handlePlusButtonClick.bind(this),
            },
            undefined,
            'span',
          )}
          dataTestid={getDataTestId(this.dataTestid, 'counter-increase-icon')}
        />
      );
    }
    return { left: leftButton, right: rightButton };
  }

  private renderPasswordIcons() {
    let passwordLeftIcon: HTMLTkIconElement;
    let passwordRightIcon: HTMLTkIconElement;

    if (this.inputType == 'password') {
      if (!this.hidePasswordIcon) {
        passwordLeftIcon = (
          <tk-icon
            {...getIconElementProps('lock', {
              color: 'var(--icon-base)',
            })}
            dataTestid={getDataTestId(this.dataTestid, 'password-lock-icon')}
          />
        );
      }
      passwordRightIcon = (
        <tk-icon
          {...getIconElementProps('visibility', {
            class: 'clickable',
            color: 'var(--icon-base)',
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
          })}
          dataTestid={getDataTestId(this.dataTestid, 'password-visibility-icon')}
        />
      );
    }
    return { left: passwordLeftIcon, right: passwordRightIcon };
  }

  render() {
    let _leftIcon: HTMLTkIconElement;
    let _rightIcon: HTMLTkIconElement;
    let safetyStatus: HTMLElement;

    if (this.showSafetyStatus) {
      safetyStatus = (
        <div class="safety-status" data-testid={getDataTestId(this.dataTestid, 'safety-status')}>
          {this.renderStrengthLines()}
        </div>
      );
    }

    const rootClasses = classNames('tk-input-container', this.size, { focus: this.hasFocus, counter: this.isCounter, chips: this.mode == 'chips' });
    const prefixClass = classNames('tk-input-prefix-container', this.size);

    // Handle icon rendering using utility function
    if (this.icon && !this.isCounter) {
      const { leftIcon, rightIcon } = renderIcons(this.icon, { additionalProps: { color: 'var(--icon-base)' }, dataTestid: this.dataTestid }, this.iconPosition);
      _leftIcon = leftIcon;
      _rightIcon = rightIcon;
    }

    const showClearButton = this.clearable && !this.readonly && ((this.mode !== 'chips' && this.value) || (this.mode === 'chips' && (this.value as [])?.length > 0));

    if (this.el.classList.contains('tk-select-input')) {
      this.readOnly = this.el.classList.contains('readonly-select');
      // readOnly hides clear button and makes input readOnly(disables input), editable only impacts input readOnly
      this.editable = this.el.classList.contains('editable-select');
    } else {
      this.readOnly = this.readonly;
    }

    return (
      <div aria-readonly={this.readonly} aria-disabled={this.disabled} aria-invalid={this.invalid} class={rootClasses} data-testid={getDataTestId(this.dataTestid, 'container')}>
        {this.renderLabel()}
        <div class="tk-input" data-testid={getDataTestId(this.dataTestid, 'control')}>
          {this.renderChips()}
          {!_leftIcon && this.renderPasswordIcons().left}
          {_leftIcon}
          {this.renderAlignmentButtons().left}
          {this.pre && (
            <div class={prefixClass} data-testid={getDataTestId(this.dataTestid, 'prefix')}>
              <span class="tk-input-prefix-text" data-testid={getDataTestId(this.dataTestid, 'prefix-text')}>
                {this.pre}
              </span>
              <span class="tk-input-divider" data-testid={getDataTestId(this.dataTestid, 'prefix-divider')}></span>
            </div>
          )}
          {this.renderInput()}
          {this.loading && (
            <tk-spinner
              size={this.size === 'large' ? 'small' : this.size === 'base' ? 'xsmall' : 'xxsmall'}
              dataTestid={getDataTestId(this.dataTestid, 'loading-spinner')}
            ></tk-spinner>
          )}
          {showClearButton && (
            <tk-icon
              {...getIconElementProps('close', {
                class: classNames('tk-input-clear-button clickable', { disabled: this.disabled || this.readonly }),
                color: 'var(--icon-base)',
                onClick: this.handleClearButtonClick,
                onKeyDown: this.handleClearButtonKeyDown,
                tabindex: this.disabled || this.readonly ? -1 : 0,
              })}
              dataTestid={getDataTestId(this.dataTestid, 'clear-icon')}
            />
          )}
          {_rightIcon}
          {!_rightIcon && this.renderPasswordIcons().right}
          {this.renderAlignmentButtons().right}
        </div>
        {safetyStatus}
        {renderHint(this.hint, this.error, this.invalid, this.dataTestid)}
      </div>
    );
  }
}
