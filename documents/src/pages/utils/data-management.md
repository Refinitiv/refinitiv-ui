<!--
type: page
title: Data Management
location: ./custom-components/utils/data-management
layout: default
-->



# Data Management

Utilities are provided for efficiently manipulating large datasets, without modifying the original data object.

## Collection Item

This interface is the minimum requirement for data passed to a Collection Composer.

``` ts
interface CollectionItem {
  /**
   * Child items collection.
   * Used for nested data structures.
   */
  items?: this[];
}
```

## Data Item

This interface extends the Collection Item and adds basic properties for Data Elements. This is the common interface to extend for elements with `data` properties.

``` ts
interface DataItem extends CollectionItem {
  /**
   * Value of the data item.
   * This is usually the value which is returned,
   * when the item is selected.
   */
  value?: string;
  /**
   * Whether to show or hide
   * the item from the renderer.
   */
  hidden?: boolean;
  /**
   * Sets the item to be readonly.
   * Read only items cannot be selected by a user.
   */
  readonly?: boolean;
  /**
   * Sets the highlight state of the item.
   * This is usually used for navigating over items,
   * without affecting focus, or, highlighting a multiple selection.
   */
  highlighted?: boolean;
  /**
   * Sets the selection state of the item.
   * This is usually used for returning selected values.
   */
  selected?: boolean;
  /**
   * Sets the item to be disabled.
   * This completely prevents the
   * item from being interacted with.
   */
  disabled?: boolean;
}
```

## Collection Composer

The Collection Composer is an API wrapper for data objects that conforms to the Collection Item interface. This wrapper enables a fast and consistent approach to manipulating flat and nested data within elements, without affecting the original data object.

All elements with `data` properties use a Collection Composer to manage their data internally. These elements apply the generic Data Item interface. Some elements may even support being controlled using an external composer.

```ts
import { CollectionComposer, CollectionItem } from '@refinitiv-ui/utils';

// Custom data interface
interface MyData extends CollectionItem {
  src: string;
  type: string;
}

// Create data array
const data: MyData[] = [{
  src: 'media.refinitiv.com/video1.webm',
  type: 'video/webm'
},
{
  src: 'media.refinitiv.com/video1.mp4',
  type: 'video/mp4'
}];

// Initialise composer, using the data array
const composer = new CollectionComposer(data);

// Use composer to return useful data
const modernMedia = composer.queryItemsByPropertyValue('type', 'video/webm');
```

::footer::
