# Form Components Reference

API reference for Takeoff UI form components. These components handle user
input, selection, and data entry across forms.

---

### tk-input

The TkInput component is used to capture text input from the user.

**Props**

| Name             | Type                                                     | Default | Description                                                                                                              |
| ---------------- | -------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| chipDisabled     | Function                                                 |         | A function that determines whether a chip is disabled.                                                                   |
| chipLabelKey     | string                                                   | 'label' | The key to use for option labels                                                                                         |
| chipOptions      | IChipOptions                                             |         | Sets options for all chips rendered in chips mode.                                                                       |
| clearable        | boolean                                                  | false   | Indicates whether the input can be cleared                                                                               |
| disabled         | boolean                                                  | false   | the user cannot interact with the input.                                                                                 |
| error            | string                                                   |         | This is the error message that will be displayed.                                                                        |
| hint             | string                                                   |         | Provided a hint or additional information about the input.                                                               |
| icon             | IIconOptions \| IMultiIconOptions \| string              |         | Specifies a material icon name to be displayed.                                                                          |
| iconPosition     | "left" \| "right"                                        | 'left'  | Defines the position of the icon.                                                                                        |
| invalid          | boolean                                                  | false   | Indicates whether the input is in an invalid state                                                                       |
| label            | string                                                   |         | Defines the label for the input.                                                                                         |
| maskOptions      | IInputMaskOptions                                        |         | The maskOptions prop is used to define masking configurations supported by the Cleave.js library. With this prop, you... |
| max              | number \| string                                         |         | Maximum value for number inputs                                                                                          |
| min              | number \| string                                         |         | Minimum value for number inputs                                                                                          |
| mode             | "chips" \| "counter" \| "number" \| "password" \| "text" | 'text'  | input type                                                                                                               |
| name             | string                                                   |         | The name of the control, which is submitted with the form data.                                                          |
| placeholder      | string                                                   |         | Placeholder text displayed when the input is empty.                                                                      |
| pre              | string                                                   |         | Defines the prefix of the input;                                                                                         |
| readonly         | boolean                                                  | false   | If `true`, the user cannot modify the value.                                                                             |
| showAsterisk     | boolean                                                  | false   | Displays a red asterisk (\*) next to the label for visual emphasis.                                                      |
| showSafetyStatus | boolean                                                  | false   | if type = password safety status bar visible                                                                             |
| size             | "base" \| "large" \| "small"                             | 'base'  | Sets size for the component.                                                                                             |
| step             | string                                                   |         | Sets step for decimal value with mode number                                                                             |
| value            | any[] \| number \| string \| string[]                    |         | The value of the input.                                                                                                  |

**Events**

| Name           | Detail | Description                              |
| -------------- | ------ | ---------------------------------------- |
| tk-blur        | void   | Emitted when the input loses focus.      |
| tk-change      | any    | Emitted when the value has changed.      |
| tk-clear-click | void   | Emitted when the clear button has click. |
| tk-focus       | void   | Emitted when the input has focus.        |

**Methods**

| Name     | Signature                   | Description                                                                                    |
| -------- | --------------------------- | ---------------------------------------------------------------------------------------------- |
| setFocus | setFocus() => Promise<void> | Sets focus on the specified `tk-input`. Use this method instead of the global `input.focus()`. |

---

### tk-textarea

The TkTextarea component enables multi-line text input with customizable size,
validation, and styling options.

**Props**

| Name         | Type                         | Default | Description                                                         |
| ------------ | ---------------------------- | ------- | ------------------------------------------------------------------- |
| disabled     | boolean                      | false   | If `true`, the user cannot interact with the input.                 |
| error        | string                       |         | This is the error message that will be displayed.                   |
| hint         | string                       |         | Provided a hint or additional information about the input.          |
| invalid      | boolean                      | false   | Indicates whether the input is in an invalid state                  |
| label        | string                       |         | Defines the label for the element.                                  |
| maxLength    | number                       |         | Limits the number of characters.                                    |
| name         | string                       |         | The name of the control, which is submitted with the form data.     |
| placeholder  | string                       |         | Placeholder text displayed when the input is empty.                 |
| readonly     | boolean                      | false   | If `true`, the user cannot modify the value.                        |
| rows         | number                       | 3       | Represents the rows value of the component                          |
| showAsterisk | boolean                      | false   | Displays a red asterisk (\*) next to the label for visual emphasis. |
| size         | "base" \| "large" \| "small" | 'base'  | Sets size for the component.                                        |
| value        | number \| string             | ''      | The value of the input.                                             |

**Events**

