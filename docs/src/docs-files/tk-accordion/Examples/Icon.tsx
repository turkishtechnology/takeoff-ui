import { TkAccordion, TkAccordionItem} from "@takeoff-ui/react";
import FeatureDemo from '../../../components/FeatureDemo';
import React from "react";

const Icon = () => {
    const reactCode = `<TkAccordion>
  <TkAccordionItem header="Panel 1" icon="home">
    <div slot="content">hello</div>
  </TkAccordionItem>
  <TkAccordionItem header="Panel 2" icon={{ name: 'home', fill: true, color: 'red' }}>
    <div slot="content">merhaba</div>
  </TkAccordionItem>
  <TkAccordionItem header="Panel 3">
    <div slot="content">hallo</div>
  </TkAccordionItem>
</TkAccordion>`;

    const vueCode = `<tk-accordion>
  <tk-accordion-item header="Panel 1" icon="home">
    <div slot="content">Panel 1 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Panel 2" :icon="{ name: 'home', fill: true, color: 'red' }">
    <div slot="content">Panel 2 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Panel 3">
    <div slot="content">Panel 3 Content</div>
  </tk-accordion-item>
</tk-accordion>`;

    const angularCode = `<tk-accordion>
  <tk-accordion-item header="Panel 1" icon="home">
    <div slot="content">Panel 1 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Panel 2" [icon]="{ name: 'home', fill: true, color: 'red' }">
    <div slot="content">Panel 2 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Panel 3">
    <div slot="content">Panel 3 Content</div>
  </tk-accordion-item>
</tk-accordion>`;

    const demo = (
        <TkAccordion>
            <TkAccordionItem header="Panel 1" icon="home">
                <div slot="content">Panel 1 Content</div>
            </TkAccordionItem>
            <TkAccordionItem header="Panel 2" icon={{ name: 'home', fill: true, color:'red'}}>
                <div slot="content">Panel 2 Content</div>
            </TkAccordionItem>
            <TkAccordionItem header="Panel 3">
                <div slot="content">Panel 3 Content</div>
            </TkAccordionItem>
        </TkAccordion>

    );
    return (
    <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>
);
};

export default Icon;