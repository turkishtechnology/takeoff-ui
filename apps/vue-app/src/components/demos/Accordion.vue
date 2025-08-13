<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Accordion Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Accordion -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Accordion</h3>
          <TkAccordion>
            <TkAccordionItem>
              <span slot="header">Panel 1 Title</span>
              <div slot="content">
                <p>This is the content for panel 1. It can contain any HTML content including text, images, or other components.</p>
              </div>
            </TkAccordionItem>
            <TkAccordionItem>
              <span slot="header">Panel 2 Title</span>
              <div slot="content">
                <p>This is the content for panel 2. You can add multiple paragraphs and other elements here.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </TkAccordionItem>
            <TkAccordionItem>
              <span slot="header">Panel 3 Title</span>
              <div slot="content">
                <p>Panel 3 content with a list:</p>
                <ul class="list-disc ml-6 mt-2">
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                </ul>
              </div>
            </TkAccordionItem>
          </TkAccordion>
        </div>

        <!-- Accordion with Icons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Accordion with Icons</h3>
          <TkAccordion expand-icon="add" collapse-icon="remove">
            <TkAccordionItem icon="flight">
              <span slot="header">Flight Information</span>
              <div slot="content">
                <p>Information about flights, schedules, and booking details.</p>
              </div>
            </TkAccordionItem>
            <TkAccordionItem icon="hotel">
              <span slot="header">Hotel Booking</span>
              <div slot="content">
                <p>Hotel reservation details and accommodation information.</p>
              </div>
            </TkAccordionItem>
          </TkAccordion>
        </div>

        <!-- Multiple Selection Accordion -->
        <div>
          <h3 class="text-lg font-medium mb-3">Multiple Selection (Allow Multiple)</h3>
          <TkAccordion :allow-multiple="true" type="divided">
            <TkAccordionItem icon="info">
              <span slot="header">Information Panel</span>
              <div slot="content">
                <p>This accordion allows multiple panels to be open at the same time.</p>
              </div>
            </TkAccordionItem>
            <TkAccordionItem icon="settings">
              <span slot="header">Settings Panel</span>
              <div slot="content">
                <p>Configure your application settings here.</p>
              </div>
            </TkAccordionItem>
            <TkAccordionItem icon="help">
              <span slot="header">Help Panel</span>
              <div slot="content">
                <p>Get help and support information.</p>
              </div>
            </TkAccordionItem>
          </TkAccordion>
        </div>

        <!-- Arrow Position -->
        <div>
          <h3 class="text-lg font-medium mb-3">Arrow Position (Left)</h3>
          <TkAccordion arrow-position="left">
            <TkAccordionItem icon="flight">
              <span slot="header">Panel with Left Arrow</span>
              <div slot="content">
                <p>This accordion has arrows positioned on the left side.</p>
              </div>
            </TkAccordionItem>
            <TkAccordionItem icon="travel">
              <span slot="header">Another Panel</span>
              <div slot="content">
                <p>Notice how the expand/collapse arrows are on the left.</p>
              </div>
            </TkAccordionItem>
          </TkAccordion>
        </div>

        <!-- Grouped vs Divided Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Grouped Type</h3>
          <TkAccordion :allow-multiple="false" type="grouped">
            <TkAccordionItem icon="flight">
              <span slot="header">Grouped Panel 1</span>
              <div slot="content">
                <p>This is a grouped accordion - panels are visually connected.</p>
              </div>
            </TkAccordionItem>
            <TkAccordionItem icon="hotel">
              <span slot="header">Grouped Panel 2</span>
              <div slot="content">
                <p>Only one panel can be open at a time in this configuration.</p>
              </div>
            </TkAccordionItem>
          </TkAccordion>
        </div>

        <!-- Interactive Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Example</h3>
          <p class="text-sm text-gray-600 mb-3">
            Active index: {{ activeIndex }} | Click panels to see the change
          </p>
          <TkAccordion 
            :active-index="activeIndex"
            @tkAccordionItemSelected="handleAccordionChange"
          >
            <TkAccordionItem>
              <span slot="header">Interactive Panel 1</span>
              <div slot="content">
                <p>This panel's state is being tracked. Current active index: {{ activeIndex }}</p>
              </div>
            </TkAccordionItem>
            <TkAccordionItem>
              <span slot="header">Interactive Panel 2</span>
              <div slot="content">
                <p>Click different panels to see how the active index changes.</p>
              </div>
            </TkAccordionItem>
          </TkAccordion>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkAccordion, TkAccordionItem } from '@takeoff-ui/vue';

const activeIndex = ref(null);

const handleAccordionChange = (event) => {
  console.log('Accordion item selected:', event.detail);
  activeIndex.value = event.detail.index;
};
</script>