| Name      | Detail           | Description                             |
| --------- | ---------------- | --------------------------------------- |
| tk-blur   | void             | Emitted when the input loses focus.     |
| tk-change | number \| string | Emitted when the value has changed.     |
| tk-focus  | void             | Emitted when the input has focus.       |
| tk-input  | KeyboardEvent    | Emitted when a keyboard input occurred. |

**Methods**

| Name     | Signature                   | Description                                                                                    |
| -------- | --------------------------- | ---------------------------------------------------------------------------------------------- |
| setFocus | setFocus() => Promise<void> | Sets focus on the specified `tk-input`. Use this method instead of the global `input.focus()`. |

---

### tk-select

TkSelect component description.

**Props**

| Name                | Type                         | Default                | Description                                                                                                              |
| ------------------- | ---------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| allowCustomValue    | boolean                      | false                  | Enables users to enter custom values that are not part of the predefined options.                                        |
| chipOptions         | IChipOptions                 |                        | Sets options for all chips rendered in multiple selection mode.                                                          |
| clearable           | boolean                      | false                  | Indicates whether the input can be cleared                                                                               |
| disabled            | boolean                      | false                  | If `true`, the user cannot interact with the input.                                                                      |
| dropdownWidthMode   | string                       | 'match-parent'         | Determines the width of the dropdown. Accepts values like 'match-parent', 'auto', or a specific width in '300px'.        |
| editable            | boolean                      | false                  | This property determines whether the input field within the select box is editable.                                      |
| emptyMessage        | string                       | 'No options available' | The message to display when there is no data available.                                                                  |
| error               | string                       |                        | This is the error message that will be displayed.                                                                        |
| filter              | Function                     | this.defaultFilter     | Function used to filter current options based on the input value. Comes with a default filter function, but can be ov... |
| filterDebounceDelay | number                       | 0                      | Sets the delay (in ms) before triggering the filter function.                                                            |
| groupNameKey        | string                       | 'label'                | The key to use for option group names. Required if grouped options are used.                                             |
| groupOptionsKey     | string                       | 'options'              | The key to use for accessing grouped options array. Required if grouped options are used.                                |
| hint                | string                       |                        | Provided a hint or additional information about the input.                                                               |
| icon                | IIconOptions \| string       |                        | The icon displayed in the select box.                                                                                    |
| invalid             | boolean                      | false                  | Indicates whether the input is in an invalid state                                                                       |
| label               | string                       |                        | Defines the label for the element.                                                                                       |
| loading             | boolean                      | false                  | Represents whether the options are fethecd from service or not. If true renders spinner in options dropdown.             |
| multiple            | boolean                      |                        | If `true` the user can make multiple selections.                                                                         |
| name                | string                       |                        | The name of the control, which is submitted with the form data.                                                          |
| optionDisabled      | Function                     |                        | A function to determine whether an option should be disabled.                                                            |
| optionHtml          | Function                     |                        | Provides a function to customize the options.                                                                            |
| optionLabelKey      | string                       | 'label'                | The key to use for option labels                                                                                         |
| optionValueKey      | string                       |                        | The key to use for option values                                                                                         |
| options             | any[]                        |                        | The list of options to be displayed in the select box.                                                                   |
| panelTopHtml        | Function                     |                        | Provides a function to customize the panel top content.                                                                  |
| placeholder         | string                       |                        | Placeholder text displayed when the input is empty.                                                                      |
| readonly            | boolean                      | false                  | If `true`, the user cannot modify the value.                                                                             |
| selectAll           | boolean                      | false                  | If true enables selectAll option                                                                                         |
| selectAllLabel      | string                       | 'All'                  | Sets the label of the selectAll option                                                                                   |
| showAsterisk        | boolean                      | false                  | Displays a red asterisk (\*) next to the label for visual emphasis.                                                      |
| size                | "base" \| "large" \| "small" | 'base'                 | Sets size for the component.                                                                                             |
| value               | any                          |                        | The value of the input.                                                                                                  |
| visibleItemCount    | number                       |                        | The number of items to show in the collapsed select before listing `+N others`.                                          |

**Events**

| Name          | Detail  | Description                                  |
| ------------- | ------- | -------------------------------------------- |
| tk-change     | any     | Emitted when the value has changed.          |
| tk-close      | void    | Emitted when the select is closed            |
| tk-open       | void    | Emitted when the select is opened            |
| tk-select-all | boolean | Emitted when the selectAll option is changed |

**Slots**

| Name       | Description                                            |
| ---------- | ------------------------------------------------------ |
| empty-data | Set how the dropdown will appear when there is no data |

---

### tk-checkbox

The TkCheckbox component is another basic element for user input.

**Props**

