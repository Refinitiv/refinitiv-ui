# Accordion

```live(preview)
<ef-accordion>
  <ef-collapse spacing header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse spacing header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
  <ef-collapse spacing header="Falcon Heavy">
    You know, being a test pilot isn't always the healthiest business in the world.
  </ef-collapse>
</ef-accordion>
```

`ef-accordion` is used to display a group of `ef-collapse` controls. Only one item will be able to expand by default but you can customize its behavior.

### Basic usage

Accordion can be created by using `ef-collapse` as a content inside `ef-accordion`.

```html
<ef-accordion>
  <ef-collapse spacing header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse spacing header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
  <ef-collapse spacing header="Falcon Heavy">
    You know, being a test pilot isn't always the healthiest business in the world.
  </ef-collapse>
</ef-accordion>
  ```

By default, one item can be expanded at a time. Adding `auto-collapse-disabled` attribute will allow each item to expand independently.

```live
<ef-accordion auto-collapse-disabled>
  <ef-collapse header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
</ef-accordion>
```

```html
<ef-accordion auto-collapse-disabled>
  <ef-collapse header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
</ef-accordion>
```

### Initial expanding state and content spacing.

To make an item in the accordion expand in the initial state, set `expanded` attribute to `ef-collapse` item. You can add `spacing` attribute to `ef-accordion` and default padding will be applied to the content section in every collapse item.

```live
<ef-accordion spacing>
  <ef-collapse header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse expanded header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
</ef-accordion>
```

```html
<ef-accordion spacing>
  <ef-collapse header="SpaceX Dragon">
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>
  <ef-collapse expanded header="Falcon 9">
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>
</ef-accordion>
```

### Using slot

Other features of `ef-collapse` still work e.g. slots.

```live
<style>
ef-accordion {
  margin-top: 35px;
  margin-bottom: 35px;
}
ef-collapse > ef-checkbox {
  margin-right: 5px;
}
</style>
<ef-accordion>
  <ef-collapse header="SpaceX Dragon">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">8</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>

  <ef-collapse header="Falcon 9">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">10</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>

  <ef-collapse header="Falcon Heavy">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">7</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    Dinosaurs are extinct today because they lacked opposable thumbs and the brainpower to build a space program.
  </ef-collapse>
</ef-accordion>
```

```html
<ef-accordion>
  <ef-collapse header="SpaceX Dragon">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">8</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.
  </ef-collapse>

  <ef-collapse header="Falcon 9">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">10</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    We want to explore. We're curious people. Look back over history, people have put their lives at stake to go out and explore ... We believe in what we're doing. Now it's time to go.
  </ef-collapse>

  <ef-collapse header="Falcon Heavy">
    <ef-checkbox slot="header-left"></ef-checkbox>
    <div slot="header-right">7</div>
    <ef-button slot="header-right" icon="menu" transparent></ef-button>
    Dinosaurs are extinct today because they lacked opposable thumbs and the brainpower to build a space program.
  </ef-collapse>
</ef-accordion>
```
