# `calendar/Defaults`

## `Defaults Test`

####   `fill-cells should fill empty cells`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      aria-selected="false"
      first-date=""
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 28 March 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-03-28">
          28
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 29 March 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-03-29">
          29
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 30 March 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-03-30">
          30
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 31 March 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-03-31">
          31
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 4 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 18 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 1 May 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-05-01">
          1
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 2 May 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-05-02">
          2
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 3 May 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-05-03">
          3
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 4 May 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-05-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 5 May 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-05-05">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 6 May 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-05-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 7 May 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-05-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 8 May 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-05-08">
          8
        </slot>
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

####   `DOM structure is correct for 2005-04`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 4 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 18 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous year"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select date"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    2005
  </ef-button>
  <ef-button
    aria-label="Next year"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      aria-selected="false"
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2004-11">
          Nov
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12">
          Dec
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-01">
          Jan
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02">
          Feb
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-03">
          Mar
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04">
          Apr
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-05">
          May
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-06">
          Jun
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-07">
          Jul
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-08">
          Aug
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-09">
          Sep
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-10">
          Oct
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-11">
          Nov
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-12">
          Dec
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2006"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2006-01">
          Jan
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2006"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2006-02">
          Feb
        </slot>
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous decade"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select date"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    2000 - 2015
  </ef-button>
  <ef-button
    aria-label="Next decade"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2000"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2000">
          2000
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2001"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2001">
          2001
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2002"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2002">
          2002
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2003"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2003">
          2003
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004">
          2004
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005">
          2005
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2006"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2006">
          2006
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2007"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2007">
          2007
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2008"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2008">
          2008
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2009"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2009">
          2009
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2010"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2010">
          2010
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2011"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2011">
          2011
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2012"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2012">
          2012
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2013"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2013">
          2013
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2014"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2014">
          2014
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2015"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2015">
          2015
        </slot>
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

####   `DOM structure is correct for 2005-02`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    February 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 1 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-02-01">
          1
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 2 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-02">
          2
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 3 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-03">
          3
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 4 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 5 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-05">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 6 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-06">
          6
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 7 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 8 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 9 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-09">
          9
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 10 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-10">
          10
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 11 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-11">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 12 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 13 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-13">
          13
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 14 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 15 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-15">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 16 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-16">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 17 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-17">
          17
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 18 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 19 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-19">
          19
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 20 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-20">
          20
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 21 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-21">
          21
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 22 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 23 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-23">
          23
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 24 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-24">
          24
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 25 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-25">
          25
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 26 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-26">
          26
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 27 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-27">
          27
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 28 February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02-28">
          28
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous year"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select date"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    2005
  </ef-button>
  <ef-button
    aria-label="Next year"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      aria-selected="false"
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2004-11">
          Nov
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12">
          Dec
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-01">
          Jan
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02">
          Feb
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-03">
          Mar
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04">
          Apr
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-05">
          May
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-06">
          Jun
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-07">
          Jul
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-08">
          Aug
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-09">
          Sep
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-10">
          Oct
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-11">
          Nov
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-12">
          Dec
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2006"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2006-01">
          Jan
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2006"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2006-02">
          Feb
        </slot>
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous decade"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select date"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    2000 - 2015
  </ef-button>
  <ef-button
    aria-label="Next decade"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2000"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2000">
          2000
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2001"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2001">
          2001
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2002"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2002">
          2002
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2003"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2003">
          2003
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004">
          2004
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005">
          2005
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2006"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2006">
          2006
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2007"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2007">
          2007
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2008"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2008">
          2008
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2009"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2009">
          2009
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2010"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2010">
          2010
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2011"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2011">
          2011
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2012"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2012">
          2012
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2013"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2013">
          2013
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2014"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2014">
          2014
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2015"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2015">
          2015
        </slot>
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

