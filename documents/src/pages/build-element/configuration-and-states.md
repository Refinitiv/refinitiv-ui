<!-- 
title: Configurations and States
location: ./custom-components/configuration-and-states
type: page
layout: default
-->



# Configuration & States
When building your custom element, you need to choose how the element should be configured and managed the state. A different approach of configuration would require to implement state management differently.

## Element configuration

When designing a component, it would require to design how developers could configure your component. There are three main configuration strategies to choose from. Standard, Data and Configured. Simplistic elements, like buttons, are considered standard and follow standard configuration principals.

Data driven elements like lists, trees and grids tend to follow data configuration, except for when detailed configuration is required.

### Standard

Elements are configured by passing attributes to the element or using value of a default slot. This approach is simple and comparable to native HTML Elements in the browser.

```html
<efx-element disabled value="1">Hello world</efx-element>
```

Another slightly different approach, other elements can be slotted in as children to either be rendered, or, provide additional configurations.

```html
<efx-element>
  <efx-element-option value="1" selected>Option 1</efx-element-option>
  <efx-element-option value="2">Option 2</efx-element-option>
  <efx-element-option value="3">Option 3</efx-element-option>
</efx-element>
```

### Data

Elements are configured by passing a list of flat, or, nested data to the element's `data` property. Items must implement the [DataItem](./custom-components/utils/data-management#data-item) interface and state must be managed by a [CollectionComposer](./custom-components/utils/data-management#collection-composer) internally.

```html
<efx-element></efx-element>
```

```typescript
const data: DataItem[] = [
  { value: '1' }
  { value: '2' }
  { value: '3' }
];
efxElement.data = data;
```

The `data` property must support being passed a data collection array and an instance of a [CollectionComposer](#). Passing an instance of a collection composer allows for the element state to be controlled externally by other elements. This is useful when the element is used inside of another component's shadow root.

### Configured

Elements are configured by passing a config object to the element's `config` property. This allows for complex and detailed configuration objects to be passed and used in order to render and manipulate the element.

As desirable as this option may sound, it's actually best to avoid this approach and instead, try to consider using attributes, child elements and the `data` property. Reusable components should be simple and easy to understand and use - they're HTML elements after all.

```html
<efx-element></efx-element>
```

```typescript
efxElement.config = {
  columns: [
    {
      label: 'ID',
      key: true
    },
    {
      label: 'Name',
      sort: true
    }
  ],
  data: [...]
};
```

x> Do not design the element to have both `data` property and `config` property. Also, avoid to have data in the configuration object. This can lead to confusion.

## Element state management

This section shows examples of how you can manage element's properties or manipulate an internal data structure of your element. It can use other utilities to serve different purposes depends on the element type being built.

In some complex elements, you may need to use more than one approach. For example, Tree, the element could use `value` property to store a value of selected item but it could also use Collection Composer to manage state of each individual tree item.

### Using Properties

Basic elements are comparable to native inbuilt elements in the browser. Managing state in this case is as simple as storing data as properties.

```ts
class MyElement extends BasicElement {
  protected taps = 0;
  constructor () {
    this.addEventListener('tap', this.incrementTaps.bind(this));
  }
  protected incrementTaps (): void {
    this.taps += 1;
  }
}
```

### Using Collection Composer

Data elements can still manage state like basic elements, however, this is only for simple levels of configuration. These elements also accept array-like data to be passed as a data source, which means the element has a reference to the original data object and must manage state a bit differently.

The framework provides a [Collection Composer](./utils/data-management) utility for handling and manipulating these potentially large datasets.

Below is a basic implementation

```ts
class MyElement<T extends DataItem> extends ControlElement {

  /**
   * Requests an update after a composer modification.
   * This allows the template to rerender if the data has been modified.
   * @returns {void}
   */
  protected modificationUpdate = (): void => {
    this.requestUpdate();
  };

  /**
   * Composer used to query and modify item state.
   */
  protected composer = new CollectionComposer<T>([]);

  /**
   * Data object
   */
  @property({ attribute: false })
  public get data (): null | T[] | CollectionComposer<T> {
    return this._data;
  }
  set data (value: null | T[] | CollectionComposer<T>) {
    const oldValue = this._data;
    if (oldValue === value) {
      return;
    }
    if (value instanceof CollectionComposer) {
      this.composer = value;
    }
    else if (Array.isArray(value)) {
      this.composer = new CollectionComposer<T>(value);
    }
    else {
      this.composer = new CollectionComposer<T>([]);
    }
    this.composer.on(
      'modification', // Listen for modifications
      this.modificationUpdate // Update the template
    );
    this._data = value;
    this.requestUpdate('data', oldValue);
  }
  private _data: null | T[] | CollectionComposer<T> = null;
}
```

### Using Config Property 

Similar to Data Elements, elements which consume a configuration object must also be careful not to manipulate the original configuration object being passed.

Good practice is to only read the configuration object and not use it as a place to store state. Sate can then be managed like Basic and Data elements, using properties and data stores e.g. Collection Composers.
