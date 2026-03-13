---
applyTo: 'packages/core/**/*.tsx'
---

# Stencil Component Standartları

## İsimlendirme

- **Tag**: `tk-[component]` (dash-case), örn: `tk-button`, `tk-accordion-item`
- **Class**: `Tk[Component]` (PascalCase), örn: `TkButton`, `TkAccordionItem`
- **Element ref**: `@Element() el: HTMLTk[Component]Element`
- **Props/State**: camelCase
- **@Watch**: `[prop]Changed` isimlendirmesi, ilgili @Prop'in hemen ardından
- **@Event**: `tk-[eventType]`, örn: `tk-change`, `tk-selection-change`,
  `tk-active-index-change`
- **Handler metodları**: Tag/component event'lerine bağlanan metodlar.
  İsimlendirme: `handle{elementAdı}{eventAdı}`, örn: `handleButtonClick`,
  `handleInputChange`. Render içinde
  `<button onClick={this.handleButtonClick} />` şeklinde kullanılır.

## Component Header

Component decorator üstünde kısa açıklama, slot bilgileri ve framework import
bilgileri bulunmalı:

```typescript
/**
 * TkButton is an extension to standard input element with icons and theming.
 * @slot default - Button content
 * @react `import { TkButton } from '@takeoff-ui/react'`
 * @vue `import { TkButton } from '@takeoff-ui/vue'`
 * @angular `import { TkButton } from '@takeoff-ui/angular'`
 */
```

## Kod Hiyerarşisi (Sıra)

1. Component decorator + metadata (`@Component({ tag, styleUrl, shadow })`)
2. @Element()
3. constructor()
4. @AttachInternals() (form-associated ise)
5. Statik sabitler / file-level constants
6. Private instance değişkenleri
7. @State()
8. @Prop()
9. @Watch() (ilgili Prop'ın hemen ardından)
10. @Event()
11. @Listen()
12. Public @Method()
13. Lifecycle metodları (componentWillLoad, componentDidLoad, vb.)
14. Private instance metodları
15. handle\* event handler'lar — Tag/component event'lerine bağlanan metodlar.
    İsimlendirme: `handle{elementAdı}{eventAdı}` (örn: `handleButtonClick`).
16. create* factory metodlar — JSX parça döndüren metodlar. İsimlendirme:
    `create{renderEdilecekElement}` (örn: `createOptions`). render* metodları
    içinden çağrılır.
17. render* yardımcı metodlar — render() içinden doğrudan çağrılan, component'in
    ana parçalarını ifade eden metodlar. Prefix olarak `render` içermeli (örn:
    `renderHeader`, `renderBody`). create* metodlar bu render\* metodların
    içinden çağrılır.
18. render()

## Örnek Yapı

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