| Name          | Type                | Default   | Description                                          |
| ------------- | ------------------- | --------- | ---------------------------------------------------- |
| description   | string              |           | The description sub text displayed.                  |
| disabled      | boolean             | false     | If true, the user cannot interact with the checkbox. |
| indeterminate | boolean             | false     | If true, the checkbox will be indeterminate.         |
| invalid       | boolean             | false     | Indicates whether the input is in an invalid state   |
| label         | string              |           | Defines the label for the checkbox.                  |
| name          | string              |           | Name of the checkbox                                 |
| size          | "base" \| "small"   | 'base'    | Determines the size of the checkbox.                 |
| type          | "card" \| "default" | 'default' | Determines the appearance types of the checkbox.     |
| value         | boolean             | false     | Sets the checkbox value                              |

**Events**

| Name      | Detail  | Description                                      |
| --------- | ------- | ------------------------------------------------ |
| tk-change | boolean | Emitted when the checkbox checked state changes. |

**Slots**

| Name    | Description              |
| ------- | ------------------------ |
| content | Custom content template. |

---

### tk-radio

The TkRadio component is another basic element for user input.

**Props**

| Name        | Type              | Default | Description                                                        |
| ----------- | ----------------- | ------- | ------------------------------------------------------------------ |
| checked     | boolean           | false   | Marks the radio button as checked or unchecked.                    |
| description | string            |         | The description sub text displayed.                                |
| disabled    | boolean           | false   | Disables the radio button if true.                                 |
| invalid     | boolean           | false   | Indicates whether the input is in an invalid state                 |
| label       | string            |         | Defines the label for the element.                                 |
| name        | string            |         | The name of the radio group, used to group radio buttons together. |
| position    | "left" \| "right" |         | Determines the position of the radio and label.                    |
| value       | any               |         | The value of the radio button.                                     |

**Events**

| Name      | Detail | Description                                            |
| --------- | ------ | ------------------------------------------------------ |
| tk-change | any    | Emitted when the radio button's checked state changes. |

**Slots**

| Name    | Description              |
| ------- | ------------------------ |
| content | Custom content template. |

---

### tk-radio-group

Groups multiple tk-radio buttons together, managing shared state and layout.

**Props**

| Name         | Type                       | Default      | Description                                                                   |
| ------------ | -------------------------- | ------------ | ----------------------------------------------------------------------------- |
| direction    | "horizontal" \| "vertical" | 'horizontal' | The direction of the radio buttons.                                           |
| error        | string                     |              | This is the error message that will be displayed.                             |
| invalid      | boolean                    | false        | Indicates whether the input is in an invalid state                            |
| label        | string                     |              | Defines the label for the element.                                            |
| name         | string                     |              | The name attribute for the input element.                                     |
| position     | "left" \| "right"          | 'left'       | Determines the position of the radio group and label.                         |
| showAsterisk | boolean                    | false        | Displays a red asterisk (\*) next to the label for visual emphasis.           |
| spread       | boolean                    | false        | Determines whether the radios will spread evenly across the horizontal space. |
| type         | "card" \| "default"        | 'default'    | Determines the appearance types of radios.                                    |
| value        | any                        |              | The value of the input.                                                       |

**Events**

| Name      | Detail | Description                         |
| --------- | ------ | ----------------------------------- |
| tk-change | any    | Emitted when the value has changed. |

---

### tk-toggle

The TkToggle component is another basic element for user input.

**Props**

| Name           | Type                                                 | Default | Description                                     |
| -------------- | ---------------------------------------------------- | ------- | ----------------------------------------------- |
| ariaLabelledby | string                                               | null    | The aria-labelledby attribute of the toggle.    |
| disabled       | boolean                                              | false   | Whether the toggle is disabled.                 |
| icon           | string                                               | 'check' | Specifies a material icon name to be displayed. |
| invalid        | boolean                                              | false   | Whether the toggle is in an invalid state.      |
| label          | string                                               |         | The label for the toggle.                       |
| name           | string                                               | null    | The name attribute of the toggle.               |
| showIcon       | boolean                                              | true    | Whether to show the icon in the toggle.         |
| size           | "base" \| "large" \| "small" \| "xlarge" \| "xsmall" | 'base'  | Sets size for the component.                    |
| value          | boolean                                              | false   | The current state of the toggle.                |
| variant        | "info" \| "success"                                  | 'info'  | The type of the toggle.                         |

**Events**

| Name      | Detail  | Description                                  |
| --------- | ------- | -------------------------------------------- |
| tk-change | boolean | Event emitted when the toggle value changes. |

**Methods**

| Name            | Signature                                      | Description                                               |
| --------------- | ---------------------------------------------- | --------------------------------------------------------- |
| getInputElement | getInputElement() => Promise<HTMLInputElement> | Returns the native `<input>` element used under the hood. |

