import { createToast, IToast } from '@takeoff-ui/core';
import { TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
  const handleCreateToast = (position: string, variant: string) => {
    createToast({
      position: position,
      header: 'Deneme Başlık',
      alignItems: 'start',
      message: 'Bu bir deneme mesajıdır. Dikkate almayınız.',
      variant: variant,
      type: 'outlined',
      timeout: 10000,
      removable: true,
      actions: [
        {
          label: 'Action 1',
          icon: 'flight',
          type: 'outlined',
          variant: 'secondary',
          action: () => {
            alert('action 1 clicked');
          },
        },
        {
          label: 'Action 2',
          icon: 'flight',
          type: 'filled',
          variant: 'primary',
          action: () => {
            alert('action 2 clicked');
          },
        },
      ],
    } as IToast);
  };

  return (
    <>
      <TkButton icon="north_west" variant="success" onTkClick={() => handleCreateToast('top-left', 'success')} />
      &nbsp;
      <TkButton icon="north_east" variant="info" onTkClick={() => handleCreateToast('top-right', 'info')} />
      &nbsp;
      <TkButton icon="south_west" variant="warning" onTkClick={() => handleCreateToast('bottom-left', 'warning')} />
      &nbsp;
      <TkButton icon="south_east" variant="danger" onTkClick={() => handleCreateToast('bottom-right', 'danger')} />
    </>
  );
};

const Toaster = () => {
  const reactCode = `import { createToast } from "@takeoff-ui/core";
  
const handleCreateToast = (position: string, variant: 'success' | 'warning' | 'info' | 'danger' | 'neutral') => {
    createToast({
      position: position,
      header: "Deneme Başlık",
      alignItems: 'start',
      message: "Bu bir deneme mesajıdır. Dikkate almayınız.",
      variant: variant,
      type: "filled",
      timeout: 10000,
      removable: true,
            actions: [
        {
          label: "Action 1",
          icon: "flight",
          type: "outlined",
          variant: "secondary",
          action: () => {
            alert("action 1 clicked");
          },
        },
        {
          label: "Action 2",
          icon: "flight",
          type: "filled",
          variant: "primary",
          action: () => {
            alert("action 2 clicked");
          },
        },
      ],
    });
  };
  return (
    <>
      <TkButton
        icon="north_west"
        variant="success"
        onTkClick={() => handleCreateToast("top-left", "success")}
      />
      &nbsp;
      <TkButton
        icon="north_east"
        variant="info"
        onTkClick={() => handleCreateToast("top-right", "info")}
      />
         &nbsp;
      <TkButton
        icon="south_west"
        variant="warning"
        onTkClick={() => handleCreateToast("bottom-left", "warning")}
      />
      &nbsp;
      <TkButton
        icon="south_east"
        variant="danger"
        onTkClick={() => handleCreateToast("bottom-right", "danger")}
      />
    </>
  );`;

  const vueCode = `<script setup>
import { TkButton } from '@takeoff-ui/vue';
import { createToast } from "@takeoff-ui/core";

const handleCreateToast = (position, variant) => {
  createToast({
    position: position,
    header: "Deneme Başlık",
    alignItems: 'start',
    message: "Bu bir deneme mesajıdır. Dikkate almayınız.",
    variant: variant,
    type: "filled",
    timeout: 10000,
    removable: true,
          actions: [
        {
          label: "Action 1",
          icon: "flight",
          type: "outlined",
          variant: "secondary",
          action: () => {
            alert("action 1 clicked");
          },
        },
        {
          label: "Action 2",
          icon: "flight",
          type: "filled",
          variant: "primary",
          action: () => {
            alert("action 2 clicked");
          },
        },
      ],
  });
};


</script>

<template>
  <TkButton icon="north_west" variant="success" @tkClick="handleCreateToast('top-left', 'success')" />
  <TkButton icon="north_east" variant="info" @tkClick="handleCreateToast('top-right', 'info')" />
  <TkButton icon="south_west" variant="warning" @tkClick="handleCreateToast('bottom-left', 'warning')" />
  <TkButton icon="south_east" variant="danger" @tkClick="handleCreateToast('bottom-right', 'danger')" />
</template>
`;

  const angularCode = `import { Component } from '@angular/core';
import { createToast } from '@takeoff-ui/core';
  
  @Component({
    selector: 'app-root',
    template: \`
      <tk-button
        icon="north_west"
        variant="success"
        (tk-click)="handleCreateToast('top-left', 'success')"
      ></tk-button>
      &nbsp;
      <tk-button
        icon="north_east"
        variant="info"
        (tk-click)="handleCreateToast('top-right', 'info')"
      ></tk-button>
      &nbsp;
      <tk-button
        icon="south_west"
        variant="warning"
        (tk-click)="handleCreateToast('bottom-left', 'warning')"
      ></tk-button>
      &nbsp;
      <tk-button
        icon="south_east"
        variant="danger"
        (tk-click)="handleCreateToast('bottom-right', 'danger')"
      ></tk-button>
    \`,
  })
  export class AppComponent {
    handleCreateToast(position: string, variant: 'success' | 'warning' | 'info' | 'danger' | 'neutral') {
      createToast({
        position,
        header: 'Deneme Başlık',
        alignItems: 'start',
        message: 'Bu bir deneme mesajıdır. Dikkate almayınız.',
        variant: variant,
        type: 'filled',
        timeout: 10000,
        removable: true,
        actions: [
          {
            label: 'Action 1',
            icon: 'flight',
            type: 'outlined',
            variant: 'secondary',
            action: () => {
              alert('action 1 clicked');
            },
          },
          {
            label: 'Action 2',
            icon: 'flight',
            type: 'filled',
            variant: 'primary',
            action: () => {
              alert('action 2 clicked');
            },
          },
        ],
      });
    }
  }`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Toaster;