####   `DOM structure is correct for 2004-12`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    December 2004
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 1 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2004-12-01">
          1
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 2 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-02">
          2
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 3 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-03">
          3
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 4 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 5 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-05">
          5
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 6 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 7 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 8 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 9 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-09">
          9
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 10 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-10">
          10
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 11 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-11">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 12 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-12">
          12
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 13 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-13">
          13
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 14 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 15 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-15">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 16 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-16">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 17 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-17">
          17
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 18 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 19 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-19">
          19
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 20 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-20">
          20
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 21 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-21">
          21
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 22 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 23 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-23">
          23
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 24 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-24">
          24
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 25 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-25">
          25
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 26 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-26">
          26
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 27 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-27">
          27
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 28 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-28">
          28
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 29 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-29">
          29
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 30 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-30">
          30
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 31 December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12-31">
          31
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous year"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select date"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    2004
  </ef-button>
  <ef-button
    aria-label="Next year"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      aria-selected="false"
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2003"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2003-11">
          Nov
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2003"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2003-12">
          Dec
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-01">
          Jan
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-02">
          Feb
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-03">
          Mar
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-04">
          Apr
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-05">
          May
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-06">
          Jun
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-07">
          Jul
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-08">
          Aug
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-09">
          Sep
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-10">
          Oct
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-11">
          Nov
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004-12">
          Dec
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-01">
          Jan
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-02">
          Feb
        </slot>
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous decade"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select date"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    2000 - 2015
  </ef-button>
  <ef-button
    aria-label="Next decade"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2000"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2000">
          2000
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2001"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2001">
          2001
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2002"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2002">
          2002
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2003"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2003">
          2003
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2004"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2004">
          2004
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005">
          2005
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2006"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2006">
          2006
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2007"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2007">
          2007
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2008"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2008">
          2008
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2009"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2009">
          2009
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2010"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2010">
          2010
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2011"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2011">
          2011
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2012"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2012">
          2012
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2013"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2013">
          2013
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2014"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2014">
          2014
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2015"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2015">
          2015
        </slot>
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `Locales`

####   `Set dynamic locales`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Montag"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Dienstag"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        D
      </div>
    </div>
    <div
      abbr="Mittwoch"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Donnerstag"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        D
      </div>
    </div>
    <div
      abbr="Freitag"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Samstag"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sonntag"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 4 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 18 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    เมษายน 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="วันอาทิตย์"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        อา
      </div>
    </div>
    <div
      abbr="วันจันทร์"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        จ
      </div>
    </div>
    <div
      abbr="วันอังคาร"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        อ
      </div>
    </div>
    <div
      abbr="วันพุธ"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        พ
      </div>
    </div>
    <div
      abbr="วันพฤหัสบดี"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        พฤ
      </div>
    </div>
    <div
      abbr="วันศุกร์"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        ศ
      </div>
    </div>
    <div
      abbr="วันเสาร์"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        ส
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 4 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 18 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `First Day Of Week`

####   `First day of week should change`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 4 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 18 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `Weekends Only Option`

####   `Should support weekends only option`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      disabled=""
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `Weekdays Only Option`

####   `Should support weekdays only option`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 4 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 18 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      disabled=""
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `Min Value`

####   `Should support min value`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      disabled=""
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 18 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `Max Value`

####   `Should support max value`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 4 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 18 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      disabled=""
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `Custom Filter`

####   `Should support custom filter (Odds Only)`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      disabled=""
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

####   `Should support custom filter combined with default filters`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="navigation">
  <ef-button
    aria-label="Previous month"
    empty=""
    icon="left"
    part="btn-prev"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
  <ef-button
    aria-description="Click to select year"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-label="Next month"
    empty=""
    icon="right"
    part="btn-next"
    role="button"
    tabindex="0"
    textpos="after"
  >
  </ef-button>
</div>
<div
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
    <div
      abbr="Monday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        M
      </div>
    </div>
    <div
      abbr="Tuesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Wednesday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        W
      </div>
    </div>
    <div
      abbr="Thursday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        T
      </div>
    </div>
    <div
      abbr="Friday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        F
      </div>
    </div>
    <div
      abbr="Saturday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
    <div
      abbr="Sunday"
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div part="cell-content">
        S
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      disabled=""
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-01">
          1
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-02">
          2
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-03">
          3
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-04">
          4
        </slot>
      </div>
    </div>
    <div
      active=""
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="2005-04-05">
          5
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-06">
          6
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-07">
          7
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-08">
          8
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-09">
          9
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-10">
          10
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-11">
          11
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-12">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-13">
          13
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-14">
          14
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-15">
          15
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-16">
          16
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-17">
          17
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-18">
          18
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-19">
          19
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-21">
          21
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-22">
          22
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-23">
          23
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-24">
          24
        </slot>
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="2005-04-25">
          25
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-26">
          26
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-27">
          27
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-28">
          28
        </slot>
      </div>
    </div>
    <div
      disabled=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-29">
          29
        </slot>
      </div>
    </div>
    <div
      disabled=""
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        part="cell-content selection"
        role="button"
      >
        <slot name="2005-04-30">
          30
        </slot>
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