---

### tk-toggle-button

A button that toggles between selected and unselected states.

**Props**

| Name         | Type                                                           | Default   | Description                                           |
| ------------ | -------------------------------------------------------------- | --------- | ----------------------------------------------------- |
| disabled     | boolean                                                        |           | Disables the button, preventing user interaction.     |
| icon         | IIconOptions \| string                                         |           | Specifies a material icon name to be displayed.       |
| iconPosition | "left" \| "right"                                              | 'left'    | Defines the position of the icon.                     |
| label        | string                                                         | ''        | Label text displayed inside the button.               |
| rounded      | boolean                                                        |           | Makes the button round with an icon-only style.       |
| selected     | boolean                                                        | false     | Whether the button is selected.                       |
| size         | "base" \| "large" \| "small"                                   | 'base'    | Sets size for the component.                          |
| type         | "filled" \| "filled-light" \| "outlined" \| "raised" \| "text" | 'filled'  | The value of the type toggle button.                  |
| value        | any                                                            |           | The value of the toggle button.                       |
| variant      | "neutral" \| "primary"                                         | 'neutral' | Determines the button's variant for different styles. |

**Events**

| Name      | Detail | Description                                |
| --------- | ------ | ------------------------------------------ |
| tk-toggle | any    | Emitted when the toggle button is toggled. |

---

### tk-toggle-button-group

TkToggleButtonGroup is a component that allows you to create a group of toggle
buttons.

**Props**

| Name      | Type                            | Default      | Description                                   |
| --------- | ------------------------------- | ------------ | --------------------------------------------- |
| direction | "horizontal" \| "vertical"      | 'horizontal' | The direction of the toggle button group.     |
| rounded   | boolean                         | false        | The value of the rounded toggle button group. |
| type      | "basic" \| "divided" \| "light" | 'basic'      | The value type of the toggle button group.    |
| value     | any                             |              | The value of the selected toggle button.      |

**Events**

| Name      | Detail | Description                              |
| --------- | ------ | ---------------------------------------- |
| tk-change | any    | Emitted when the selected value changes. |

---

### tk-datepicker

The `TkDatepicker` component is a versatile and customizable date picker that
supports `single` date and date `range` selection.

**Props**

| Name                | Type                                                   | Default          | Description                                                                                                              |
| ------------------- | ------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| allowApplyButton    | boolean                                                | false            | Whether to require manual confirmation (Apply button) before committing changes. If true, changes are only applied wh... |
| allowedDates        | string[]                                               | []               | Array of dates that are allowed to be selected. All other dates will be disabled. Note: Format should match dateForm...  |
| clearable           | boolean                                                | false            | Indicates whether the input of datepicker can be cleared                                                                 |
| dateFormat          | string                                                 | 'yyyy-MM-dd'     | Date format pattern                                                                                                      |
| disableMask         | boolean                                                | false            | Whether to disable input mask                                                                                            |
| disabled            | boolean                                                | false            | Whether the datepicker is disabled                                                                                       |
| disabledDates       | string[]                                               | []               | Array of dates that are disabled for selection. Format should match dateFormat prop                                      |
| disabledWeekDays    | number[]                                               | []               | Disabled week days (0-6, where 0 is Sunday and 6 is Saturday) Example: [0,6] will disable Sunday and Saturday            |
| error               | string                                                 |                  | Error message to display                                                                                                 |
| firstDayOfWeekIndex | number                                                 |                  | Defines the first day of the week. 0 for Monday, 1 for Tuesday, ..., 6 for Sunday. If not provided, the first day of ... |
| footerType          | "basic" \| "divided" \| "light"                        | 'basic'          | The visual variant of the footer: 'basic', 'divided', or 'light'.                                                        |
| headerType          | "basic" \| "dark" \| "divided" \| "light" \| "primary" | 'basic'          | Header visual variant                                                                                                    |
| hint                | string                                                 |                  | Hint text to display                                                                                                     |
| hourStep            | number                                                 | 1                | Hour increment step.                                                                                                     |
| icon                | IIconOptions \| IMultiIconOptions \| string            | 'calendar_month' | Specifies a material icon name to be displayed.                                                                          |
| iconPosition        | "left" \| "right"                                      | 'left'           | Defines the position of the icon.                                                                                        |
| inline              | boolean                                                | false            | Whether to display inline panel                                                                                          |
| invalid             | boolean                                                | false            | Whether the datepicker is in an invalid state                                                                            |
| label               | string                                                 |                  | Defines the label for the input                                                                                          |
| locale              | string                                                 | 'en'             | Locale for date formatting                                                                                               |
| maxDate             | string                                                 | ''               | Maximum selectable date                                                                                                  |
| maxTime             | string                                                 |                  | Maximum selectable time (HH:mm format).                                                                                  |
| minDate             | string                                                 | ''               | Minimum selectable date                                                                                                  |
| minTime             | string                                                 |                  | Minimum selectable time (HH:mm format).                                                                                  |
| minuteStep          | number                                                 | 1                | Minute increment step.                                                                                                   |
| mode                | "range" \| "single"                                    | 'single'         | The selection mode of the date picker: 'single' for single date selection, 'range' for date range selection.             |
| name                | string                                                 |                  | The name of the control.                                                                                                 |
| placeholder         | string                                                 |                  | Input placeholder text                                                                                                   |
| readonly            | boolean                                                | false            | Whether the datepicker is read-only                                                                                      |
| showAsterisk        | boolean                                                | false            | Displays a red asterisk (\*) next to the label for visual emphasis.                                                      |
| showTimePicker      | boolean                                                | false            | Whether to show the timepicker panel next to the calendar.                                                               |
| size                | "base" \| "large" \| "small"                           | 'base'           | Defines the size for the label                                                                                           |
| timeFormat          | "12" \| "24"                                           | '24'             | Time format: '12' or '24'.                                                                                               |
| timeOnly            | boolean                                                | false            | Enables time-only mode. In this mode, no date selection is required and the input shows a time mask. When enabled, th... |
| value               | IDateSelection \| string                               |                  | The value representing the selected date(s)                                                                              |

