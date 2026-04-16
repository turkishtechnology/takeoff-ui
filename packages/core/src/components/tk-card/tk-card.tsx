import { Component, ComponentInterface, Element, Fragment, Prop, State, h } from '@stencil/core';
import classNames from 'classnames';
import { CSSStyleProperties } from '../../global/types';
import { getDataTestidAttribute } from '../../utils/test-id-utils';

/**
 * TkCard component description.
 * @slot default - Default slot to detect child to inner body.
 * @slot header - Custom header template.
 * @slot avatar - Custom avatar template of card header.
 * @slot content - Custom content template.
 * @slot footer - Custom footer template.
 * @slot footer-actions - Custom actions template to default footer.
 * @slot header-action - Custom action template on the right side of the card header.
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
  @State() hasHeaderActionSlot: boolean;
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
    size: 'small',
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
  @Prop() containerStyle?: CSSStyleProperties = null;

  /**
   * The style attribute of content element
   */
  @Prop() contentStyle?: CSSStyleProperties = null;

  /**
   * Provides a stable selector for test automation.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  componentWillLoad() {
    this.hasHeaderSlot = !!this.el.querySelector(':scope > [slot="header"]');
    this.hasAvatarSlot = !!this.el.querySelector(':scope > [slot="avatar"]');
    this.hasContentSlot = !!this.el.querySelector(':scope > [slot="content"]');
    this.hasFooterSlot = !!this.el.querySelector(':scope > [slot="footer"]');
    this.hasFooterActionsSlot = !!this.el.querySelector(':scope > [slot="footer-actions"]');
    this.hasHeaderActionSlot = !!this.el.querySelector(':scope > [slot="header-action"]');
    this.hasDefaultSlotBody = Array.from(this.el.childNodes).some(node => {
      return node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).hasAttribute('slot');
    });
  }

  private __getDataTestidAttribute(...suffixes: Array<string | undefined>) {
    return getDataTestidAttribute(this.dataTestid, 'card', ...suffixes);
  }

  private createHeader() {
    if (this.hideHeader) return null;
    if (this.hasHeaderSlot) {
      return <slot name="header"></slot>;
    } else {
      if (!this.header) return null;
      return (
        <div
          {...this.__getDataTestidAttribute('header')}
          class={classNames('tk-card-header', `tk-card-header-${this.headerPosition}`, {
            [`tk-card-header-${this.headerType}`]: !this.imageOptions.background,
          })}
        >
          <div class="tk-card-header-content" {...this.__getDataTestidAttribute('header-content')}>
            {this.hasAvatarSlot ? (
              <slot name="avatar"></slot>
            ) : (
              <Fragment>
                {this.showAvatar && (
                  <div class="tk-card-avatar" {...this.__getDataTestidAttribute('avatar-container')}>
                    {' '}
                    <tk-avatar {...this.avatarProps} {...this.__getDataTestidAttribute('avatar')}></tk-avatar>
                  </div>
                )}
              </Fragment>
            )}
            <div class="tk-card-title-container" {...this.__getDataTestidAttribute('title-container')}>
              {this.subheader && (
                <span class="tk-card-subtitle" {...this.__getDataTestidAttribute('subtitle')}>
                  {this.subheader}
                </span>
              )}
              {this.header && (
                <span class="tk-card-title" {...this.__getDataTestidAttribute('title')}>
                  {this.header}
                </span>
              )}
            </div>
          </div>
          {this.hasHeaderActionSlot ? (
            <slot name="header-action"></slot>
          ) : (
            this.showMenuButton && (
              <tk-button
                variant="neutral"
                icon="more_vert"
                size="base"
                type="text"
                aria-label="TkCard Header Menu Button"
                {...this.__getDataTestidAttribute('header-menu-button')}
              ></tk-button>
            )
          )}
        </div>
      );
    }
  }

  private createImage() {
    if (!this.image || this.imageOptions.background) return null;
    const imageClasses = classNames('tk-card-image', `tk-card-image-${this.imageOptions.position}`, { 'tk-card-windowed-image': this.imageOptions.windowed });
    return (
      <div class={imageClasses} {...this.__getDataTestidAttribute('image')}>
        <img src={this.image} alt="Card image" {...this.__getDataTestidAttribute('image-tag')} />
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
        <div class="tk-card-content" style={this.contentStyle} {...this.__getDataTestidAttribute('content')}>
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
          {...this.__getDataTestidAttribute('footer')}
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
          <div class="tk-card-horizontal-has-image-container" {...this.__getDataTestidAttribute('horizontal-has-image-container')}>
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
      ...this.__getDataTestidAttribute(),
    };
    return <div {...rootProps}>{this.renderCardContent()}</div>;
  }
}
