import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$7 } from './p-D_-4qiry.js';
import { d as defineCustomElement$6 } from './p-B2GrZHBf.js';
import { d as defineCustomElement$5 } from './p-r58Qbyxv.js';
import { d as defineCustomElement$4 } from './p-DrRHtkyE.js';
import { d as defineCustomElement$3 } from './p-BIahD9g3.js';
import { d as defineCustomElement$2 } from './p-LwUOLAdV.js';
import { d as defineCustomElement$1 } from './p-Dz92n4WS.js';

const tkPaginationScss =
  'tk-pagination {\n  display: block;\n}\n\n.tk-pagination-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n\n  .tk-pagination-start {\n    margin-right: auto;\n  }\n\n  .tk-pagination-end {\n    margin-left: auto;\n    display: flex;\n    gap: var(--pagination-base-right-gap, 12px);\n  }\n\n  .tk-pagination-tag {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: flex-start;\n    gap: var(--pagination-base-tag-gap, 0px);\n\n    .tk-pagination-tag-label {\n      color: var(--text-base, #717784);\n      /* Body/X-Small-12 */\n      font-family: var(--desktop-body-xs-font, Geologica);\n      font-size: var(--desktop-body-xs-size, 12px);\n      font-style: normal;\n      font-weight: 400;\n      line-height: var(--desktop-body-xs-line-height, 18px);\n      /* 150% */\n    }\n  }\n\n  .tk-pagination {\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: var(--pagination-base-gap, 6px);\n\n    .tk-pagination-prev-actions,\n    .tk-pagination-next-actions {\n      display: flex;\n      align-items: center;\n      gap: var(--pagination-base-arrow-gap, 4px);\n    }\n\n    .tk-pagination-cell {\n      display: flex;\n      min-width: 32px;\n      height: 32px;\n      // The numbers in the design do not match exactly; 8px and 12px actually correspond to 6px and 11px\n      padding: 6px 11px;\n      justify-content: center;\n      align-items: center;\n      border-radius: 8px;\n      background: none;\n      border: none;\n      cursor: pointer;\n      color: var(--text-darkest, #222530);\n      /* Body/Small-14 */\n      font-family: var(--desktop-body-s-font);\n      font-size: var(--desktop-body-s-size, 14px);\n      font-style: normal;\n      font-weight: 400;\n      line-height: var(--desktop-body-s-line-height, 20px); /* 142.857% */\n      .tk-pagination-page-label {\n        color: var(--text-darkest);\n      }\n\n      .tk-pagination-cell-icon i {\n        font-size: 20px;\n        width: 20px;\n        height: 20px;\n        color: var(--icon-base);\n      }\n\n      &:hover:not(:disabled):not(.tk-pagination-ellipsis) {\n        background: var(--background-lightest, #f9fafc);\n      }\n\n      &:focus-visible {\n        border: var(--spacing-px, 1px) solid var(--states-info-base, #3b82f6);\n      }\n\n      &:disabled {\n        .tk-pagination-page-label,\n        .tk-pagination-cell-icon i {\n          color: var(--text-sub-base, #99a0ae);\n        }\n      }\n    }\n\n    &.tk-pagination-rounded {\n      &:not(.tk-pagination-compact-expanded) {\n        .tk-pagination-page {\n          border-radius: var(--radius-full);\n        }\n      }\n    }\n\n    &.tk-pagination-outlined {\n      .tk-pagination-page {\n        border: var(--spacing-px, 1px) solid var(--border-light, #e1e4ea);\n      }\n    }\n\n    &.tk-pagination-grouped {\n      display: inline-flex;\n      align-items: center;\n      padding: var(--pagination-base-container-v-padding, 2px) 0px;\n      border-radius: 8px;\n      border: var(--spacing-px, 1px) solid var(--border-light, #e1e4ea);\n      background: var(--static-light, #fff);\n      overflow: hidden;\n\n      .tk-pagination-divider {\n        width: 1px;\n        height: 16px;\n        background-color: var(--border-light, #e1e4ea);\n      }\n    }\n\n    &.tk-pagination-compact {\n      .tk-pagination-cell {\n        width: 36px;\n        height: 36px;\n      }\n\n      .tk-pagination-current-label {\n        color: var(--text-base, #717784);\n\n        /* Body/Small-14 */\n        font-family: var(--desktop-body-s-font, Geologica);\n        font-size: var(--desktop-body-s-size, 14px);\n        font-style: normal;\n        font-weight: 400;\n        line-height: var(--desktop-body-s-line-height, 20px);\n        /* 142.857% */\n      }\n\n      .tk-pagination-first,\n      .tk-pagination-prev,\n      .tk-pagination-next,\n      .tk-pagination-last {\n        border: var(--spacing-px, 1px) solid var(--border-light, #e1e4ea);\n      }\n\n      &.tk-pagination-rounded {\n        .tk-pagination-first,\n        .tk-pagination-prev,\n        .tk-pagination-next,\n        .tk-pagination-last {\n          border-radius: var(--radius-full);\n        }\n      }\n\n      tk-input {\n        width: 48px;\n        height: 40px;\n      }\n    }\n\n    .tk-pagination-page {\n      &.tk-pagination-page-active {\n        border: var(--spacing-px, 1px) solid var(--states-info-sub-base);\n        background: var(--background-lightest, #f9fafc);\n      }\n    }\n\n    .tk-pagination-last,\n    .tk-pagination-prev,\n    .tk-pagination-page,\n    .tk-pagination-next,\n    .tk-pagination-first {\n      &:focus-visible {\n        border: var(--spacing-px, 1px) solid var(--states-info-base, #3b82f6);\n        outline: none;\n      }\n    }\n  }\n}\n\n@media (max-width: 600px) {\n  .tk-pagination-container {\n    display: grid;\n    gap: 8px;\n    grid-template-columns: 1fr;\n\n    .tk-pagination-start {\n      display: none;\n    }\n\n    .tk-pagination,\n    .tk-pagination-end {\n      width: 100%;\n      justify-content: center;\n    }\n  }\n}\n';

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
      return tkPaginationScss;
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
//# sourceMappingURL=p-oIgJrQ5d.js.map

//# sourceMappingURL=p-oIgJrQ5d.js.map
