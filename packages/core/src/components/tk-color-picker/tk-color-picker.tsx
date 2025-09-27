import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tk-color-picker',
  styleUrl: 'tk-color-picker.scss',
  shadow: true,
})
export class TkColorPicker {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
