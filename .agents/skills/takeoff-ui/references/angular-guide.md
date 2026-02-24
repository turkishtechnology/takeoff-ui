# Takeoff UI - Angular Integration Guide

## Overview

Takeoff UI is a Stencil.js web component library. The `@takeoff-ui/angular`
package provides Angular wrappers that expose Takeoff UI components as Angular
directives using the `@ProxyCmp` decorator, enabling full Angular template
syntax, type safety, and form integration.

All components use Shadow DOM encapsulation. Custom events carry the `tk-`
prefix and deliver data through `event.detail`.

**Requires Angular 21 or later.**

---

## Installation

```bash
npm install @takeoff-ui/angular @takeoff-ui/core
```

---

## Setup

### 1. Import Core CSS

Add the Takeoff UI CSS to your `angular.json` styles array or import it in your
global stylesheet:

**Option A: angular.json**

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@takeoff-ui/core/dist/core/core.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

**Option B: styles.css**

```css
@import '@takeoff-ui/core/dist/core/core.css';
```

**Option C: main.ts**

```ts
import '@takeoff-ui/core/dist/core/core.css';
```

### 2. Import Components

#### Standalone Components (Recommended)

Import Takeoff UI components directly into your standalone component's `imports`
array:

```ts
import { Component } from '@angular/core';
import { TkButton, TkInput } from '@takeoff-ui/angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TkButton, TkInput],
  template: `
    <tk-button variant="primary" type="filled">Click Me</tk-button>
    <tk-input label="Name" placeholder="Enter your name"></tk-input>
  `,
})
export class ExampleComponent {}
```

#### NgModule-based Components

If using NgModule, add the components to the module's `imports` array:

```ts
import { NgModule } from '@angular/core';
import { TkButton, TkInput, TkSelect } from '@takeoff-ui/angular';

@NgModule({
  imports: [TkButton, TkInput, TkSelect],
  declarations: [MyComponent],
})
export class MyModule {}
```

---

## Importing Components

Import individual components from the package and add them to the `imports`
array of your component or module:

```ts
import {
  TkButton,
  TkInput,
  TkSelect,
  TkTable,
  TkDialog,
} from '@takeoff-ui/angular';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [TkButton, TkInput, TkSelect, TkTable, TkDialog],
  templateUrl: './my-component.component.html',
})
export class MyComponent {}
```

Each import is an Angular directive backed by the `@ProxyCmp` decorator, which
proxies props and events to the underlying web component.

---

## Props

Use **kebab-case** attributes in templates. Use `[prop]` (property binding) for
dynamic or non-string values.

### Common Prop Patterns

| Prop      | Values                                                                                              | Description    |
| --------- | --------------------------------------------------------------------------------------------------- | -------------- |
| `size`    | `"small"` \| `"base"` \| `"large"`                                                                  | Component size |
| `variant` | `"primary"` \| `"secondary"` \| `"neutral"` \| `"danger"` \| `"warning"` \| `"success"` \| `"info"` | Color variant  |
| `type`    | `"filled"` \| `"elevated"` \| `"outlined"` \| `"text"`                                              | Visual style   |

```html
<!-- Static string props -->
<tk-button size="large" variant="primary" type="filled"> Submit </tk-button>

<!-- Dynamic props with property binding -->
<tk-button [size]="buttonSize" [variant]="buttonVariant">
  Dynamic Button
</tk-button>

<!-- Boolean props -->
<tk-input [disabled]="isDisabled" label="Name"></tk-input>
```

### Passing Complex Props

Use property binding for objects and arrays:

```ts
@Component({
  selector: 'app-table-example',
  standalone: true,
  imports: [TkTable],
  template: `<tk-table [columns]="columns" [data]="data"></tk-table>`,
})
export class TableExampleComponent {
  columns = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
  ];

  data = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ];
}
```

---

## Events

Takeoff UI custom events use the `(tkEventName)` format in Angular templates
(camelCase with `tk` prefix). The handler receives `$event`, and data is
available on `$event.detail`.

### Event Naming Convention

| Web Component Event | Angular Binding |
| ------------------- | --------------- |
| `tk-click`          | `(tkClick)`     |
| `tk-change`         | `(tkChange)`    |
| `tk-blur`           | `(tkBlur)`      |
| `tk-focus`          | `(tkFocus)`     |
| `tk-input`          | `(tkInput)`     |
| `tk-select`         | `(tkSelect)`    |
| `tk-close`          | `(tkClose)`     |

### Event Handler

