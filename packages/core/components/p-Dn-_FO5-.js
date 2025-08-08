import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$7 } from './p-DOzOzA8V.js';
import { d as defineCustomElement$6 } from './p-Byx8wTce.js';
import { d as defineCustomElement$5 } from './p-VOpLmPkP.js';
import { d as defineCustomElement$4 } from './p-75KyitY6.js';
import { d as defineCustomElement$3 } from './p-C9ySY_bP.js';
import { d as defineCustomElement$2 } from './p-jrcAclfE.js';
import { d as defineCustomElement$1 } from './p-BkhDFlMy.js';

const tkPaginationCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}tk-pagination{display:block}.tk-pagination-container{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}.tk-pagination-container .tk-pagination-start{margin-right:auto}.tk-pagination-container .tk-pagination-end{margin-left:auto;display:flex;gap:var(--pagination-base-right-gap, 12px)}.tk-pagination-container .tk-pagination-tag{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:var(--pagination-base-tag-gap, 0px)}.tk-pagination-container .tk-pagination-tag .tk-pagination-tag-label{color:var(--text-base, #717784);font-family:var(--desktop-body-xs-font, Geologica);font-size:var(--desktop-body-xs-size, 12px);font-style:normal;font-weight:400;line-height:var(--desktop-body-xs-line-height, 18px);}.tk-pagination-container .tk-pagination{display:flex;align-items:center;flex-wrap:wrap;gap:var(--pagination-base-gap, 6px)}.tk-pagination-container .tk-pagination .tk-pagination-prev-actions,.tk-pagination-container .tk-pagination .tk-pagination-next-actions{display:flex;align-items:center;gap:var(--pagination-base-arrow-gap, 4px)}.tk-pagination-container .tk-pagination .tk-pagination-cell{display:flex;min-width:32px;height:32px;padding:6px 11px;justify-content:center;align-items:center;border-radius:8px;background:none;border:none;cursor:pointer;color:var(--text-darkest, #222530);font-family:var(--desktop-body-s-font);font-size:var(--desktop-body-s-size, 14px);font-style:normal;font-weight:400;line-height:var(--desktop-body-s-line-height, 20px);}.tk-pagination-container .tk-pagination .tk-pagination-cell .tk-pagination-page-label{color:var(--text-darkest)}.tk-pagination-container .tk-pagination .tk-pagination-cell .tk-pagination-cell-icon i{font-size:20px;width:20px;height:20px;color:var(--icon-base)}.tk-pagination-container .tk-pagination .tk-pagination-cell:hover:not(:disabled):not(.tk-pagination-ellipsis){background:var(--background-lightest, #f9fafc)}.tk-pagination-container .tk-pagination .tk-pagination-cell:focus-visible{border:var(--spacing-px, 1px) solid var(--states-info-base, #3b82f6)}.tk-pagination-container .tk-pagination .tk-pagination-cell:disabled .tk-pagination-page-label,.tk-pagination-container .tk-pagination .tk-pagination-cell:disabled .tk-pagination-cell-icon i{color:var(--text-sub-base, #99a0ae)}.tk-pagination-container .tk-pagination.tk-pagination-rounded:not(.tk-pagination-compact-expanded) .tk-pagination-page{border-radius:var(--radius-full)}.tk-pagination-container .tk-pagination.tk-pagination-outlined .tk-pagination-page{border:var(--spacing-px, 1px) solid var(--border-light, #e1e4ea)}.tk-pagination-container .tk-pagination.tk-pagination-grouped{display:inline-flex;align-items:center;padding:var(--pagination-base-container-v-padding, 2px) 0px;border-radius:8px;border:var(--spacing-px, 1px) solid var(--border-light, #e1e4ea);background:var(--static-light, #fff);overflow:hidden}.tk-pagination-container .tk-pagination.tk-pagination-grouped .tk-pagination-divider{width:1px;height:16px;background-color:var(--border-light, #e1e4ea)}.tk-pagination-container .tk-pagination.tk-pagination-compact .tk-pagination-cell{width:36px;height:36px}.tk-pagination-container .tk-pagination.tk-pagination-compact .tk-pagination-current-label{color:var(--text-base, #717784);font-family:var(--desktop-body-s-font, Geologica);font-size:var(--desktop-body-s-size, 14px);font-style:normal;font-weight:400;line-height:var(--desktop-body-s-line-height, 20px);}.tk-pagination-container .tk-pagination.tk-pagination-compact .tk-pagination-first,.tk-pagination-container .tk-pagination.tk-pagination-compact .tk-pagination-prev,.tk-pagination-container .tk-pagination.tk-pagination-compact .tk-pagination-next,.tk-pagination-container .tk-pagination.tk-pagination-compact .tk-pagination-last{border:var(--spacing-px, 1px) solid var(--border-light, #e1e4ea)}.tk-pagination-container .tk-pagination.tk-pagination-compact.tk-pagination-rounded .tk-pagination-first,.tk-pagination-container .tk-pagination.tk-pagination-compact.tk-pagination-rounded .tk-pagination-prev,.tk-pagination-container .tk-pagination.tk-pagination-compact.tk-pagination-rounded .tk-pagination-next,.tk-pagination-container .tk-pagination.tk-pagination-compact.tk-pagination-rounded .tk-pagination-last{border-radius:var(--radius-full)}.tk-pagination-container .tk-pagination.tk-pagination-compact tk-input{width:48px;height:40px}.tk-pagination-container .tk-pagination .tk-pagination-page.tk-pagination-page-active{border:var(--spacing-px, 1px) solid var(--states-info-sub-base);background:var(--background-lightest, #f9fafc)}.tk-pagination-container .tk-pagination .tk-pagination-last:focus-visible,.tk-pagination-container .tk-pagination .tk-pagination-prev:focus-visible,.tk-pagination-container .tk-pagination .tk-pagination-page:focus-visible,.tk-pagination-container .tk-pagination .tk-pagination-next:focus-visible,.tk-pagination-container .tk-pagination .tk-pagination-first:focus-visible{border:var(--spacing-px, 1px) solid var(--states-info-base, #3b82f6);outline:none}@media (max-width: 600px){.tk-pagination-container{display:grid;gap:8px;grid-template-columns:1fr}.tk-pagination-container .tk-pagination-start{display:none}.tk-pagination-container .tk-pagination,.tk-pagination-container .tk-pagination-end{width:100%;justify-content:center}}';

const TkPagination = /*@__PURE__*/ proxyCustomElement(
  class TkPagination extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkNextPage = createEvent(this, 'tk-next-page', 7);
      this.tkPageChange = createEvent(this, 'tk-page-change', 7);
      this.tkPrevPage = createEvent(this, 'tk-prev-page', 7);
      this.tkRowsPerPageChange = createEvent(this, 'tk-rows-per-page-change', 7);
      this.ellipsis = '...';
      this.internalCurrentPage = 1;
      /**
       * Whether the pagination elements should have rounded corners
       * @defaultValue false
       */
      this.rounded = false;
      /**
       * Number of items per page.
       * @defaultValue 10
       */
      this.rowsPerPage = 10;
      /**
       * Number of total items.
       * @defaultValue 0
       */
      this.totalItems = 0;
      /**
       * Number of items per page options
       * @defaultValue [5, 10, 20, 50]
       */
      this.rowsPerPageOptions = [5, 10, 20, 50];
      /**
       * The type of the pagination
       * @defaultValue 'outlined'
       */
      this.type = 'outlined';
      /**
       * The current page of the pagination.
       * @defaultValue 1
       */
      this.currentPage = 1;
      this.handlePageClick = page => {
        if (page >= 1 && page <= this.getTotalPages()) {
          this.internalCurrentPage = page;
        }
      };
      this.handlePrevClick = () => {
        if (this.internalCurrentPage > 1) {
          this.internalCurrentPage--;
          this.tkPrevPage.emit({ page: this.internalCurrentPage });
        }
      };
      this.handleNextClick = () => {
        if (this.internalCurrentPage < this.getTotalPages()) {
          this.internalCurrentPage++;
          this.tkNextPage.emit({ page: this.internalCurrentPage });
        }
      };
    }
    internalCurrentPageChanged(newValue) {
      this.currentPage = newValue;
      this.updateInputValue(newValue);
      this.emitPageChangeEvents();
    }
    currentPageChanged(newValue) {
      this.internalCurrentPage = newValue;
      this.updateInputValue(newValue);
    }
    componentWillLoad() {
      this.internalCurrentPage = this.currentPage;
      this.updateInputValue(this.currentPage);
    }
    updateInputValue(value) {
      this.inputValue = value.toString();
    }
    getTotalPages() {
      return Math.ceil(this.totalItems / this.rowsPerPage);
    }
    getPageNumbers() {
      const totalPages = this.getTotalPages();
      const currentPage = this.internalCurrentPage;
      const pageNumbers = [];
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else if (totalPages <= 7) {
        this.generatePageNumbersForMediumRange(pageNumbers, currentPage, totalPages);
      } else {
        this.generatePageNumbersForLargeRange(pageNumbers, currentPage, totalPages);
      }
      return pageNumbers;
    }
    generatePageNumbersForMediumRange(pageNumbers, currentPage, totalPages) {
      pageNumbers.push(1);
      if (currentPage <= 3) {
        for (let i = 2; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(this.ellipsis);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(this.ellipsis);
        for (let i = totalPages - 4; i < totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(this.ellipsis);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(this.ellipsis);
      }
      pageNumbers.push(totalPages);
    }
    generatePageNumbersForLargeRange(pageNumbers, currentPage, totalPages) {
      pageNumbers.push(1);
      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(this.ellipsis, totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(this.ellipsis);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(this.ellipsis);
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(this.ellipsis, totalPages);
      }
    }
    validateAndUpdatePage() {
      const pageNumber = parseInt(this.inputValue, 10);
      const totalPages = this.getTotalPages();
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
        this.handlePageClick(pageNumber);
      } else {
        this.updateInputValue(this.internalCurrentPage);
      }
    }
    emitPageChangeEvents() {
      const totalPages = this.getTotalPages();
      const startItem = (this.internalCurrentPage - 1) * this.rowsPerPage + 1;
      const endItem = Math.min(this.internalCurrentPage * this.rowsPerPage, this.totalItems);
      this.tkPageChange.emit({
        page: this.internalCurrentPage,
        totalPages,
        startItem,
        endItem,
      });
    }
    handlePageInputChange(value) {
      this.inputValue = value.replace(/[^0-9]/g, '');
    }
    createPageNumbers() {
      return this.getPageNumbers().map(pageNumber => {
        if (pageNumber === this.ellipsis) {
          return h('span', { class: 'tk-pagination-ellipsis tk-pagination-cell' }, '...');
        }
        return h(
          'button',
          {
            class: classNames('tk-pagination-cell tk-pagination-page', { 'tk-pagination-page-active': pageNumber === this.internalCurrentPage }),
            type: 'button',
            onClick: () => this.handlePageClick(pageNumber),
          },
          h('span', { class: 'tk-pagination-page-label' }, pageNumber),
        );
      });
    }
    renderTag(totalPages) {
      if (this.mode !== 'compact') {
        const startItem = (this.internalCurrentPage - 1) * this.rowsPerPage + 1;
        const endItem = Math.min(this.internalCurrentPage * this.rowsPerPage, this.totalItems);
        let tagContent;
        if (this.mode === 'compact-expanded') {
          tagContent = h('span', { class: 'tk-pagination-tag-label' }, startItem, '-', endItem, ' of ', this.totalItems);
        } else {
          tagContent =
            totalPages > 0 &&
            h(
              Fragment,
              null,
              h('span', { class: 'tk-pagination-tag-label' }, 'page: ', this.internalCurrentPage, ' of ', totalPages),
              h('span', { class: 'tk-pagination-tag-label' }, 'item: ', startItem, '-', endItem, ' of ', this.totalItems),
            );
        }
        return h('div', { class: 'tk-pagination-tag' }, tagContent);
      }
      return null;
    }
    renderContent(totalPages) {
      const ContentWrapperTag = this.mode === 'compact' || this.mode === 'compact-expanded' ? 'div' : 'nav';
      const contentClasses = classNames('tk-pagination', `tk-pagination-${this.mode || this.type}`, {
        'tk-pagination-rounded': this.rounded,
      });
      let content;
      if (this.mode === 'compact') {
        content = h(
          Fragment,
          null,
          h(
            'button',
            { class: 'tk-pagination-cell tk-pagination-prev', type: 'button', onClick: this.handlePrevClick, disabled: this.internalCurrentPage === 1 },
            h('tk-icon', Object.assign({}, getIconElementProps('chevron_left', { class: 'tk-pagination-cell-icon', variant: null }))),
          ),
          h('tk-input', {
            'mode': 'text',
            'value': this.inputValue,
            'onTk-change': event => this.handlePageInputChange(event.detail.toString()),
            'onTk-blur': () => this.validateAndUpdatePage(),
            'min': 1,
            'max': totalPages,
          }),
          h('span', { class: 'tk-pagination-current-label' }, '/ ', totalPages, ' pages'),
          h(
            'button',
            { class: 'tk-pagination-cell tk-pagination-next', type: 'button', onClick: this.handleNextClick, disabled: this.internalCurrentPage === totalPages },
            h('tk-icon', Object.assign({}, getIconElementProps('chevron_right', { class: 'tk-pagination-cell-icon', variant: null }))),
          ),
        );
      }
      // else if(this.type === 'compact-expanded') {
      //   @TODO: Add pagination content for compact-expanded after the tk-dropdown component is completed
      //   content =
      // }
      else {
        content = h(
          Fragment,
          null,
          h(
            'div',
            { class: 'tk-pagination-prev-actions' },
            h(
              'button',
              { class: 'tk-pagination-cell tk-pagination-first', type: 'button', onClick: () => this.handlePageClick(1), disabled: this.internalCurrentPage === 1 },
              h('tk-icon', Object.assign({}, getIconElementProps('keyboard_double_arrow_left', { class: 'tk-pagination-cell-icon', variant: null }))),
            ),
            this.type === 'grouped' && h('span', { class: 'tk-pagination-divider' }),
            h(
              'button',
              { class: 'tk-pagination-cell tk-pagination-prev', type: 'button', onClick: this.handlePrevClick, disabled: this.internalCurrentPage === 1 },
              h('tk-icon', Object.assign({}, getIconElementProps('chevron_left', { class: 'tk-pagination-cell-icon', variant: null }))),
              ' ',
            ),
          ),
          this.createPageNumbers(),
          h(
            'div',
            { class: 'tk-pagination-next-actions' },
            h(
              'button',
              { class: 'tk-pagination-cell tk-pagination-next', type: 'button', onClick: this.handleNextClick, disabled: this.internalCurrentPage === totalPages },
              h('tk-icon', Object.assign({}, getIconElementProps('chevron_right', { class: 'tk-pagination-cell-icon', variant: null }))),
            ),
            this.type === 'grouped' && h('span', { class: 'tk-pagination-divider' }),
            h(
              'button',
              {
                class: 'tk-pagination-cell tk-pagination-last',
                type: 'button',
                onClick: () => this.handlePageClick(totalPages),
                disabled: this.internalCurrentPage === totalPages,
              },
              h('tk-icon', Object.assign({}, getIconElementProps('keyboard_double_arrow_right', { class: 'tk-pagination-cell-icon', variant: null }))),
            ),
          ),
        );
      }
      return h(ContentWrapperTag, { class: contentClasses }, content);
    }
    renderSelect() {
      return h('tk-select', {
        'style': { width: '75px' },
        'value': this.rowsPerPage,
        'options': this.rowsPerPageOptions,
        'onTk-change': e => {
          if (e.detail !== this.rowsPerPage) {
            this.rowsPerPage = e.detail;
            this.tkRowsPerPageChange.emit(e.detail);
          }
        },
      });
    }
    renderInput(totalPages) {
      return h('tk-input', {
        'style': { width: '70px' },
        'mode': 'text',
        'min': 1,
        'max': totalPages,
        'value': this.inputValue,
        'icon': 'chevron_right',
        'iconPosition': 'right',
        'onTk-change': event => {
          this.handlePageInputChange(event.detail.toString());
        },
        'onTk-blur': () => this.validateAndUpdatePage(),
      });
    }
    render() {
      const totalPages = this.getTotalPages();
      return h(
        'div',
        { key: 'a37a43bd56c68991cbb63a4606ce32834fe0db1d', class: 'tk-pagination-container' },
        h('div', { key: '52605e8d307db01633f5425671fe3b3ead947cb4', class: 'tk-pagination-start' }, this.renderTag(totalPages)),
        this.renderContent(totalPages),
        h('div', { key: '0e71964c8ac37992f2b3c13329f3a45128e08864', class: 'tk-pagination-end' }, this.renderSelect(), this.renderInput(totalPages)),
      );
    }
    static get watchers() {
      return {
        internalCurrentPage: ['internalCurrentPageChanged'],
        currentPage: ['currentPageChanged'],
      };
    }
    static get style() {
      return tkPaginationCss;
    }
  },
  [
    0,
    'tk-pagination',
    {
      rounded: [4],
      rowsPerPage: [1026, 'rows-per-page'],
      totalItems: [2, 'total-items'],
      rowsPerPageOptions: [16, 'rows-per-page-options'],
      type: [1],
      mode: [1],
      currentPage: [2, 'current-page'],
      inputValue: [32],
      internalCurrentPage: [32],
    },
    undefined,
    {
      internalCurrentPage: ['internalCurrentPageChanged'],
      currentPage: ['currentPageChanged'],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-pagination', 'tk-button', 'tk-checkbox', 'tk-chips', 'tk-icon', 'tk-input', 'tk-select', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-pagination':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkPagination);
        }
        break;
      case 'tk-button':
        if (!customElements.get(tagName)) {
          defineCustomElement$7();
        }
        break;
      case 'tk-checkbox':
        if (!customElements.get(tagName)) {
          defineCustomElement$6();
        }
        break;
      case 'tk-chips':
        if (!customElements.get(tagName)) {
          defineCustomElement$5();
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$4();
        }
        break;
      case 'tk-input':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
        }
        break;
      case 'tk-select':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          defineCustomElement$1();
        }
        break;
    }
  });
}

export { TkPagination as T, defineCustomElement as d };
//# sourceMappingURL=p-Dn-_FO5-.js.map

//# sourceMappingURL=p-Dn-_FO5-.js.map
