import { Component, ComponentInterface, Element, Fragment, Prop, State, h } from '@stencil/core';
import classNames from 'classnames';

/**
 * TkCard component description.
 * @slot default - Default slot to detect child to inner body.
 * @slot header - Custom header template.
 * @slot avatar - Custom avatar template of card header.
 * @slot content - Custom content template.
 * @slot footer - Custom footer template.
 * @slot footer-actions - Custom actions template to default footer.
 * @react `import { TkCard } from '@takeoff-ui/react'`
 * @vue `import { TkCard } from '@takeoff-ui/vue'`
 * @angular `import { TkCard } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-card',
  styleUrl: 'tk-card.scss',
  shadow: true,
})
export class TkCard implements ComponentInterface {
  @Element() el: HTMLTkCardElement;

  @State() hasHeaderSlot: boolean;
  @State() hasAvatarSlot: boolean;
  @State() hasContentSlot: boolean;
  @State() hasFooterSlot: boolean;
  @State() hasFooterActionsSlot: boolean;
  @State() hasDefaultSlotBody: boolean;

  /**
   * TO DO
   * Options for the image display
   * @defaultValue { position: 'top', background: false, windowed: false }
   */
  @Prop() imageOptions: {
    badge?: string;
    badgeIcon?: string;
    badgeIconPosition?: 'left' | 'right';
    windowed?: boolean;
    background?: boolean;
    backgroundUrl?: string;
    position?: 'top' | 'left' | 'right' | 'background';
  } = {
    position: 'top',
    background: false,
    windowed: true,
  };

  /**
   * Controls whether the header avatar is shown
   * @defaultValue false
   */
  @Prop() showAvatar: boolean = false;

  /**
   * TO DO State hata verdiği için buraya alındı, düzeltilecek
   * TkAvatar component properties
   * @defaultValue { severity: 'light', background: 'solid', rounded: true }
   */
  @Prop() avatarProps: any = {
    severity: 'light',
    background: 'solid',
    rounded: true,
  };

  /**
   * Controls whether the header is hidden
   * @defaultValue false
   */
  @Prop() hideHeader: boolean = false;

  /**
   * Controls whether the menu button is shown
   * @defaultValue false
   */
  @Prop() showMenuButton: boolean = false;

  /**
   * The image source for the card
   * @defaultValue null
   */
  @Prop() image: string = null;

  /**
   * The position of the header
   * @defaultValue 'top'
   */
  @Prop() headerPosition: 'top' | 'bottom' = 'top';

  /**
   * The header text
   */
  @Prop() header: string;

  /**
   * The subheader text
   */
  @Prop() subheader: string;

  /**
   * The type of the header
   * @defaultValue 'basic'
   */
  @Prop() headerType: 'basic' | 'divided' | 'light' | 'dark' | 'primary' = 'basic';

  /**
   * Controls whether the card is displayed horizontally
   * @defaultValue false
   */
  @Prop() horizontal: boolean = false;

  /**
   * The mode of the footer
   * @defaultValue 'basic'
   */
  @Prop() footerType: 'basic' | 'divided' | 'light' = 'basic';

  /**
   * Controls whether the card shows a hover shadow effect
   * @defaultValue false
   */
  @Prop() enableHoverShadow: boolean = false;

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle?: any = null;

  /**
   * The style attribute of content element
   */
  @Prop() contentStyle?: any = null;

  componentWillLoad() {
    this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
    this.hasAvatarSlot = !!this.el.querySelector('[slot="avatar"]');
    this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
    this.hasFooterSlot = !!this.el.querySelector('[slot="footer"]');
    this.hasFooterActionsSlot = !!this.el.querySelector('[slot="footer-actions"]');
    this.hasDefaultSlotBody = Array.from(this.el.childNodes).some(node => {
      return node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).hasAttribute('slot');
    });
  }

  private createHeader() {
    if (this.hideHeader) return null;
    if (this.hasHeaderSlot) {
      return <slot name="header"></slot>;
    } else {
      if (!this.header) return null;
      return (
        <div
          class={classNames('tk-card-header', `tk-card-header-${this.headerPosition}`, {
            [`tk-card-header-${this.headerType}`]: !this.imageOptions.background,
          })}
        >
          <div class="tk-card-header-content">
            {this.hasAvatarSlot ? (
              <slot name="avatar"></slot>
            ) : (
              <Fragment>
                {this.showAvatar && (
                  <div class="tk-card-avatar">
                    {' '}
                    <tk-avatar {...this.avatarProps}></tk-avatar>
                  </div>
                )}
              </Fragment>
            )}
            <div class="tk-card-title-container">
              {this.subheader && <span class="tk-card-subtitle">{this.subheader}</span>}
              {this.header && <span class="tk-card-title">{this.header}</span>}
            </div>
          </div>
          {this.showMenuButton && <tk-button variant="neutral" icon="more_vert" size="base" type="text" aria-label="TkCard Header Menu Button"></tk-button>}
        </div>
      );
    }
  }

  private createImage() {
    if (!this.image || this.imageOptions.background) return null;
    const imageClasses = classNames('tk-card-image', `tk-card-image-${this.imageOptions.position}`, { 'tk-card-windowed-image': this.imageOptions.windowed });
    return (
      <div class={imageClasses}>
        <img src={this.image} alt="Card image" />
        {/* {this.imageOptions.badge && (
          TODO: Add Badge
        )} */}
      </div>
    );
  }

  private createContent() {
    if (this.hasContentSlot) {
      return <slot name="content"></slot>;
    } else if (this.hasDefaultSlotBody) {
      return (
        <div class="tk-card-content" style={this.contentStyle}>
          <slot></slot>
        </div>
      );
    }
    return null;
  }

  private createFooter() {
    if (this.hasFooterSlot) {
      return <slot name="footer"></slot>;
    } else if (this.hasFooterActionsSlot) {
      return (
        <div
          class={classNames('tk-card-footer', {
            [`tk-card-footer-${this.footerType}`]: !this.imageOptions.background,
          })}
        >
          <slot name="footer-actions"></slot>
        </div>
      );
    }
    return null;
  }

  private renderCardContent() {
    const header = this.createHeader();
    const image = this.createImage();
    const content = this.createContent();
    const footer = this.createFooter();
    const imageOption = this.imageOptions.position;

    if (imageOption === 'top') {
      return (
        <Fragment>
          {this.headerPosition === 'top' && header}
          {image}
          {this.headerPosition === 'bottom' && header}
          {content}
          {footer}
        </Fragment>
      );
    } else if (this.horizontal && (imageOption === 'left' || imageOption === 'right')) {
      return (
        <Fragment>
          {imageOption === 'left' && image}
          <div class="tk-card-horizontal-has-image-container">
            {header}
            {content}
            {footer}
          </div>
          {imageOption === 'right' && image}
        </Fragment>
      );
    }
  }

  render() {
    const rootClasses = classNames('tk-card', {
      'tk-card-vertical': !this.horizontal,
      'tk-card-horizontal': this.horizontal,
      'tk-card-image-background': this.imageOptions.background,
      'has-hover-shadow': this.enableHoverShadow,
    });

    const rootProps = {
      class: rootClasses,
      style: {
        ...(this.imageOptions.backgroundUrl && { background: `url(${this.imageOptions.backgroundUrl})` }),
        ...this.containerStyle,
      },
    };
    return <div {...rootProps}>{this.renderCardContent()}</div>;
  }
}
