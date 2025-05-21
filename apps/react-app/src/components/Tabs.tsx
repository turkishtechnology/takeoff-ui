import { useState } from 'react';
import { TkTabs, TkTabsItem } from '@takeoff-ui/react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TkTabs activeIndex={activeTab}>
      <TkTabsItem
        label="Home"
        tooltipOptions={{
          description: 'Navigate to home page',
          position: 'right',
          icon: 'home',
        }}
      >
        <div>Home Content</div>
      </TkTabsItem>

      <TkTabsItem
        label="Profile"
        tooltipOptions={{
          header: 'Profile Tab',
          description: 'View your profile',
          position: 'bottom',
          icon: {
            name: 'person',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Profile Content</div>
      </TkTabsItem>

      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
      <TkTabsItem
        label="Settings"
        icon="settings"
        tooltipOptions={{
          header: 'Settings Tab',
          description: 'Configure your settings',
          position: 'bottom',
          icon: {
            name: 'settings',
            color: 'black',
            style: 'sharp',
            fill: false,
          },
        }}
      >
        <div>Settings Content</div>
      </TkTabsItem>
    </TkTabs>
  );
};

export default Tabs;
