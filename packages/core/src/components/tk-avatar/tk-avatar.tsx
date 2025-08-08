import { Component, ComponentInterface, Element, Prop, h } from '@stencil/core';
import classNames from 'classnames';

/**
 * The `TkAvatar` represents a user, labels, and display the images or a brand.
 * @react `import { TkAvatar, TkAvatarGroup } from '@takeoff-ui/react'`
 * @vue `import { TkAvatar, TkAvatarGroup } from '@takeoff-ui/vue'`
 * @angular `import { TkAvatar, TkAvatarGroup } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-avatar',
  styleUrl: 'tk-avatar.scss',
})
export class TkAvatar implements ComponentInterface {
  @Element() el: HTMLTkAvatarElement;

  /**
   * ID of the element that labels the avatar - accessibility
   */
  @Prop() ariaLabelledby?: string = null;

  /**
   * Background style of the avatar
   * @defaultValue 'brand'
   */
  @Prop() background?: 'brand' | 'solid' = 'brand';

  /**
   * The badge to be displayed in the avatar
   * @defaultValue false
   */
  @Prop() badge?: boolean = false;

  /**
   * The status of the badge
   * @defaultValue success
   */
  @Prop() badgeStatus?: 'success' | 'warning' | 'info' | 'danger' = 'success';

  /**
   * URL of the image to be displayed in the avatar
   */
  @Prop() image?: string = null;

  /**
   * Text label to be displayed in the avatar
   */
  @Prop() label?: string = null;

  /**
   * Name associated with the avatar - accessibility
   */
  @Prop() name?: string = null;

  /**
   * Whether the avatar should have rounded corners
   * @defaultValue false
   */
  @Prop() rounded?: boolean = false;

  /**
   * Appearance of the avatar
   * @defaultValue 'primary'
   */
  @Prop() variant?: 'primary' | 'light' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

  /**
   * Size of the avatar
   * @defaultValue 'base'
   */
  @Prop() size?: 'xsmall' | 'small' | 'base' | 'large' | 'xlarge' = 'base';

  private renderDefaultSvg() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 52" fill="currentColor">
        <circle cx="32.3068" cy="12.0212" r="12.0212" fill="currentColor" />
        <path
          d="M64 54.0952C64 46.9218 60.6286 40.0421 54.6274 34.9697C48.6263 29.8973 40.4869 27.0476 32 27.0476C23.5131 27.0476 15.3737 29.8973 9.37259 34.9697C3.37142 40.0421 1.28149e-06 46.9217 0 54.0952L32 54.0952H64Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  render() {
    const containerClasses = classNames('tk-avatar-container', `tk-avatar-${this.size}`);
    const rootClasses = classNames('tk-avatar', `tk-avatar-${this.variant}`, `tk-avatar-${this.background}`, {
      'tk-avatar-rounded': this.rounded,
    });
    return (
      <div class={containerClasses} part={`avatar ${this.size}`}>
        <div class={rootClasses} part="avatar" aria-label={this.name} aria-labelledby={this.ariaLabelledby}>
          {this.label && <span class="tk-avatar-label">{this.label}</span>}
          {this.image && <img class="tk-avatar-image" src={this.image} alt={this.name} />}
          {!this.label && !this.image && this.renderDefaultSvg()}
        </div>
        {this.badge && this.rounded && <span part="badge" class={classNames('tk-avatar-badge', `tk-avatar-badge-status-${this.badgeStatus}`)}></span>}
      </div>
    );
  }
}