```ts
@Component({
  selector: 'app-input-example',
  standalone: true,
  imports: [TkInput],
  template: `
    <tk-input
      label="Name"
      [value]="name"
      (tkChange)="onNameChanged($event)"
    ></tk-input>
  `,
})
export class InputExampleComponent {
  name = '';

  onNameChanged(event: CustomEvent): void {
    this.name = event.detail;
    console.log('New name:', this.name);
  }
}
```

Inline handler shorthand:

```html
<tk-input (tkChange)="name = $event.detail"></tk-input>
```

---

## Slots

Use the `slot` attribute on child elements to project content into named slots:

```html
<tk-dialog [open]="isOpen" (tkClose)="isOpen = false">
  <div slot="header">Dialog Title</div>
  <div slot="content">
    <p>This is the dialog body content.</p>
  </div>
  <div slot="footer">
    <tk-button variant="primary" (tkClick)="isOpen = false">Confirm</tk-button>
    <tk-button variant="neutral" (tkClick)="isOpen = false">Cancel</tk-button>
  </div>
</tk-dialog>
```

Default slot content (no `slot` attribute) fills the unnamed default slot:

```html
<tk-button variant="primary">
  Click Me
  <!-- default slot -->
</tk-button>
```

**Note:** Angular's `<ng-content>` is not used with Takeoff UI components. Use
the native `slot` attribute instead, as the web components handle slot
projection internally via Shadow DOM.

---

## Form Integration

### Reactive Forms

```ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TkInput, TkSelect, TkButton } from '@takeoff-ui/angular';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, TkInput, TkSelect, TkButton],
  template: `
    <form [formGroup]="form">
      <tk-input
        label="Name"
        [value]="form.get('name')?.value"
        (tkChange)="form.get('name')?.setValue($event.detail)"
      ></tk-input>

      <tk-input
        label="Email"
        [value]="form.get('email')?.value"
        (tkChange)="form.get('email')?.setValue($event.detail)"
      ></tk-input>

      <tk-select
        label="Role"
        [options]="roleOptions"
        [value]="form.get('role')?.value"
        (tkChange)="form.get('role')?.setValue($event.detail)"
      ></tk-select>

      <tk-button variant="primary" type="filled" (tkClick)="onSubmit()">
        Submit
      </tk-button>
    </form>
  `,
})
export class ReactiveFormComponent {
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
  });

  roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Guest', value: 'guest' },
  ];

  onSubmit(): void {
    console.log('Form data:', this.form.value);
  }
}
```

### Template-driven Forms (ngModel)

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TkInput, TkButton } from '@takeoff-ui/angular';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule, TkInput, TkButton],
  template: `
    <form #myForm="ngForm">
      <tk-input
        label="Name"
        [value]="name"
        (tkChange)="name = $event.detail"
      ></tk-input>

      <tk-input
        label="Email"
        [value]="email"
        (tkChange)="email = $event.detail"
      ></tk-input>

      <tk-button variant="primary" type="filled" (tkClick)="onSubmit()">
        Submit
      </tk-button>
    </form>

    <p>Hello, {{ name }}! Your email is {{ email }}.</p>
  `,
})
export class TemplateFormComponent {
  name = '';
  email = '';

  onSubmit(): void {
    console.log('Name:', this.name);
    console.log('Email:', this.email);
  }
}
```

---

## TypeScript Support

The Angular wrappers include full TypeScript definitions. Component props,
events, and method signatures are all typed through the Stencil output target.

```ts
import { TkInput } from '@takeoff-ui/angular';

// The component's props and events are strongly typed
```

---

## Common Examples

### Button

```ts
import { Component } from '@angular/core';
import { TkButton } from '@takeoff-ui/angular';

@Component({
  selector: 'app-button-example',
  standalone: true,
  imports: [TkButton],
  template: `
    <tk-button variant="primary" type="filled" (tkClick)="handleClick()">
      Primary Action
    </tk-button>

    <tk-button variant="secondary" type="outlined" size="small">
      Secondary
    </tk-button>

    <tk-button variant="danger" type="filled" [disabled]="true">
      Disabled
    </tk-button>
  `,
})
export class ButtonExampleComponent {
  handleClick(): void {
    console.log('Button clicked');
  }
}
```

### Input with Reactive Form

```ts
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TkInput } from '@takeoff-ui/angular';

