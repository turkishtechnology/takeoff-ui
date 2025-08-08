import { Component, h, Prop, Element, Event, ComponentInterface, EventEmitter, State, Fragment, Watch } from '@stencil/core';
import classNames from 'classnames';
import mime from 'mime';
import { filesize } from 'filesize';
import { getIconElementProps } from '../../utils/icon-utils';

/**
 * The TkUpload component is an interface element that allows users to select and upload files from their devices to a server or a target location. It typically includes a "Choose File" button and a field displaying the selected file's name. This component simplifies the process of file selection and uploading.
 * @react `import { TkUpload } from '@takeoff-ui/react'`
 * @vue `import { TkUpload } from '@takeoff-ui/vue'`
 * @angular `import { TkUpload } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-upload',
  styleUrl: 'tk-upload.scss',
})
export class TkUpload implements ComponentInterface {
  private inputRef: HTMLInputElement;

  @Element() el: HTMLTkUploadElement;

  @State() errorMessages: string[] = [];
  @State() isDragOver: boolean = false;

  /**
   * If `autoUpload` is set to `true`, the upload button will be hidden,
   * and the `tkUpload` event will be automatically triggered for each newly added file.
   */
  @Prop() autoUpload: boolean = false;

  /**
   * Enables drag and drop functionality for file uploads.
   * @defaultValue true
   */
  @Prop() dragDrop: boolean = true;

  /**
   * Defines the label of the upload area
   */
  @Prop() label?: string;

  /**
   * Provided a hint or additional information about the input.
   */
  @Prop() hint?: string;

  /**
   * Provided a error about the upload.
   */
  @Prop() error?: string;

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * Displays the uploaded files.
   * @defaultValue true
   */
  @Prop() showFiles: boolean = true;

  /**
   * Label text displayed inside the choose button.
   */
  @Prop() chooseButtonLabel: string = 'Choose File';

  /**
   * Label text displayed inside the upload button.
   */
  @Prop() uploadButtonLabel: string = 'Upload';

  /**
   * Acceptable file types for upload. Use MIME types or extensions separated by commas.
   */
  @Prop() accept: string = '*';

  /**
   * Disables the input, preventing user interaction.
   */
  @Prop() disabled: boolean = false;

  /**
   * Allows multiple file selection.
   */
  @Prop() multiple: boolean = false;

  /**
   * Maximum allowed file count
   */
  @Prop() maxFileCount?: number;

  /**
   * Maximum allowed file size in bytes.
   */
  @Prop() maxFileSize: number;

  /**
   * Title displayed in the upload component.
   */
  @Prop() title: string = 'Choose a file or drag & drop it here.';

  /**
   * Title displayed in the upload component when drag and drop is active.
   */
  @Prop() dragDropTitle: string = 'Drop files here';

  /**
   * The file value of the upload.
   */
  @Prop({ mutable: true }) value: File[] = [];
  @Watch('value')
  valueChanged(newValue: File[]) {
    if (!newValue || newValue?.length <= 0) this.inputRef.value = null;
  }

  /**
   * Description displayed under the title.
   */
  @Prop() description: string = 'JPEG, PNG, PDF and MP4 formats, up to 50 MB.';

  /**
   * Description displayed under the title when drag and drop is active.
   */
  @Prop() dragDropDescription: string = 'Release to upload files';

  /**
   * Indicates whether the upload is in an invalid state, uploads will fail eventually
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * Indicates whether the upload is in an loading state
   * @defaultValue false
   */
  @Prop() loading: boolean = false;

  /**
   * Type of the file upload area.
   */
  @Prop() type: 'default' | 'centered' = 'default';

  /**
   * Indicates whether the files can be downloaded. When true, a download button will be displayed next to each file.
   */
  @Prop() downloadable: boolean = false;

  /**
   * Emitted when one or more files pass validation.
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<File[]>;

  /**
   * Emitted when one or more files fail validation, with reasons.
   */
  @Event({ eventName: 'tk-files-rejected' }) tkFilesRejected: EventEmitter<{ reason: string; file: File | FileList }[]>;

  /**
   * Emitted when the user initiates file upload.
   */
  @Event({ eventName: 'tk-upload' }) tkUpload: EventEmitter<File[]>;

  /**
   * Emitted when a file is removed from the accepted list.
   */
  @Event({ eventName: 'tk-removed-file' }) tkRemovedFile: EventEmitter<File>;

  /**
   * Emitted when a file is download button is clicked.
   */
  @Event({ eventName: 'tk-download-file' }) tkDownloadFile: EventEmitter<File>;

  private isImageFile(file: File): boolean {
    const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return IMAGE_TYPES.includes(file.type);
  }

  private handleDragEnter = (e: DragEvent) => {
    if (!this.dragDrop || this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = true;
  };

  private handleDragLeave = (e: DragEvent) => {
    if (!this.dragDrop || this.disabled) return;
    e.preventDefault();
    e.stopPropagation();

    // Only set isDragOver to false if we're leaving the dropzone entirely
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      this.isDragOver = false;
    }
  };

  private handleDragOver = (e: DragEvent) => {
    if (!this.dragDrop || this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = true;
  };

  private handleDrop = (e: DragEvent) => {
    if (!this.dragDrop || this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleProcessFiles(files);
    }
  };

  private handleProcessFiles(files: FileList) {
    const rejectedFiles: { reason: string; file: File | FileList }[] = [];
    const isFileCountRejected = this.maxFileCount && this.value.length + files.length > this.maxFileCount;

    // Validate file count
    if (isFileCountRejected) {
      rejectedFiles.push({
        reason: `Max file count exceeded, max ${this.maxFileCount} files allowed.`,
        file: files,
      });
    } else {
      Array.from(files).forEach(file => {
        // Validate file size
        if (file.size > this.maxFileSize) {
          rejectedFiles.push({
            reason: `File size exceeds the maximum allowed size of ${this.maxFileSize / (1024 * 1024)} MB.`,
            file,
          });
          return;
        }

        // Validate file type
        if (this.accept !== '*' && !this.accept.includes(file.type)) {
          rejectedFiles.push({
            reason: `Invalid file type. Accepted types are: ${this.accept}.`,
            file,
          });
          return;
        }

        // If valid, add to accepted files
        if (this.multiple) this.value.push(file);
        else this.value = [file];
      });
    }

    // Update state and emit events
    this.errorMessages = rejectedFiles.map(item => (item.file instanceof File ? `${item.file.name}: ${item.reason}` : item.reason));
    if (!isFileCountRejected && this.value.length > 0) {
      this.tkChange.emit(this.value);
      if (this.autoUpload) this.handleUploadButtonClick();
    }
    if (rejectedFiles.length > 0) {
      this.tkFilesRejected.emit(rejectedFiles);
    }
  }

  private handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      this.handleProcessFiles(files);
    }
  }

  private handleDownloadButtonClick(file: File) {
    this.tkDownloadFile.emit(file);
  }

  private handleRemoveButtonClick(file: File) {
    const removeIndex = this.value.findIndex(item => file.lastModified == item.lastModified && file.name == item.name);
    const removedFile = this.value.splice(removeIndex, 1);
    this.value = [...this.value];
    this.inputRef.value = null;
    this.tkChange.emit(this.value);
    this.tkRemovedFile.emit(removedFile[0]);
  }

  private handleUploadButtonClick() {
    this.tkUpload.emit(this.value);
  }

  private renderFilePreview(file: File) {
    if (this.isImageFile(file)) {
      return <img src={URL.createObjectURL(file)} width={50} height={50}></img>;
    } else {
      let ext = mime.getExtension(file.type);
      if (!ext) {
        const tmpArr = file.name.split('.');
        ext = tmpArr[tmpArr.length - 1];
      }
      return (
        <Fragment>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 1V7.66667C23 8.40333 23.5967 9 24.3333 9H31" stroke="#CACFD8" stroke-width="1.5" />
            <path
              d="M21.5147 0.75C22.9071 0.75 24.2425 1.30312 25.227 2.28769L29.7123 6.77297C30.6969 7.75754 31.25 9.09289 31.25 10.4853V26C31.25 28.8995 28.8995 31.25 26 31.25H12C9.1005 31.25 6.75 28.8995 6.75 26V6C6.75 3.10051 9.10051 0.75 12 0.75H21.5147Z"
              stroke="#CACFD8"
              stroke-width="1.5"
            />
          </svg>
          <div class={classNames('extension-text', ext)}>{ext?.toUpperCase()}</div>
        </Fragment>
      );
    }
  }

  private renderState() {
    let iconName = 'check_circle';
    let state = 'added';

    if (this.loading) {
      state = 'loading';
      iconName = 'progress_activity';
    } else if (this.invalid) {
      state = 'failed';
      iconName = 'dangerous';
    }

    return (
      <label class={classNames('tk-upload-state', state)}>
        {state == 'loading' ? <tk-spinner type="three-dots" size="xsmall"></tk-spinner> : <tk-icon {...getIconElementProps(iconName, { class: 'fill' }, undefined, 'span')} />}

        {state}
      </label>
    );
  }

  private renderDropzone(): HTMLDivElement {
    const dropzoneClasses = classNames('tk-upload-dropzone', this.type, {
      'drag-over': this.isDragOver,
      'disabled': this.disabled,
    });

    const dropzoneProps =
      this.dragDrop && !this.disabled
        ? {
            onDragEnter: this.handleDragEnter,
            onDragLeave: this.handleDragLeave,
            onDragOver: this.handleDragOver,
            onDrop: this.handleDrop,
          }
        : {};

    return (
      <div class={dropzoneClasses} {...dropzoneProps}>
        <div class="tk-upload-icon">
          <tk-icon {...getIconElementProps('file_upload', { class: 'icon', size: 'xlarge' }, undefined, 'span')} />
        </div>
        <div class="tk-upload-content">
          <div class="tk-upload-text-holder">
            <div class="tk-upload-title">{this.isDragOver ? this.dragDropTitle : this.title}</div>
            <div class="tk-upload-description">{this.isDragOver ? this.dragDropDescription : this.description}</div>
          </div>
          <div class="tk-upload-input">
            <tk-button label={this.chooseButtonLabel} variant="neutral" type="outlined" icon="folder" disabled={this.disabled} onTk-click={() => this.inputRef.click()}></tk-button>
            {!this.autoUpload && (
              <tk-button
                label={this.uploadButtonLabel}
                variant="neutral"
                type="outlined"
                icon="file_upload"
                loading={this.loading}
                disabled={!(this.value?.length > 0) || this.loading}
                onTk-click={this.handleUploadButtonClick.bind(this)}
              ></tk-button>
            )}
            <input
              ref={el => (this.inputRef = el)}
              type="file"
              accept={this.accept}
              multiple={this.multiple ? true : undefined}
              onChange={e => this.handleInputChange(e)}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
    );
  }

  private renderFileholder(): HTMLDivElement {
    return (
      <div class="tk-upload-file-holder">
        {this.value?.map((item, index) => (
          <div class="tk-upload-file-item" key={index}>
            <div class="tk-upload-file-preview">{this.renderFilePreview(item)}</div>
            <div class="tk-upload-file-content">
              <div>
                <div class="tk-upload-file-name">{item.name}</div>
                <div class="tk-upload-file-size-state">
                  <span class="tk-upload-size">{filesize(item.size, { standard: 'jedec' })}</span>
                  {this.renderState()}
                </div>
              </div>
              <div class="tk-upload-file-buttons">
                {this.downloadable && (
                  <tk-button variant="neutral" type="outlined" icon="file_download" size="small" onTk-click={() => this.handleDownloadButtonClick(item)}></tk-button>
                )}
                <tk-button variant="neutral" type="outlined" icon="close" size="small" onTk-click={() => this.handleRemoveButtonClick(item)}></tk-button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    let label: HTMLLabelElement;
    let hint: HTMLSpanElement;

    const rootClasses = classNames('tk-upload-container', {
      'drag-drop-enabled': this.dragDrop,
    });

    if (this.label?.length > 0) {
      const asterisk = <span class="asterisk">*</span>;
      label = (
        <label class="label">
          {this.label}
          {this.showAsterisk ? asterisk : ''}
        </label>
      );
    }

    if (this.hint?.length > 0) {
      hint = (
        <span class="hint">
          <i class="material-symbols-outlined">info</i>
          {this.hint}
        </span>
      );
    }

    if (this.error?.length > 0) {
      hint = (
        <span class="hint">
          <i class="material-symbols-outlined">info</i>
          {this.error}
        </span>
      );
    }

    return (
      <div class={rootClasses} aria-disabled={this.disabled} aria-invalid={this.invalid}>
        {label}
        {this.renderDropzone()}
        {hint}
        {this.showFiles && this.renderFileholder()}
      </div>
    );
  }
}
