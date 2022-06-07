<!-- 
title: Async Tasks
location: ./utils/async-tasks
type: page
layout: default
-->

::status-complete::

# Async Tasks

[Lit](https://lit.dev), the underlying web component library, is asynchronous by default and batches changes before rendering them to the DOM. This utility is used as an additional layer to schedule code execution at a specific point in time.

## Task Runners

Each instance of a task runner can be scheduled multiple times, with only the last callback being executed.

### Micro Task

Micro task runners schedule code to be executed immediately after the function or program that created them exits.

```typescript
import { MicroTaskRunner } from '@refinitiv-ui/utils';

const taskRunner = new MicroTaskRunner();

function run () {
  queueMicroTask(() => console.log('Second'))
  taskRunner.schedule(() => console.log('Third'));
  console.log('First');
}

run();
// First
run();
// First
// Second
// Third
// Second
```

### Animation Task

Animation task runners schedule code to be executed inside of an animation frame.

```typescript
import { AnimationTaskRunner } from '@refinitiv-ui/utils';

const taskRunner = new AnimationTaskRunner();

function run () {
  requestAnimationFrame(() => console.log('Second'));
  taskRunner.schedule(() => console.log('Third'));
  console.log('First');
}

run();
// First
run();
// First
// Second
// Third
// Second
```

### After Render Task

After Render task runners schedule code to be executed after a frame has been rendered.


```typescript
import { AfterRenderTaskRunner } from '@refinitiv-ui/utils';

const taskRunner = new AfterRenderTaskRunner();

function run () {
  requestAnimationFrame(() => console.log('Second'));
  taskRunner.schedule(() => console.log('Third'));
  console.log('First')
}

run();
// First
run();
// First
// Second
// Second
// Third
```

### Timeout Task

Timeout task runners schedule code to be executed after a specified timeout. The difference between this and all other task runners is that this runner uses a debouncer over a throttler, meaning that every schedule of the task will reset the timeout.

```typescript
import { TimeoutTaskRunner } from '@refinitiv-ui/utils';

const taskRunner = new TimeoutTaskRunner(100);

function run () {
  setTimeout(() => console.log('Second'), 100);
  taskRunner.schedule(() => console.log('Third'));
  console.log('First')
}

run();
// First
run();
// First
// Second
// Second
// Third
```
