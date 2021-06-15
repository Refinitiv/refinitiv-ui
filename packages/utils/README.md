# Utilities for Element Framework

This package exposes modules for colours and asynchronous tasks.

### Colour helper
https://www.npmjs.com/package/d3-color

### Async Tasks

Async tasks include **timeout**, **micro**, **animation** and **afterRender**.

Example:
```js
import {
  MicroTaskRunner,      // Runs task as a MicroTask
  TimeoutTaskRunner,    // Runs task inside of a timeout
  AnimationTaskRunner,  // Runs task in an animation frame
  AfterRenderTaskRunner // Runs task after render has finished
} from '@refinitiv-ui/utils';

const taskRunner = new MicroTaskRunner();

taskRunner.schedule(() => {
  // task to execute
});
```

`taskRunner.schedule()` can be called multiple times. Only the last callback will be executed.
This is to enable simplified code inside of elements, when multiple actions occur.

### Date Time Helper
Helper functions to support date and time manipulations.