**Events**

| Name            | Detail                   | Description                       |
| --------------- | ------------------------ | --------------------------------- |
| tk-change       | IDateSelection \| string | Emitted on date selection changes |
| tk-input-change | string                   | Emitted on input value changes    |

**Methods**

| Name       | Signature                     | Description                                                |
| ---------- | ----------------------------- | ---------------------------------------------------------- |
| apply      | apply() => Promise<void>      | Applies the current internal selection and emits tk-change |
| closePanel | closePanel() => Promise<void> | Closes the datepicker panel if it is open.                 |
| setToday   | setToday() => Promise<void>   | Sets the date to today                                     |

**Slots**

| Name           | Description                                |
| -------------- | ------------------------------------------ |
| footer         | Custom footer template.                    |
| footer-actions | Custom actions template to default footer. |

---

### tk-currency-input

The TkCurrencyInput component allows users to input phone numbers with country
selection and validation.

**Props**

| Name               | Type                         | Default        | Description                                                                                                              |
| ------------------ | ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| allowNegative      | boolean                      | false          | Allows negative values to be entered if set to true.                                                                     |
| currencyDisabled   | boolean                      | false          | Disables the currency field if set to true.                                                                              |
| currencyList       | ICurrency[]                  |                | List of available currencies. If not provided, it defaults to the internal currency list.                                |
| decimalSeparator   | " " \| "," \| "."            |                | Custom decimal separator to use for formatting. If provided, this will override the currency's default decimal separa... |
| defaultCurrency    | string                       | 'TRY'          | The default currency to use when the component is initialized. Default is 'TRY'.                                         |
| disabled           | boolean                      | false          | Disables the input field if set to true.                                                                                 |
| dropdownWidthMode  | string                       | 'match-parent' | Determines the width of the dropdown. Accepts values like 'match-parent', 'auto', or a specific width in '300px'.        |
| error              | string                       |                | This is the error message that will be displayed.                                                                        |
| hideFlag           | boolean                      | false          | Hides the currency flag icon in the dropdown button and list.                                                            |
| hint               | string                       |                | Provided a hint or additional information about the input.                                                               |
| invalid            | boolean                      | false          | Marks the input field as invalid if set to true.                                                                         |
| label              | string                       |                | The label for the input field. If provided, it will be displayed above the input.                                        |
| name               | string                       |                | The name attribute for the input element. Useful for form submissions.                                                   |
| placeholder        | string                       |                | Placeholder text for the input field.                                                                                    |
| precision          | number                       | 2              | The number of decimal places to display in the formatted currency value. Default is 2, which is common for most curre... |
| readonly           | boolean                      | false          | Makes the input field read-only if set to true.                                                                          |
| showAsterisk       | boolean                      | false          | Displays a red asterisk (\*) next to the label for visual emphasis.                                                      |
| size               | "base" \| "large" \| "small" | 'base'         | Sets size for the component.                                                                                             |
| thousandsSeparator | " " \| "," \| "."            |                | Custom thousands separator to use for formatting. If provided, this will override the currency's default thousands se... |
| value              | number                       | 0              | The value of the input.                                                                                                  |

**Events**

