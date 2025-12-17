import { TkAccordion, TkAccordionItem} from "@takeoff-ui/react";
import FeatureDemo from '../../../components/FeatureDemo';
import React from "react";

const AllowMultiple = () => {
    const reactCode = `<TkAccordion allowMultiple={true}>
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

    const vueCode = `<tk-accordion :allow-multiple="true">
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

    const angularCode = `<tk-accordion [allowMultiple]="true">
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

    const demo = (
        <TkAccordion allow-multiple="true">
            <TkAccordionItem header="Panel 1">
                <div slot="content">Panel 1 Content</div>
            </TkAccordionItem>
            <TkAccordionItem header="Panel 2">
                <div slot="content"> Panel 2 Content</div>
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

export default AllowMultiple;