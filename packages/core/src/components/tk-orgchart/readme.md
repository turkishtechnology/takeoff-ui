# tk-org-chart



<!-- Auto Generated Below -->


## Overview

The TkOrgChart component allows users to visualize organizational data using d3-org-chart.

## Properties

| Property             | Attribute             | Description                                                                                                        | Type      | Default     |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `accessibilityLabel` | `accessibility-label` | Accessibility label for the chart                                                                                  | `string`  | `undefined` |
| `collapsible`        | `collapsible`         | Enable or disable expand/collapse buttons functionality When disabled, all nodes will be automatically expanded    | `boolean` | `true`      |
| `data` _(required)_  | `data`                | Chart data should be an array of node objects with at least id, parentId (optional for root), and name properties. | `any[]`   | `undefined` |
| `options`            | `options`             | Chart options for d3-org-chart customization                                                                       | `any`     | `undefined` |


## Events

| Event           | Description      | Type               |
| --------------- | ---------------- | ------------------ |
| `tk-node-click` | Node click event | `CustomEvent<any>` |


## Methods

### `addNode(node: any) => Promise<void>`

Add node to organizational chart

#### Parameters

| Name   | Type  | Description |
| ------ | ----- | ----------- |
| `node` | `any` |             |

#### Returns

Type: `Promise<void>`



### `fit() => Promise<void>`

Fit chart to screen

#### Returns

Type: `Promise<void>`



### `getOrgChart() => Promise<any>`

Get the chart instance

#### Returns

Type: `Promise<any>`



### `refresh() => Promise<void>`

Refresh the chart

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
