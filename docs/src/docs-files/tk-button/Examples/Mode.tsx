import { TkButton } from '@takeoff-ui/react';
import { TkInput } from '@takeoff-ui/react';
import { showPersistentToast, isPersistentToastVisible, dismissAllPersistentToasts, IToast } from '@takeoff-ui/core';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Mode = () => {
  const reactCode = `import { TkButton, TkInput } from '@takeoff-ui/react';
  import { showPersistentToast, IToast } from '@takeoff-ui/core';
  import React from 'react';
  
  const handleMultiplePersistent = (position: string, variant: string, id: string) => {
    showPersistentToast({
      persistentId: id,
      position: position,
      header: \`\${variant.toUpperCase()} Persistent Toast\`,
      message: \`Your form submitted successfully.\`,
      variant: variant,
      type: 'filled',
      removable: true,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleMultiplePersistent('top-right', 'info', 'persistent-info');
  };
  
  const ExampleForm = (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="flex flex-col gap-2">
          <TkInput label="Name" size="small" />
          <TkInput label="Surname" size="small" />
          <TkInput label="Password" mode="password" size="small" />
        </div>
        <div className="flex flex-row justify-center gap-8">
          <TkButton mode="reset" label="Reset" />
          <TkButton mode="submit" label="Submit" />
        </div>
      </div>
    </form>
  );
  
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="basis-1/5">
        <TkButton mode="button" label="Button" />
      </div>
      <div className="basis-1/5">
        <TkButton 
          mode="link" 
          label="Link" 
          href="https://github.com/turkishtechnology/takeoff-ui" 
          target="_blank" 
        />
      </div>
      <div className="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-gray-300"></div>
      <div className="basis-3/5">{ExampleForm}</div>
    </div>
  );`;

  const vueCode = `<script setup>
  import { TkButton, TkInput } from '@takeoff-ui/vue';
  import { showPersistentToast } from '@takeoff-ui/core';
  
  const handleMultiplePersistent = (position, variant, id) => {
    showPersistentToast({
      persistentId: id,
      position: position,
      header: \`\${variant.toUpperCase()} Persistent Toast\`,
      message: \`Your form submitted successfully.\`,
      variant: variant,
      type: 'filled',
      removable: true,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleMultiplePersistent('top-right', 'info', 'persistent-info');
  };
  </script>
  
  <template>
    <div class="flex flex-row items-center gap-4">
      <div class="basis-1/5">
        <TkButton mode="button" label="Button" />
      </div>
      <div class="basis-1/5">
        <TkButton 
          mode="link" 
          label="Link" 
          href="https://github.com/turkishtechnology/takeoff-ui" 
          target="_blank" 
        />
      </div>
      <div class="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-gray-300"></div>
      <div class="basis-3/5">
        <form @submit="handleSubmit">
          <div class="flex flex-col flex-wrap gap-2">
            <div class="flex flex-col gap-2">
              <TkInput label="Name" size="small" />
              <TkInput label="Surname" size="small" />
              <TkInput label="Password" mode="password" size="small" />
            </div>
            <div class="flex flex-row justify-center gap-8">
              <TkButton mode="reset" label="Reset" />
              <TkButton mode="submit" label="Submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>`;

  const angularCode = `import { Component } from '@angular/core';
  import { showPersistentToast } from '@takeoff-ui/core';
  
  @Component({
    selector: 'app-button-mode',
    template: \`
      <div class="flex flex-row items-center gap-4">
        <div class="basis-1/5">
          <tk-button mode="button" label="Button"></tk-button>
        </div>
        <div class="basis-1/5">
          <tk-button 
            mode="link" 
            label="Link" 
            href="https://github.com/turkishtechnology/takeoff-ui" 
            target="_blank">
          </tk-button>
        </div>
        <div class="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-gray-300"></div>
        <div class="basis-3/5">
          <form (submit)="handleSubmit($event)">
            <div class="flex flex-col flex-wrap gap-2">
              <div class="flex flex-col gap-2">
                <tk-input label="Name" size="small"></tk-input>
                <tk-input label="Surname" size="small"></tk-input>
                <tk-input label="Password" mode="password" size="small"></tk-input>
              </div>
              <div class="flex flex-row justify-center gap-8">
                <tk-button mode="reset" label="Reset"></tk-button>
                <tk-button mode="submit" label="Submit"></tk-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    \`,
  })
  export class ButtonModeComponent {
    handleMultiplePersistent(position: string, variant: string, id: string) {
      showPersistentToast({
        persistentId: id,
        position: position,
        header: \`\${variant.toUpperCase()} Persistent Toast\`,
        message: \`Your form submitted successfully.\`,
        variant: variant,
        type: 'filled',
        removable: true,
      });
    }
  
    handleSubmit(e: Event) {
      e.preventDefault();
      this.handleMultiplePersistent('top-right', 'info', 'persistent-info');
    }
  }`;

  const handleMultiplePersistent = (position: string, variant: string, id: string) => {
    showPersistentToast({
      persistentId: id,
      position: position,
      header: `${variant.toUpperCase()} Persistent Toast`,
      message: `Your form submitted succesfully.`,
      variant: variant,
      type: 'filled',
      removable: true,
    } as IToast & { persistentId: string });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleMultiplePersistent('top-right', 'info', 'persistent-info');
  };

  const ExampleForm = (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="flex flex-col gap-2">
          <TkInput label="Name" size="small"></TkInput>
          <TkInput label="Surname" size="small"></TkInput>
          <TkInput label="Password" mode="password" size="small"></TkInput>
        </div>
        <div className="flex flex-row justify-center gap-8">
          <TkButton mode="reset" label="Reset"></TkButton>
          <TkButton mode="submit" label="Submit"></TkButton>
        </div>
      </div>
    </form>
  );

  const demo = (
    <div className="flex flex-row items-center gap-4">
      <div className="basis-1/5">
        <TkButton mode="button" label="Button"></TkButton>
      </div>
      <div className="basis-1/5">
        <TkButton mode="link" label="Link" href="https://github.com/turkishtechnology/takeoff-ui" target="_blank"></TkButton>
      </div>
      <div className="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-gray-300"></div>
      <div className="basis-3/5">{ExampleForm}</div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Mode;
