import React, { useState } from 'react';
import {
  TkDrawer,
  TkButton,
  TkTabs,
  TkTabsItem,
  TkBadge,
} from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const demoStyles = `.notification-panel-header {
    display: flex;
    padding: 16px;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.notification-panel-header .header-title {
    color: var(--text-darkest, #222530);
    /* Body/Base-16 */
    font-family: var(--body-m-base-font, Geologica);
    font-size: var(--body-m-base-size, 16px);
    font-style: normal;
    font-weight: 400;
    line-height: var(--body-m-base-line-height, 24px);
    /* 150% */
}

.notification-panel-header .header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
}

.notification-container {
    display: flex;
    padding: var(--notification-body-v-padding, 12px) var(--notification-body-h-padding, 16px);
    align-items: flex-start;
    gap: var(--notification-body-gap, 8px);
    align-self: stretch;
    border-bottom: var(--spacing-px, 1px) solid var(--border-light, #E1E4EA);
}

.notification-container .notification-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: var(--toast-base-content-gap, 8px);
    flex: 1 0 0;
    align-self: stretch;
}

.notification-container .notification-content .message-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
}

.notification-container .notification-content .message-container .message-header {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
}

.notification-container .notification-content .message-container .message-header .message-header-start {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 0;
}

.notification-container .notification-content .message-container .message-header .message-header-start .message-date {
    color: var(--text-sub-base, #99A0AE);
    /* Subheading/2x-Small-10 */
    font-family: var(--subheading-2xs-font, Geologica);
    font-size: var(--subheading-2xs-size, 11px);
    font-style: normal;
    font-weight: 300;
    line-height: var(--subheading-2xs-line-height, 16px);
    /* 145.455% */
    text-transform: uppercase;
}

.notification-container .notification-content .message-container .message-header .message-header-start .message-title {
    color: var(--text-darkest, #222530);
    /* Body/Small-14 */
    font-family: var(--body-s-font, Geologica);
    font-size: var(--body-s-size, 14px);
    font-style: normal;
    font-weight: 400;
    line-height: var(--body-s-line-height, 20px);
    /* 142.857% */
}

.notification-container .notification-content .message-container .message-text {
    color: var(--text-dark, #525866);
    /* Body/X-Small-12 */
    font-family: var(--body-xs-font, Geologica);
    font-size: var(--body-xs-size, 12px);
    font-style: normal;
    font-weight: 300;
    line-height: var(--body-xs-line-height, 18px);
    /* 150% */
    text-align: left;
}

.notification-container .notification-content .message-container .message-action {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.notification-container .notification-end {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
}`;

