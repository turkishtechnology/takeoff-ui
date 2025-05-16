import { Component, ComponentInterface, Event, EventEmitter, Fragment, Prop, State, Watch, h } from '@stencil/core';
import classNames from 'classnames';
import { getIconElementProps } from '../../utils/icon-props';

/**
 * TkPagination component description.
 * @react `import { TkPagination } from '@takeoff-ui/react'`
 * @vue `import { TkPagination } from '@takeoff-ui/vue'`
 * @angular `import { TkPagination } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-pagination',
  styleUrl: 'tk-pagination.scss',
})
export class TkPagination implements ComponentInterface {
  private ellipsis = '...';

  @State() inputValue: string;
  @State() internalCurrentPage: number = 1;
  @Watch('internalCurrentPage')
  internalCurrentPageChanged(newValue: number) {
    this.currentPage = newValue;
    this.updateInputValue(newValue);
    this.emitPageChangeEvents();
  }

  /**
   * Whether the pagination elements should have rounded corners
   * @defaultValue false
   */
  @Prop() rounded: boolean = false;

  /**
   * Number of items per page.
   * @defaultValue 10
   */
  @Prop({ mutable: true }) rowsPerPage: number = 10;

  /**
   * Number of total items.
   * @defaultValue 0
   */
  @Prop() totalItems: number = 0;

  /**
   * Number of items per page options
   * @defaultValue [5, 10, 20, 50]
   */
  @Prop() rowsPerPageOptions: number[] = [5, 10, 20, 50];

  /**
   * The type of the pagination
   * @defaultValue 'outlined'
   */
  @Prop() type: 'outlined' | 'text' | 'grouped' = 'outlined';

  /**
   * The mode of the pagination
   * @defaultValue 'outlined'
   */
  @Prop() mode: 'compact' | 'compact-expanded';

  /**
   * The current page of the pagination.
   * @defaultValue 1
   */
  @Prop() currentPage: number = 1;
  @Watch('currentPage')
  currentPageChanged(newValue: number) {
    this.internalCurrentPage = newValue;
    this.updateInputValue(newValue);
  }

  /**
   * Pagination next button click event
   */
  @Event({ eventName: 'tk-next-page' }) tkNextPage: EventEmitter<{ page: number }>;

  /**
   * Pagination page change event
   */
  @Event({ eventName: 'tk-page-change' }) tkPageChange: EventEmitter<{ page: number; totalPages: number; startItem: number; endItem: number }>;

  /**
   * Pagination prev button click event
   */
  @Event({ eventName: 'tk-prev-page' }) tkPrevPage: EventEmitter<{ page: number }>;

  /**
   * RowsPerPage change event
   */
  @Event({ eventName: 'tk-rows-per-page-change' }) tkRowsPerPageChange: EventEmitter<number>;

  componentWillLoad() {
    this.internalCurrentPage = this.currentPage;
    this.updateInputValue(this.currentPage);
  }

  private updateInputValue(value: number) {
    this.inputValue = value.toString();
  }

  private getTotalPages(): number {
    return Math.ceil(this.totalItems / this.rowsPerPage);
  }

  private getPageNumbers(): (number | string)[] {
    const totalPages = this.getTotalPages();
    const currentPage = this.internalCurrentPage;
    const pageNumbers: (number | string)[] = [];

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

  private generatePageNumbersForMediumRange(pageNumbers: (number | string)[], currentPage: number, totalPages: number) {
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

  private generatePageNumbersForLargeRange(pageNumbers: (number | string)[], currentPage: number, totalPages: number) {
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

  private validateAndUpdatePage() {
    const pageNumber = parseInt(this.inputValue, 10);
    const totalPages = this.getTotalPages();
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      this.handlePageClick(pageNumber);
    } else {
      this.updateInputValue(this.internalCurrentPage);
    }
  }

  private emitPageChangeEvents() {
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

  private handlePageClick = (page: number) => {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.internalCurrentPage = page;
    }
  };

  private handlePrevClick = () => {
    if (this.internalCurrentPage > 1) {
      this.internalCurrentPage--;
      this.tkPrevPage.emit({ page: this.internalCurrentPage });
    }
  };

  private handleNextClick = () => {
    if (this.internalCurrentPage < this.getTotalPages()) {
      this.internalCurrentPage++;
      this.tkNextPage.emit({ page: this.internalCurrentPage });
    }
  };

  private handlePageInputChange(value: string) {
    this.inputValue = value.replace(/[^0-9]/g, '');
  }

  private createPageNumbers() {
    return this.getPageNumbers().map(pageNumber => {
      if (pageNumber === this.ellipsis) {
        return <span class="tk-pagination-ellipsis">...</span>;
      }

      return (
        <button
          class={classNames('tk-pagination-cell tk-pagination-page', { 'tk-pagination-page-active': pageNumber === this.internalCurrentPage })}
          type="button"
          onClick={() => this.handlePageClick(pageNumber as number)}
        >
          <span class="tk-pagination-page-label">{pageNumber}</span>
        </button>
      );
    });
  }

  private renderTag(totalPages: number) {
    if (this.mode !== 'compact') {
      const startItem = (this.internalCurrentPage - 1) * this.rowsPerPage + 1;
      const endItem = Math.min(this.internalCurrentPage * this.rowsPerPage, this.totalItems);
      let tagContent: HTMLElement;

      if (this.mode === 'compact-expanded') {
        tagContent = (
          <span class="tk-pagination-tag-label">
            {startItem}-{endItem} of {this.totalItems}
          </span>
        );
      } else {
        tagContent = totalPages > 0 && (
          <Fragment>
            <span class="tk-pagination-tag-label">
              page: {this.internalCurrentPage} of {totalPages}
            </span>
            <span class="tk-pagination-tag-label">
              item: {startItem}-{endItem} of {this.totalItems}
            </span>
          </Fragment>
        );
      }

      return <div class="tk-pagination-tag">{tagContent}</div>;
    }

    return null;
  }

  private renderContent(totalPages: number) {
    const ContentWrapperTag = this.mode === 'compact' || this.mode === 'compact-expanded' ? 'div' : 'nav';
    const contentClasses = classNames('tk-pagination', `tk-pagination-${this.mode || this.type}`, {
      'tk-pagination-rounded': this.rounded,
    });
    let content: HTMLElement;

    if (this.mode === 'compact') {
      content = (
        <Fragment>
          <button class="tk-pagination-cell tk-pagination-prev" type="button" onClick={this.handlePrevClick} disabled={this.internalCurrentPage === 1}>
            <tk-icon {...getIconElementProps('chevron_left', { class: 'tk-pagination-cell-icon', variant: null })} />
          </button>
          <tk-input
            mode="text"
            value={this.inputValue}
            onTk-change={(event: CustomEvent) => this.handlePageInputChange(event.detail.toString())}
            onTk-blur={() => this.validateAndUpdatePage()}
            min={1}
            max={totalPages}
          />
          <span class="tk-pagination-current-label">/ {totalPages} pages</span>
          <button class="tk-pagination-cell tk-pagination-next" type="button" onClick={this.handleNextClick} disabled={this.internalCurrentPage === totalPages}>
            <tk-icon {...getIconElementProps('chevron_right', { class: 'tk-pagination-cell-icon', variant: null })} />
          </button>
        </Fragment>
      );
    }
    // else if(this.type === 'compact-expanded') {
    //   @TODO: Add pagination content for compact-expanded after the tk-dropdown component is completed
    //   content =
    // }
    else {
      content = (
        <Fragment>
          <div class="tk-pagination-prev-actions">
            <button class="tk-pagination-cell tk-pagination-first" type="button" onClick={() => this.handlePageClick(1)} disabled={this.internalCurrentPage === 1}>
              <tk-icon {...getIconElementProps('keyboard_double_arrow_left', { class: 'tk-pagination-cell-icon', variant: null })} />
            </button>
            {this.type === 'grouped' && <span class="tk-pagination-divider"></span>}
            <button class="tk-pagination-cell tk-pagination-prev" type="button" onClick={this.handlePrevClick} disabled={this.internalCurrentPage === 1}>
              <tk-icon {...getIconElementProps('chevron_left', { class: 'tk-pagination-cell-icon', variant: null })} />{' '}
            </button>
          </div>
          {this.createPageNumbers()}
          <div class="tk-pagination-next-actions">
            <button class="tk-pagination-cell tk-pagination-next" type="button" onClick={this.handleNextClick} disabled={this.internalCurrentPage === totalPages}>
              <tk-icon {...getIconElementProps('chevron_right', { class: 'tk-pagination-cell-icon', variant: null })} />
            </button>
            {this.type === 'grouped' && <span class="tk-pagination-divider"></span>}
            <button class="tk-pagination-cell tk-pagination-last" type="button" onClick={() => this.handlePageClick(totalPages)} disabled={this.internalCurrentPage === totalPages}>
              <tk-icon {...getIconElementProps('keyboard_double_arrow_right', { class: 'tk-pagination-cell-icon', variant: null })} />
            </button>
          </div>
        </Fragment>
      );
    }

    return <ContentWrapperTag class={contentClasses}>{content}</ContentWrapperTag>;
  }

  private renderSelect(): HTMLTkSelectElement {
    return (
      <tk-select
        style={{ width: '75px' }}
        value={this.rowsPerPage}
        options={this.rowsPerPageOptions}
        onTk-change={e => {
          if (e.detail !== this.rowsPerPage) {
            this.rowsPerPage = e.detail;
            this.tkRowsPerPageChange.emit(e.detail);
          }
        }}
      ></tk-select>
    );
  }

  private renderInput(totalPages: number): HTMLTkInputElement {
    return (
      <tk-input
        style={{ width: '70px' }}
        mode="text"
        min={1}
        max={totalPages}
        value={this.inputValue}
        icon="chevron_right"
        iconPosition="right"
        onTk-change={(event: CustomEvent) => {
          this.handlePageInputChange(event.detail.toString());
        }}
        onTk-blur={() => this.validateAndUpdatePage()}
      />
    );
  }

  render() {
    const totalPages = this.getTotalPages();

    return (
      <div class="tk-pagination-container">
        <div class="tk-pagination-start">{this.renderTag(totalPages)}</div>
        {this.renderContent(totalPages)}
        <div class="tk-pagination-end">
          {this.renderSelect()}
          {this.renderInput(totalPages)}
        </div>
      </div>
    );
  }
}
