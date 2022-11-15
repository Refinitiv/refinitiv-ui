<!-- 
title: State management
location: ./utils/state-management
type: page
layout: default
-->



# State management

How state is managed, depends on the element type being built. Below are examples of how state should be managed across these different types.

## Basic Elements

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

## Data Elements

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

## Config Elements

Similar to Data Elements, elements which consume a configuration object must also be careful not to manipulate the original configuration object being passed.

Good practice is to only read the configuration object and not use it as a place to store state. Sate can then be managed like Basic and Data elements, using properties and data stores e.g. Collection Composers.