| Name      | Detail | Description                         |
| --------- | ------ | ----------------------------------- |
| tk-change | any    | Emitted when the value has changed. |
| tkBlur    | void   | Emitted when the input loses focus. |
| tkFocus   | void   | Emitted when the input has focus.   |

---

### tk-phone-input

The TkPhoneInput component allows users to input phone numbers with country
selection and validation.

**Props**

| Name              | Type                         | Default        | Description                                                                                                           |
| ----------------- | ---------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| countryList       | ICountry[]                   |                | The list of countries to display in the dropdown. Can be provided as an array of Country objects or as a JSON string. |
| defaultCountry    | string                       | 'TR'           | The default country to select (ISO country code).                                                                     |
| disabled          | boolean                      | false          | Whether the input is disabled. \*                                                                                     |
| dropdownWidthMode | string                       | 'match-parent' | Determines the width of the dropdown. Accepts values like 'match-parent', 'auto', or a specific width in '300px'.     |
| error             | string                       |                | This is the error message that will be displayed.                                                                     |
| hideFlag          | boolean                      | false          | Hides the phone flag icon in the dropdown button and list.                                                            |
| hint              | string                       |                | Provided a hint or additional information about the input.                                                            |
| invalid           | boolean                      | false          | Indicates whether the input is in an invalid state                                                                    |
| label             | string                       |                | The label for the phone input.                                                                                        |
| placeholder       | string                       |                | Placeholder text for the phone input.                                                                                 |
| readonly          | boolean                      | false          | If `true`, the user cannot modify the value.                                                                          |
| showAsterisk      | boolean                      | false          | Displays a red asterisk (\*) next to the label for visual emphasis.                                                   |
| size              | "base" \| "large" \| "small" | 'base'         | Sets size for the component.                                                                                          |
| value             | any                          |                | The value of the phone input. This is a list of phone input data objects. It can be mutable to allow two-way binding. |

**Events**

| Name      | Detail | Description                         |
| --------- | ------ | ----------------------------------- |
| tk-blur   | void   | Emitted when the input loses focus. |
| tk-change | any    | Emitted when the value has changed. |
| tk-focus  | void   | Emitted when the input has focus.   |

---

### tk-upload

The TkUpload component is an interface element that allows users to select and
upload files from their devices to a server or a target location.

**Props**

| Name                | Type                    | Default                                        | Description                                                                                                              |
| ------------------- | ----------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| accept              | string                  | '\*'                                           | Acceptable file types for upload. Use MIME types or extensions separated by commas.                                      |
| autoUpload          | boolean                 | false                                          | If `autoUpload` is set to `true`, the upload button will be hidden, and the `tkUpload` event will be automatically tr... |
| chooseButtonLabel   | string                  | 'Choose File'                                  | Label text displayed inside the choose button.                                                                           |
| description         | string                  | 'JPEG, PNG, PDF and MP4 formats, up to 50 MB.' | Description displayed under the title.                                                                                   |
| disabled            | boolean                 | false                                          | Disables the input, preventing user interaction.                                                                         |
| downloadable        | boolean                 | false                                          | Indicates whether the files can be downloaded. When true, a download button will be displayed next to each file.         |
| dragDrop            | boolean                 | true                                           | Enables drag and drop functionality for file uploads.                                                                    |
| dragDropDescription | string                  | 'Release to upload files'                      | Description displayed under the title when drag and drop is active.                                                      |
| dragDropTitle       | string                  | 'Drop files here'                              | Title displayed in the upload component when drag and drop is active.                                                    |
| error               | string                  |                                                | Provided a error about the upload.                                                                                       |
| hint                | string                  |                                                | Provided a hint or additional information about the input.                                                               |
| invalid             | boolean                 | false                                          | Indicates whether the upload is in an invalid state, uploads will fail eventually                                        |
| label               | string                  |                                                | Defines the label of the upload area                                                                                     |
| loading             | boolean                 | false                                          | Indicates whether the upload is in an loading state                                                                      |
| maxFileCount        | number                  |                                                | Maximum allowed file count                                                                                               |
| maxFileSize         | number                  |                                                | Maximum allowed file size in bytes.                                                                                      |
| multiple            | boolean                 | false                                          | Allows multiple file selection.                                                                                          |
| showAsterisk        | boolean                 | false                                          | Displays a red asterisk (\*) next to the label for visual emphasis.                                                      |
| showFiles           | boolean                 | true                                           | Displays the uploaded files.                                                                                             |
| title               | string                  | 'Choose a file or drag & drop it here.'        | Title displayed in the upload component.                                                                                 |
| type                | "centered" \| "default" | 'default'                                      | Type of the file upload area.                                                                                            |
| uploadButtonLabel   | string                  | 'Upload'                                       | Label text displayed inside the upload button.                                                                           |
| value               | File[]                  | []                                             | The file value of the upload.                                                                                            |