@Component({
  selector: 'app-input-example',
  standalone: true,
  imports: [ReactiveFormsModule, TkInput],
  template: `
    <tk-input
      label="Name"
      placeholder="Enter your name"
      [value]="nameControl.value"
      (tkChange)="nameControl.setValue($event.detail)"
    ></tk-input>

    <tk-input
      label="Email"
      placeholder="Enter your email"
      [value]="emailControl.value"
      (tkChange)="emailControl.setValue($event.detail)"
      (tkBlur)="onEmailBlur()"
    ></tk-input>

    <p>
      Hello, {{ nameControl.value }}! Your email is {{ emailControl.value }}.
    </p>
  `,
})
export class InputExampleComponent {
  nameControl = new FormControl('');
  emailControl = new FormControl('');

  onEmailBlur(): void {
    console.log('Email field lost focus');
  }
}
```

### Select

```ts
import { Component } from '@angular/core';
import { TkSelect } from '@takeoff-ui/angular';

@Component({
  selector: 'app-select-example',
  standalone: true,
  imports: [TkSelect],
  template: `
    <tk-select
      label="Choose an option"
      [options]="options"
      [value]="selected"
      (tkChange)="selected = $event.detail"
    ></tk-select>

    <p>Selected: {{ selected }}</p>
  `,
})
export class SelectExampleComponent {
  selected = '';

  options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ];
}
```

### Table

```ts
import { Component } from '@angular/core';
import { TkTable } from '@takeoff-ui/angular';

@Component({
  selector: 'app-table-example',
  standalone: true,
  imports: [TkTable],
  template: `
    <tk-table
      [columns]="columns"
      [data]="data"
      (tkSelect)="onRowSelect($event)"
    ></tk-table>
  `,
})
export class TableExampleComponent {
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
  ];

  data = [
    { id: 1, name: 'Task A', status: 'Active' },
    { id: 2, name: 'Task B', status: 'Completed' },
    { id: 3, name: 'Task C', status: 'Pending' },
  ];

  onRowSelect(event: CustomEvent): void {
    console.log('Selected row:', event.detail);
  }
}
```

### Dialog

```ts
import { Component } from '@angular/core';
import { TkButton, TkDialog } from '@takeoff-ui/angular';

@Component({
  selector: 'app-dialog-example',
  standalone: true,
  imports: [TkButton, TkDialog],
  template: `
    <tk-button variant="primary" (tkClick)="isOpen = true">
      Open Dialog
    </tk-button>

    <tk-dialog [open]="isOpen" (tkClose)="isOpen = false">
      <div slot="header">Confirm Action</div>
      <div slot="content">
        <p>Are you sure you want to proceed?</p>
      </div>
      <div slot="footer">
        <tk-button variant="primary" (tkClick)="isOpen = false">
          Confirm
        </tk-button>
        <tk-button variant="neutral" (tkClick)="isOpen = false">
          Cancel
        </tk-button>
      </div>
    </tk-dialog>
  `,
})
export class DialogExampleComponent {
  isOpen = false;
}
```

---

## Gotchas and Common Mistakes

### 1. Components are Angular directives using @ProxyCmp decorator

Takeoff UI Angular components are not standard Angular components. They are
directives that proxy props and events to the underlying web component. This
means they work differently from typical Angular components:

- They do not use `@Input()` and `@Output()` decorators directly.
- They must be added to the `imports` array, not the `declarations` array.

### 2. Must add to imports array

Every Takeoff UI component used in a template must be in the `imports` array of
the component decorator (or NgModule):

```ts
// WRONG - component will not be recognized
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [], // Missing TkButton!
  template: `<tk-button>Click</tk-button>`,
})

// CORRECT
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TkButton],
  template: `<tk-button>Click</tk-button>`,
})
```

### 3. Use `$event.detail` to access event data

Takeoff UI events are `CustomEvent` instances. Do **not** use
`$event.target.value`:

```html
<!-- WRONG -->
<tk-input (tkChange)="name = $event.target.value"></tk-input>

<!-- CORRECT -->
<tk-input (tkChange)="name = $event.detail"></tk-input>
```

### 4. Angular 21+ required

The `@takeoff-ui/angular` package requires Angular 21 or later. Ensure your
project meets this version requirement.

### 5. CSS import is required

Without the core CSS, components will render but appear unstyled. Use one of the
setup methods described above to include the CSS.

### 6. Shadow DOM encapsulation

Components use Shadow DOM. Angular's `ViewEncapsulation` settings and
`::ng-deep` will not penetrate the Shadow DOM boundary. Use the component's
props (e.g., `variant`, `size`, `type`) and CSS custom properties to customize
appearance.

### 7. Use property binding for non-string values

Without `[prop]` binding, Angular treats attribute values as strings:

```html
<!-- WRONG - passes the string "false" (truthy!) -->
<tk-input disabled="false"></tk-input>

<!-- CORRECT - passes the boolean false -->
<tk-input [disabled]="false"></tk-input>
```
