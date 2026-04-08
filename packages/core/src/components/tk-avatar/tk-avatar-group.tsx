import { Component, ComponentInterface, Element, Prop, h } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'tk-avatar-group',
  styleUrl: 'tk-avatar-group.scss',
})
export class TkAvatarGroup implements ComponentInterface {
  @Element() el: HTMLTkAvatarGroupElement;

  /**
   * Whether the avatars should have a shared background
   * @defaultValue false
   */
  @Prop() compact?: boolean = false;

  render() {
    return (
      <div class={classNames('tk-avatar-group', { 'tk-avatar-group-compact': this.compact })}>
        <slot></slot>
      </div>
    );
  }
}
