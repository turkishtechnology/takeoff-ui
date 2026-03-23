---
applyTo: 'packages/core/**/*.tsx'
---

# Stencil Component Standards

## Naming Conventions

- **Tag**: `tk-[component]` (dash-case), e.g: `tk-button`, `tk-accordion-item`
- **Class**: `Tk[Component]` (PascalCase), e.g: `TkButton`, `TkAccordionItem`
- **Element ref**: `@Element() el: HTMLTk[Component]Element`
- **Props/State**: camelCase
- **@Watch**: `[prop]Changed` naming, right after the related @Prop
- **@Event**: `tk-[eventType]`, e.g: `tk-change`, `tk-selection-change`,
  `tk-active-index-change`
- **Handler methods**: Methods that are bound to tag/component events. Naming:
  `handle{elementName}{eventName}`, e.g: `handleButtonClick`,
  `handleInputChange`. Inside the render, it is used as
  `<button onClick={this.handleButtonClick} />`.

## Component Header

The component decorator should contain a brief description, slot information,
and framework import information:

```typescript
/**
 * TkButton is an extension to standard input element with icons and theming.
 * @slot default - Button content
 * @react `import { TkButton } from '@takeoff-ui/react'`
 * @vue `import { TkButton } from '@takeoff-ui/vue'`
 * @angular `import { TkButton } from '@takeoff-ui/angular'`
 */
```

## Code Hierarchy (Order)

1. Component decorator + metadata (`@Component({ tag, styleUrl, shadow })`)
2. @Element()
3. constructor()
4. @AttachInternals() (if form-associated)
5. Static constants / file-level constants
6. Private instance variables
7. @State()
8. @Prop()
9. @Watch() (right after the relevant @Prop)
10. @Event()
11. @Listen()
12. Public @Method()
13. Lifecycle methods (componentWillLoad, componentDidLoad, etc.)
14. Private instance methods
15. handle\* event handlers — Methods that are bound to tag/component events.
    Naming convention: `handle{elementName}{eventName}` (e.g:
    `handleButtonClick`).
16. create* factory methods — Methods that return JSX fragments. Naming
    convention: `create{elementToRender}` (e.g: `createOptions`). Called inside
    render* methods.
17. render* helper methods — Methods called directly from render() and represent
    the main parts of the component. They must include the prefix `render`
    (e.g., `renderHeader`, `renderBody`). The create* methods are called from
    within these render\* methods.
18. render()

## Example Structure

```typescript
@Component({ tag: 'tk-button', styleUrl: 'tk-button.scss', shadow: true })
export class TkButton implements ComponentInterface {
  @Element() el: HTMLTkButtonElement;
  @Prop() disabled: boolean;
  @Prop() label: string = '';
  @Event({ eventName: 'tk-click' }) tkClick!: EventEmitter<MouseEvent>;
  private handleButtonClick(e: MouseEvent) { /* ... */ }
  private createIcon() { return <tk-icon />; }
  private renderHeader() { return <div>{this.createIcon()}</div>; }
  render() { return <button onClick={this.handleButtonClick}>{this.renderHeader()}</button>; }
}
```
