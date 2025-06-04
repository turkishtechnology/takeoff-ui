import {
  showPersistentToast,
  isPersistentToastVisible,
  dismissAllPersistentToasts,
  IToast,
} from '@takeoff-ui/core';
import { TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
  const handlePersistentToast = () => {
    const isOpen = showPersistentToast({
      persistentId: 'my-persistent-toast',
      position: 'top-right',
      header: 'Persistent Toast',
      message:
        'This toast can be toggled. Click the same button again to close it.',
      variant: 'info',
      type: 'outlined',
      removable: true,
      actions: [
        {
          label: 'Custom Action',
          icon: 'settings',
          type: 'text',
          variant: 'info',
          action: () => {
            alert('Custom action clicked!');
          },
        },
      ],
    } as IToast & { persistentId: string });

    console.log(isOpen ? 'Toast opened' : 'Toast closed');
  };

  const handleCheckStatus = () => {
    const isVisible = isPersistentToastVisible('my-persistent-toast');
    alert(`Toast status: ${isVisible ? 'Visible' : 'Hidden'}`);
  };

  const handleDismissAll = () => {
    dismissAllPersistentToasts();
  };

  const handleMultiplePersistent = (
    position: string,
    variant: string,
    id: string,
  ) => {
    showPersistentToast({
      persistentId: id,
      position: position,
      header: `${variant.toUpperCase()} Persistent Toast`,
      message: `This is a ${variant} persistent toast at ${position} position.`,
      variant: variant,
      type: 'filled',
      removable: true,
    } as IToast & { persistentId: string });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <TkButton
          label="Show/Hide Toast"
          icon="visibility"
          variant="info"
          onTkClick={handlePersistentToast}
        />
        <TkButton
          label="Check Status"
          icon="help"
          variant="neutral"
          type="outlined"
          onTkClick={handleCheckStatus}
        />
        <TkButton
          label="Dismiss All"
          icon="close"
          variant="danger"
          type="text"
          onTkClick={handleDismissAll}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>Multiple Persistent:</span>
        <TkButton
          icon="north_west"
          variant="success"
          onTkClick={() =>
            handleMultiplePersistent(
              'top-left',
              'success',
              'persistent-success',
            )
          }
        />
        <TkButton
          icon="north_east"
          variant="info"
          onTkClick={() =>
            handleMultiplePersistent('top-right', 'info', 'persistent-info')
          }
        />
        <TkButton
          icon="south_west"
          variant="warning"
          onTkClick={() =>
            handleMultiplePersistent(
              'bottom-left',
              'warning',
              'persistent-warning',
            )
          }
        />
        <TkButton
          icon="south_east"
          variant="danger"
          onTkClick={() =>
            handleMultiplePersistent(
              'bottom-right',
              'danger',
              'persistent-danger',
            )
          }
        />
      </div>
    </div>
  );
};

const PersistentToaster = () => {
  const reactCode = `import { showPersistentToast, isPersistentToastVisible, dismissAllPersistentToasts } from "@takeoff-ui/core";
  
const handlePersistentToast = () => {
  const isOpen = showPersistentToast({
    persistentId: "my-persistent-toast",
    position: "top-right",
    header: "Persistent Toast",
    message: "This toast can be toggled. Click the same button again to close it.",
    variant: "info",
    type: "outlined",
    removable: true,
    actions: [
      {
        label: "Custom Action",
        icon: "settings",
        type: "text",
        variant: "info",
        action: () => {
          alert("Custom action clicked!");
        },
      },
    ],
  });
  
  console.log(isOpen ? "Toast opened" : "Toast closed");
};

const handleCheckStatus = () => {
  const isVisible = isPersistentToastVisible("my-persistent-toast");
  alert(\`Toast status: \${isVisible ? "Visible" : "Hidden"}\`);
};

const handleDismissAll = () => {
  dismissAllPersistentToasts();
};

return (
  <div>
    <TkButton
      label="Show/Hide Toast"
      icon="visibility"
      variant="info"
      onTkClick={handlePersistentToast}
    />
    <TkButton
      label="Check Status"
      icon="help"
      variant="neutral"
      type="outlined"
      onTkClick={handleCheckStatus}
    />
    <TkButton
      label="Dismiss All"
      icon="close"
      variant="danger"
      type="text"
      onTkClick={handleDismissAll}
    />
  </div>
);`;

  const vueCode = `<script setup>
import { TkButton } from '@takeoff-ui/vue';
import { showPersistentToast, isPersistentToastVisible, dismissAllPersistentToasts } from "@takeoff-ui/core";

const handlePersistentToast = () => {
  const isOpen = showPersistentToast({
    persistentId: "my-persistent-toast",
    position: "top-right",
    header: "Persistent Toast",
    message: "This toast can be toggled. Click the same button again to close it.",
    variant: "info",
    type: "outlined",
    removable: true,
    actions: [
      {
        label: "Custom Action",
        icon: "settings",
        type: "text",
        variant: "info",
        action: () => {
          alert("Custom action clicked!");
        },
      },
    ],
  });
  
  console.log(isOpen ? "Toast opened" : "Toast closed");
};

const handleCheckStatus = () => {
  const isVisible = isPersistentToastVisible("my-persistent-toast");
  alert(\`Toast status: \${isVisible ? "Visible" : "Hidden"}\`);
};

const handleDismissAll = () => {
  dismissAllPersistentToasts();
};
</script>

<template>
  <div>
    <TkButton
      label="Show/Hide Toast"
      icon="visibility"
      variant="info"
      @tkClick="handlePersistentToast"
    />
    <TkButton
      label="Check Status"
      icon="help"
      variant="neutral"
      type="outlined"
      @tkClick="handleCheckStatus"
    />
    <TkButton
      label="Dismiss All"
      icon="close"
      variant="danger"
      type="text"
      @tkClick="handleDismissAll"
    />
  </div>
</template>`;

  const angularCode = `import { Component } from '@angular/core';
import { showPersistentToast, isPersistentToastVisible, dismissAllPersistentToasts } from '@takeoff-ui/core';
  
  @Component({
    selector: 'app-root',
    template: \`
      <div>
        <tk-button
          label="Show/Hide Toast"
          icon="visibility"
          variant="info"
          (tk-click)="handlePersistentToast()"
        ></tk-button>
        <tk-button
          label="Check Status"
          icon="help"
          variant="neutral"
          type="outlined"
          (tk-click)="handleCheckStatus()"
        ></tk-button>
        <tk-button
          label="Dismiss All"
          icon="close"
          variant="danger"
          type="text"
          (tk-click)="handleDismissAll()"
        ></tk-button>
      </div>
    \`,
  })
  export class AppComponent {
    handlePersistentToast() {
      const isOpen = showPersistentToast({
        persistentId: "my-persistent-toast",
        position: "top-right",
        header: "Persistent Toast",
        message: "This toast can be toggled. Click the same button again to close it.",
        variant: "info",
        type: "outlined",
        removable: true,
        actions: [
          {
            label: "Custom Action",
            icon: "settings",
            type: "text",
            variant: "info",
            action: () => {
              alert("Custom action clicked!");
            },
          },
        ],
      });
      
      console.log(isOpen ? "Toast opened" : "Toast closed");
    }

    handleCheckStatus() {
      const isVisible = isPersistentToastVisible("my-persistent-toast");
      alert(\`Toast status: \${isVisible ? "Visible" : "Hidden"}\`);
    }

    handleDismissAll() {
      dismissAllPersistentToasts();
    }
  }`;

  const demo = <Example />;

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default PersistentToaster;
