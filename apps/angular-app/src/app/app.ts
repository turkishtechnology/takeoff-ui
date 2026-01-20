import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TkButton,
  TkInput,
  TkSelect,
  TkCheckbox,
  TkToggle,
  TkAlert,
  TkBadge,
  TkCard,
  TkAccordion,
  TkAccordionItem,
  TkTabs,
  TkTabsItem,
  TkSpinner,
  TkDialog,
} from '@takeoff-ui/angular';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TkButton,
    TkInput,
    TkSelect,
    TkCheckbox,
    TkToggle,
    TkAlert,
    TkBadge,
    TkCard,
    TkAccordion,
    TkAccordionItem,
    TkTabs,
    TkTabsItem,
    TkSpinner,
    TkDialog,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Takeoff UI Angular Demo');

  inputValue = '';
  selectValue = '';
  checkboxValue = false;
  toggleValue = false;
  dialogVisible = false;

  selectOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  onButtonClick() {
    console.log('Button clicked!');
  }

  onInputChange(event: CustomEvent) {
    this.inputValue = event.detail;
    console.log('Input changed:', event.detail);
  }

  onSelectChange(event: CustomEvent) {
    this.selectValue = event.detail;
    console.log('Select changed:', event.detail);
  }

  onCheckboxChange(event: CustomEvent) {
    this.checkboxValue = event.detail;
    console.log('Checkbox changed:', event.detail);
  }

  onToggleChange(event: CustomEvent) {
    this.toggleValue = event.detail;
    console.log('Toggle changed:', event.detail);
  }

  openDialog() {
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
  }
}