**Events**

| Name              | Detail                                        | Description                                                   |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------- |
| tk-change         | File[]                                        | Emitted when one or more files pass validation.               |
| tk-download-file  | File                                          | Emitted when a file is download button is clicked.            |
| tk-files-rejected | { reason: string; file: File \| FileList; }[] | Emitted when one or more files fail validation, with reasons. |
| tk-removed-file   | File                                          | Emitted when a file is removed from the accepted list.        |
| tk-upload         | File[]                                        | Emitted when the user initiates file upload.                  |

---

### tk-color-picker

The `TkColorPicker` component provides a color selection interface with various
input formats. It supports HEX and RGB color formats with an optional alpha
channel.

**Props**

| Name               | Type                                                   | Default                                                                                                                   | Description                                                                                                              |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| disabled           | boolean                                                | false                                                                                                                     | Disables the color picker                                                                                                |
| error              | string                                                 |                                                                                                                           | This is the error message that will be displayed.                                                                        |
| footerType         | "basic" \| "divided" \| "light"                        | 'basic'                                                                                                                   | The type of the footer styling                                                                                           |
| format             | "hex" \| "rgba"                                        | 'hex'                                                                                                                     | Color format for display and output                                                                                      |
| header             | string                                                 |                                                                                                                           | Title displayed in the panel header                                                                                      |
| headerType         | "basic" \| "dark" \| "divided" \| "light" \| "primary" | 'basic'                                                                                                                   | The type of the header styling                                                                                           |
| hint               | string                                                 |                                                                                                                           | Provided a hint or additional information about the input.                                                               |
| inline             | boolean                                                | false                                                                                                                     | Displays the picker inline without trigger                                                                               |
| invalid            | boolean                                                | false                                                                                                                     | Indicates whether the input is in an invalid state                                                                       |
| label              | string                                                 |                                                                                                                           | Label text displayed above the trigger input                                                                             |
| name               | string                                                 |                                                                                                                           | The name of the control, which is submitted with the form data.                                                          |
| orientation        | "horizontal" \| "vertical"                             | 'vertical'                                                                                                                | Panel layout orientation                                                                                                 |
| placeholder        | string                                                 |                                                                                                                           | Placeholder text displayed when the input is empty.                                                                      |
| presets            | string[]                                               | ['#326FD1', '#C79807', '#A45E3C', '#119C8D', '#EDBBA3', '#ABC9FB', '#D0E1FD', '#FF6259', '#717784', '#85B2F9', '#EAD6FD'] | Array of preset color values                                                                                             |
| preventDismiss     | boolean                                                | false                                                                                                                     | Prevents the panel from being dismissed by clicking outside. Use with footer actions (Apply/Cancel buttons) for contr... |
| readonly           | boolean                                                | false                                                                                                                     | If `true`, the user cannot modify the value.                                                                             |
| showAlphaSlider    | boolean                                                | true                                                                                                                      | Shows/hides the alpha slider                                                                                             |
| showAsterisk       | boolean                                                | false                                                                                                                     | Displays a red asterisk (\*) next to the label for visual emphasis.                                                      |
| showCloseButton    | boolean                                                | false                                                                                                                     | Controls whether the close button is shown in the header. Set to false when using footer actions for controlled closing. |
| showFormatSelector | boolean                                                | true                                                                                                                      | Shows/hides the format selector                                                                                          |
| showHeader         | boolean                                                | false                                                                                                                     | Controls whether the header is shown                                                                                     |
| showPresets        | boolean                                                | true                                                                                                                      | Shows/hides the preset colors section                                                                                    |
| size               | "base" \| "large" \| "small"                           | 'base'                                                                                                                    | Sets size for the component.                                                                                             |
| value              | string                                                 | ''                                                                                                                        | The current color value (supports HEX and RGB formats)                                                                   |

**Events**

| Name      | Detail | Description                                 |
| --------- | ------ | ------------------------------------------- |
| tk-apply  | string | Emitted when the apply button is clicked    |
| tk-cancel | void   | Emitted when the cancel button is clicked   |
| tk-change | string | Emitted when the color is applied/confirmed |
| tk-close  | void   | Emitted when the panel closes               |
| tk-open   | void   | Emitted when the panel opens                |

**Methods**

