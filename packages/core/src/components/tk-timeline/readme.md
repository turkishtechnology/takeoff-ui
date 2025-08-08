# tk-timeline



<!-- Auto Generated Below -->


## Overview

The `TkTimeline` is a component that displays a vertical or horizontal timeline of events.
The `TkTimelineItem` is a helper component used to create customized content within the `TkTimeline` component.

## Properties

| Property      | Attribute     | Description                                                                                                                                               | Type                         | Default        |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `alternate`   | `alternate`   | Whether to alternate the position of timeline items relative to the line.                                                                                 | `boolean`                    | `true`         |
| `items`       | `items`       | An array of objects representing the items to display on the timeline. Each object should have at least a `title`. `description` and `date` are optional. | `TimelineItem[]`             | `[]`           |
| `orientation` | `orientation` | The orientation of the timeline.                                                                                                                          | `"horizontal" \| "vertical"` | `'horizontal'` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
