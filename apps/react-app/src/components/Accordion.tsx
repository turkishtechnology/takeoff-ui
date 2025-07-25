import { TkCard, TkAccordion, TkAccordionItem, TkInput } from '@takeoff-ui/react';
import { useState } from 'react';

function Accordion() {
  const [inputValue3, setInputValue3] = useState();
  const expandIcon = { name: 'add', fill: true };
  const collapseIcon = { name: 'remove', fill: true };
  return (
    <TkCard>
      <TkAccordion
        // activeIndex={0}
        expandIcon={expandIcon}
        collapseIcon={collapseIcon}
        // expandIcon={"add"}
        // collapseIcon="remove"
      >
        <TkAccordionItem header="test">
          <p slot="content">content</p>
        </TkAccordionItem>
        <TkAccordionItem header="test 1">
          <p slot="content">content 1</p>
        </TkAccordionItem>
        <TkAccordionItem header="test 2">
          <div slot="content">
            <TkInput label="test" value={inputValue3} onTkChange={e => setInputValue3(e.detail)} />
          </div>
        </TkAccordionItem>
      </TkAccordion>
    </TkCard>
  );
}

export default Accordion;