| Name     | Signature                                             | Description                                                                                                           |
| -------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| apply    | apply() => Promise<void>                              | Applies the current color selection and closes the panel Use this method in custom footer actions                     |
| cancel   | cancel() => Promise<void>                             | Cancels the color selection, reverts to previous value, and closes the panel Use this method in custom footer actions |
| close    | close() => Promise<void>                              | Closes the color picker panel                                                                                         |
| getValue | getValue(format?: "hex" \| "rgba") => Promise<string> | Gets the current color value in the specified format                                                                  |
| open     | open() => Promise<void>                               | Opens the color picker panel                                                                                          |

**Slots**

| Name           | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| footer         | Custom footer template (replaces default footer container).      |
| footer-actions | Custom actions template for footer layout with styled container. |
| header         | Custom header template (replaces default header completely).     |
| header-actions | Custom actions template for header (replaces close button).      |

---

### tk-slider

A range slider component for selecting numeric values within a defined range.

**Props**

| Name            | Type                       | Default  | Description                                                                                                              |
| --------------- | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| disabled        | boolean                    | false    | Whether the slider is disabled (non-interactive if true)                                                                 |
| error           | string                     |          | Error message to display when `invalid` is true                                                                          |
| hint            | string                     |          | Informational hint message (shown when no error is present)                                                              |
| invalid         | boolean                    | false    | Marks the slider as invalid; used to apply error styling                                                                 |
| label           | string                     |          | The label text displayed above the slider                                                                                |
| max             | number                     | 100      | The maximum value the slider can take                                                                                    |
| min             | number                     | 0        | The minimum value the slider can take                                                                                    |
| range           | boolean                    | false    | Whether the slider operates in range mode (true) or single value mode (false)                                            |
| rangeVisibility | boolean                    | true     | Whether the bottom label/tick section should be visible                                                                  |
| showAsterisk    | boolean                    | false    | Whether to show a red asterisk next to the label (typically for required fields)                                         |
| step            | number                     | 1        | The increment step for the slider value (e.g., step = 5 → 0, 5, 10, ...)                                                 |
| type            | "labels" \| "ticks"        | 'labels' | The type of visual indicator shown below the track. 'labels' shows min/max values, 'ticks' shows evenly spaced tick m... |
| value           | [number, number] \| number | 0        | Current value of the slider. If `range` is true, it should be [min, max]                                                 |

**Events**

| Name     | Detail                     | Description                                                                                                  |
| -------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| tkChange | [number, number] \| number | Emitted when the slider value changes. Emits a number for single mode, or a [min, max] tuple for range mode. |

---

### tk-editor

TkEditor is a WYSIWYG editor component that wraps Tiptap editor.

**Props**

| Name                 | Type                                                | Default | Description                                                         |
| -------------------- | --------------------------------------------------- | ------- | ------------------------------------------------------------------- |
| contentStyle         | CSSProperties                                       | null    | The style attribute of tabs item element                            |
| customToolbarButtons | TkEditorCustomButton[]                              | []      | Custom toolbar buttons for extensions                               |
| disabled             | boolean                                             | false   | Whether the editor is disabled                                      |
| error                | string                                              |         | This is the error message that will be displayed.                   |
| extensions           | AnyExtension[]                                      | []      | Custom extensions                                                   |
| hideToolbar          | boolean                                             | false   | Whether to hide the toolbar                                         |
| hint                 | string                                              |         | Provided a hint or additional information about the input.          |
| invalid              | boolean                                             | false   | Indicates whether the editor is in an invalid state                 |
| label                | string                                              |         | The label for the toggle                                            |
| maxLength            | number                                              | 140     | Limits the number of characters.                                    |
| placeholder          | string                                              |         | The placeholder text when editor is empty                           |
| readonly             | boolean                                             | false   | Whether the editor is readonly                                      |
| resizable            | boolean                                             | false   | Whether the editor is resizable                                     |
| showAsterisk         | boolean                                             | false   | Displays a red asterisk (\*) next to the label for visual emphasis. |
| showCounter          | boolean                                             | false   | Whether to show the character counter                               |
| toolbar              | (TkEditorDefaultButton \| TkEditorCustomButton)[][] |         | Toolbar configuration                                               |
| value                | string                                              | ''      | The value of the editor                                             |

**Events**

| Name      | Detail | Description                         |
| --------- | ------ | ----------------------------------- |
| tk-change | string | Emitted when editor content changes |
| tkBlur    | void   | Emitted when editor loses focus     |
| tkFocus   | void   | Emitted when editor gets focus      |

**Methods**

| Name       | Signature                                                                         | Description                            |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------- |
| getContent | getContent(format?: "json" \| "html" \| "text") => Promise<JSONContent \| string> | Gets the current content of the editor |
| getEditor  | getEditor() => Promise<Editor>                                                    | Returns the Tiptap Editor instance     |
| setContent | setContent(content: string) => Promise<void>                                      | Sets the content of the editor         |

---