const CustomContent = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const reactCode = `<TkButton label="Open Custom Drawer" onTkClick={() => setShowDrawer(true)} />
  <TkDrawer
      open={showDrawer}
      header="Settings"
      onTkDrawerClose={() => setShowDrawer(false)}
  >
      <div slot="container">
          <div className="notification-panel-header">
              <span className="header-title">Notification</span>
              <div className="header-actions">
                  <TkButton variant="neutral" icon="more_vert" size="small" type="text"></TkButton>
                  <TkButton variant="neutral" icon="close" size="small" type="text" onTkClick={() => setShowDrawer(false)}></TkButton>
              </div>
          </div>
          <TkTabs
              orientation="horizontal"
              size="base"
              tab-style="basic"
              variant="primary"
              is-closable="false"
              default-active-index="0"
              is-extendable="false"
          >
              <TkTabsItem slot="tab-content-0" label="All" badgeLabel="01" badged>
                  <div className="notification-container">
                      <div className="notification-content">
                          <div className="message-container">
                              <div className="message-header">
                                  <div className="message-header-start">
                                      <div className="message-date">14 april 2024</div>
                                      <div className="message-title">Header Text</div>
                                  </div>
                                  <div className="message-header-end">
                                      <TkBadge label="New" variant="info" type="filledlight"></TkBadge>
                                  </div>
                              </div>
                              <p className="message-text">
                                  Lorem Ipsum dolor sit amet consiquences.
                              </p>
                          </div>
                          <div className="message-action">
                              <TkButton variant="info" label="Action" type="text"></TkButton>
                          </div>
                      </div>
                      <div className="notification-end">
                          <TkButton variant="neutral" size="small" icon="more_vert" type="text"></TkButton>
                      </div>
                  </div>
              </TkTabsItem>
              <TkTabsItem label="New" badgeLabel="03" badged></TkTabsItem>
              <TkTabsItem label="Unreaded" badgeLabel="03" badged></TkTabsItem>
          </TkTabs>
      </div>
  </TkDrawer>`;

  const vueCode = `<script setup>
import {
  TkDrawer,
  TkButton,
  TkTabs,
  TkTabsItem,
  TkBadge,
} from '@takeoff-ui/vue';
import { ref } from 'vue';

const showDrawer = ref(false);
</script>

<template>
  <TkButton label="Open Custom Drawer" @tkClick="showDrawer = true" />
  <TkDrawer
    header="Settings"
    :open="showDrawer"
    @tkDrawerClose="() => (showDrawer = false)"
  >
    <div slot="container">
      <div className="notification-panel-header">
        <span className="header-title">Notification</span>
        <div className="header-actions">
          <TkButton
            variant="neutral"
            icon="more_vert"
            size="small"
            type="text"
          ></TkButton>
          <TkButton
            variant="neutral"
            icon="close"
            size="small"
            type="text"
            @tkClick="showDrawer = false"
          ></TkButton>
        </div>
      </div>
      <TkTabs
        orientation="horizontal"
        size="base"
        tab-style="basic"
        variant="primary"
        is-closable="false"
        default-active-index="0"
        :is-extendable="false"
      >
        <TkTabsItem label="All">
          <div className="notification-container">
            <div className="notification-content">
              <div className="message-container">
                <div className="message-header">
                  <div className="message-header-start">
                    <div className="message-date">14 april 2024</div>
                    <div className="message-title">Header Text</div>
                  </div>
                  <div className="message-header-end">
                    <TkBadge
                      label="New"
                      variant="info"
                      type="filledlight"
                    ></TkBadge>
                  </div>
                </div>
                <p className="message-text">
                  Lorem Ipsum dolor sit amet consiquences.
                </p>
              </div>
              <div className="message-action">
                <TkButton variant="info" label="Action" type="text"></TkButton>
              </div>
            </div>
            <div className="notification-end">
              <TkButton
                variant="neutral"
                size="small"
                icon="more_vert"
                type="text"
              ></TkButton>
            </div>
          </div>
        </TkTabsItem>
        <TkTabsItem label="New"></TkTabsItem>
        <TkTabsItem label="Unreaded"></TkTabsItem>
      </TkTabs>
    </div>
  </TkDrawer>
</template>

<style>
${demoStyles}
</style>`;

  const demo = (
    <>
      <TkButton
        label="Open Custom Drawer"
        onTkClick={() => setShowDrawer(true)}
      />
      <TkDrawer
        open={showDrawer}
        header="Settings"
        onTkDrawerClose={() => setShowDrawer(false)}
      >
        <div slot="container">
          <div className="notification-panel-header">
            <span className="header-title">Notification</span>
            <div className="header-actions">
              <TkButton
                variant="neutral"
                icon="more_vert"
                size="small"
                type="text"
              ></TkButton>
              <TkButton
                variant="neutral"
                icon="close"
                size="small"
                type="text"
                onTkClick={() => setShowDrawer(false)}
              ></TkButton>
            </div>
          </div>
          <TkTabs
            orientation="horizontal"
            size="base"
            tab-style="basic"
            variant="primary"
            is-closable="false"
            default-active-index="0"
            is-extendable="false"
          >
            <TkTabsItem slot="tab-content-0" label="All" badgeLabel="01" badged>
              <div className="notification-container">
                <div className="notification-content">
                  <div className="message-container">
                    <div className="message-header">
                      <div className="message-header-start">
                        <div className="message-date">14 april 2024</div>
                        <div className="message-title">Header Text</div>
                      </div>
                      <div className="message-header-end">
                        <TkBadge
                          label="New"
                          variant="info"
                          type="filledlight"
                        ></TkBadge>
                      </div>
                    </div>
                    <p className="message-text">
                      Lorem Ipsum dolor sit amet consiquences.
                    </p>
                  </div>
                  <div className="message-action">
                    <TkButton
                      variant="info"
                      label="Action"
                      type="text"
                    ></TkButton>
                  </div>
                </div>
                <div className="notification-end">
                  <TkButton
                    variant="neutral"
                    size="small"
                    icon="more_vert"
                    type="text"
                  ></TkButton>
                </div>
              </div>
            </TkTabsItem>
            <TkTabsItem label="New" badgeLabel="03" badged></TkTabsItem>
            <TkTabsItem label="Unreaded" badgeLabel="03" badged></TkTabsItem>
          </TkTabs>
        </div>
      </TkDrawer>
    </>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};
export default CustomContent;
