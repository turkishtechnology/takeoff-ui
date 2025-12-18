import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const ActiveIndex = () => {
  const reactCode = `const [active,setActive] = useState([0, 1])
<TkAccordion 
  allowMultiple={true}  
  activeIndex={active} 
  onTkActiveIndexChange={(e: CustomEvent) => setActive(e.detail)}
>
  <TkAccordionItem header="Panel 1">
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem header="Panel 2">
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem header="Panel 3">
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const vueCode = `const active = ref([0, 1])
  <tk-accordion 
  :allow-multiple="true" 
  :active-index="active" 
  @tk-active-index-change="(e) => active = e.detail"
>
  <tk-accordion-item header="Panel 1">
    <div slot="content">Panel 1 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Panel 2">
    <div slot="content">Panel 2 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Panel 3">
    <div slot="content">Panel 3 Content</div>
  </tk-accordion-item>
</tk-accordion>`;

  const angularCode = `active = [0, 1];
onActiveIndexChange(e: CustomEvent) {
  this.active = e.detail;
}
<tk-accordion 
  [allowMultiple]="true" 
  [activeIndex]="active" 
  (tkActiveIndexChange)="onActiveIndexChange($event)"
>
  <tk-accordion-item header="Panel 1">
    <div slot="content">Panel 1 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Panel 2">
    <div slot="content">Panel 2 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Panel 3">
    <div slot="content">Panel 3 Content</div>
  </tk-accordion-item>
</tk-accordion>`;

  const [active, setActive] = useState([0, 1]);
  const demo = (
    <TkAccordion allowMultiple={true} activeIndex={active} onTkActiveIndexChange={(e: CustomEvent) => setActive(e.detail)}>
      <TkAccordionItem header="Panel 1">
        <div slot="content">Panel 1 Content</div>
      </TkAccordionItem>
      <TkAccordionItem header="Panel 2">
        <div slot="content">Panel 2 Content</div>
      </TkAccordionItem>
      <TkAccordionItem header="Panel 3">
        <div slot="content">Panel 3 Content</div>
      </TkAccordionItem>
    </TkAccordion>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default ActiveIndex;
