import React from 'react';
import { TkTabs, TkTabsItem, TkAccordion, TkAccordionItem } from '@takeoff-ui/react';

export default function Contributors() {
  return (
    <section>
      <div className="container">
        <h1>FAQs</h1>
        <p style={{ color: 'var(--text-base)' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos similique laborum sint quibusdam, quisquam aperiam ducimus dolore doloribus, tempora ullam minus odit
          officia error voluptatibus eveniet, necessitatibus numquam. Itaque, natus.
        </p>
        <TkTabs type="compact" size="large" spreadHeaders>
          <TkTabsItem label="installation" icon="download">
            <TkAccordion allow-multiple="true" type="grouped">
              <TkAccordionItem icon="help" size="large">
                <span slot="header">Question:</span>
                <div slot="content">Answer:</div>
              </TkAccordionItem>
              <TkAccordionItem icon="help" size="large">
                <span slot="header">Question:</span>
                <div slot="content">Answer:</div>
              </TkAccordionItem>
              <TkAccordionItem icon="help" size="large">
                <span slot="header">Question:</span>
                <div slot="content">Answer:</div>
              </TkAccordionItem>
            </TkAccordion>
          </TkTabsItem>
          <TkTabsItem label="tailwind plugin" icon="extension">
            <TkAccordion allow-multiple="true" type="grouped">
              <TkAccordionItem icon="help" size="large">
                <span slot="header">Question:</span>
                <div slot="content">Answer:</div>
              </TkAccordionItem>
              <TkAccordionItem icon="help" size="large">
                <span slot="header">Question:</span>
                <div slot="content">Answer:</div>
              </TkAccordionItem>
            </TkAccordion>
          </TkTabsItem>
        </TkTabs>
        <a href="faqs"> Click here</a> to see more questions.
      </div>
    </section>
  );
}
