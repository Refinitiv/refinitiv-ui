# `calendar/Navigation`

## `Navigation Day`

####   `Day: previous button switches month to previous`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    February 2020
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
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 1 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 2 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
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
      <div
        aria-label="Monday, 3 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 4 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 5 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 6 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 7 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 8 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 9 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
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
      <div
        aria-label="Monday, 10 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 11 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 12 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 13 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 14 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 15 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 16 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
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
      <div
        aria-label="Monday, 17 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 18 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 19 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 20 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 21 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 22 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 23 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
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
      <div
        aria-label="Monday, 24 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 25 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 26 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 27 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 28 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 29 February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
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
    January 2020
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 1 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 2 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 3 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 4 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 5 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
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
      <div
        aria-label="Monday, 6 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 7 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 8 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 9 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 10 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 11 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 12 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
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
      <div
        aria-label="Monday, 13 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 14 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 15 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 16 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 17 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 18 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 19 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
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
      <div
        aria-label="Monday, 20 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 21 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 22 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 23 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 24 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 25 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 26 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
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
      <div
        aria-label="Monday, 27 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 28 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 29 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 30 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 31 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        31
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
    December 2019
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 1 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
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
      <div
        aria-label="Monday, 2 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 3 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 4 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 5 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 6 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 7 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 8 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
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
      <div
        aria-label="Monday, 9 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 10 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 11 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 12 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 13 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 14 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 15 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
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
      <div
        aria-label="Monday, 16 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 17 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 18 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 19 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 20 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 21 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 22 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
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
      <div
        aria-label="Monday, 23 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 24 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 25 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 26 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 27 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 28 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 29 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
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
      <div
        aria-label="Monday, 30 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 31 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        31
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

####   `Day: next button switches month to next`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    November 2019
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
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
      <div
        aria-label="Monday, 4 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
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
      <div
        aria-label="Monday, 11 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
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
      <div
        aria-label="Monday, 18 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
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
      <div
        aria-label="Monday, 25 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
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
    December 2019
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 1 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
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
      <div
        aria-label="Monday, 2 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 3 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 4 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 5 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 6 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 7 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 8 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
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
      <div
        aria-label="Monday, 9 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 10 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 11 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 12 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 13 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 14 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 15 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
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
      <div
        aria-label="Monday, 16 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 17 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 18 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 19 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 20 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 21 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 22 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
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
      <div
        aria-label="Monday, 23 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 24 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 25 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 26 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 27 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 28 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 29 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
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
      <div
        aria-label="Monday, 30 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 31 December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        31
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
    January 2020
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 1 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 2 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 3 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 4 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 5 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
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
      <div
        aria-label="Monday, 6 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 7 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 8 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 9 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 10 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 11 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 12 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
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
      <div
        aria-label="Monday, 13 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 14 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 15 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 16 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 17 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 18 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 19 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
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
      <div
        aria-label="Monday, 20 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 21 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 22 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 23 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 24 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 25 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 26 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
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
      <div
        aria-label="Monday, 27 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 28 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 29 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 30 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 31 January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        31
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

## `AD/BC Navigation Day`

####   `AD/BC Day: previous button switches month to previous`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    February 1
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
      active=""
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 1 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 2 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 3 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 4 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
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
      <div
        aria-label="Monday, 5 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 6 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 7 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 8 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 9 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 10 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 11 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
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
      <div
        aria-label="Monday, 12 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 13 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 14 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 15 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 16 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 17 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 18 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
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
      <div
        aria-label="Monday, 19 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 20 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 21 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 22 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 23 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 24 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 25 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
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
      <div
        aria-label="Monday, 26 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 27 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 28 February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
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
    January 1
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 1 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 2 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 3 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 4 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 5 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 6 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 7 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
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
      <div
        aria-label="Monday, 8 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 9 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 10 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 11 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 12 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 13 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 14 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
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
      <div
        aria-label="Monday, 15 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 16 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 17 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 18 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 19 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 20 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 21 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
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
      <div
        aria-label="Monday, 22 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 23 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 24 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 25 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 26 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 27 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 28 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
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
      <div
        aria-label="Monday, 29 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 30 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 31 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        31
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
    December 1 BC
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
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
      <div
        aria-label="Monday, 4 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
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
      <div
        aria-label="Monday, 11 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
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
      <div
        aria-label="Monday, 18 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
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
      <div
        aria-label="Monday, 25 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 31 December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        31
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

####   `AD/BC Day: next button switches month to next`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    November 2 BC
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 1 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 2 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 3 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 4 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 5 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 6 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 7 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
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
      <div
        aria-label="Monday, 8 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 9 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 10 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 11 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 12 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 13 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 14 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
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
      <div
        aria-label="Monday, 15 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 16 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 17 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 18 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 19 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 20 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 21 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
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
      <div
        aria-label="Monday, 22 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 23 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 24 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 25 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 26 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 27 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 28 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
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
      <div
        aria-label="Monday, 29 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 30 November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
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
    December 2 BC
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 1 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 2 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 3 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 4 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 5 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
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
      <div
        aria-label="Monday, 6 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 7 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 8 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 9 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 10 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 11 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 12 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
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
      <div
        aria-label="Monday, 13 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 14 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 15 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 16 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 17 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 18 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 19 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
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
      <div
        aria-label="Monday, 20 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 21 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 22 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 23 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 24 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 25 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 26 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
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
      <div
        aria-label="Monday, 27 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 28 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 29 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 30 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 31 December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        31
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
    January 1 BC
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
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      active=""
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 1 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 2 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
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
      <div
        aria-label="Monday, 3 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 4 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 5 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 6 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 7 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 8 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 9 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
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
      <div
        aria-label="Monday, 10 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 11 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 12 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 13 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 14 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 15 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 16 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
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
      <div
        aria-label="Monday, 17 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 18 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 19 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 20 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 21 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 22 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 23 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
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
      <div
        aria-label="Monday, 24 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 25 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 26 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 27 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 28 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 29 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 30 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Monday, 31 January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        31
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

## `Navigation Month`

####   `Month: previous button switches year to previous`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    2019
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
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
    2018
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
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
    2017
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2016"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2016"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

####   `Month: next button switches year to next`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    2017
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2016"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2016"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
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
    2018
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2017"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
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
    2019
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2018"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2019"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2020"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `AD/BC Navigation Month`

####   `AD/BC Month: previous button switches year to previous`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    1
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
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
    1 BC
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
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
    2 BC
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 3"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 3"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

####   `AD/BC Month: next button switches year to next`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    2 BC
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 3"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 3"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
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
    1 BC
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
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
    1
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `Navigation Year`

####   `Year: previous button switches decade to previous`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    1968 - 1983
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1968"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1968
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1969"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1969
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1970"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1970
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1971"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1971
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1972"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1972
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1973"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1973
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1974"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1974
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1975"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1975
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1976"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1976
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1977"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1977
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1978"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1978
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1979"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1979
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1980"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1980
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1981"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1981
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1982"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1982
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1983"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1983
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
    1952 - 1967
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1952"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1952
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1953"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1953
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1954"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1954
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1955"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1955
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1956"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1956
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1957"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1957
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1958"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1958
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1959"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1959
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1960"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1960
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1961"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1961
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1962"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1962
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1963"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1963
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1964"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1964
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1965"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1965
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1966"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1966
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1967"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1967
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
    1936 - 1951
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1936"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1936
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1937"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1937
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1938"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1938
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1939"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1939
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1940"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1940
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1941"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1941
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1942"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1942
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1943"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1943
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1944"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1944
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1945"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1945
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1946"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1946
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1947"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1947
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1948"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1948
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1949"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1949
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1950"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1950
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1951"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1951
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

####   `Year: next button switches decade to next`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    1888 - 1903
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1888"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1888
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1889"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1889
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1890"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1890
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1891"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1891
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1892"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1892
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1893"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1893
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1894"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1894
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1895"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1895
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1896"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1896
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1897"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1897
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1898"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1898
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1899"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1899
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1900"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1900
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1901"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1901
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1902"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1902
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1903"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1903
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
    1904 - 1919
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1904"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1904
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1905"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1905
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1906"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1906
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1907"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1907
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1908"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1908
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1909"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1909
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1910"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1910
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1911"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1911
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1912"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1912
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1913"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1913
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1914"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1914
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1915"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1915
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1916"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1916
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1917"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1917
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1918"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1918
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1919"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1919
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
    1920 - 1935
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1920"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1920
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1921"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1921
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1922"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1922
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1923"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1923
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1924"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1924
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1925"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1925
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1926"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1926
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1927"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1927
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1928"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1928
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1929"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1929
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1930"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1930
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1931"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1931
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1932"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1932
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1933"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1933
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1934"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1934
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1935"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1935
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `AD/BC Navigation Year`

####   `AD/BC Year: previous button switches decade to previous`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    16 - 31
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="16"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        16
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="17"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="18"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="19"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="20"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="21"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="22"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="23"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="24"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="25"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="26"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="27"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="28"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="29"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="30"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="31"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        31
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
    1 BC - 15
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="3"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="4"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="5"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="6"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="7"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="8"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="9"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="10"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="11"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="12"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="13"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="14"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="15"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
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
    17 BC - 2 BC
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="17"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        17
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="16"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="15"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="14"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="13"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="12"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="11"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="10"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="9"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="8"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="7"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="6"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="5"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="4"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="3"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

####   `AD/BC Year: next button switches decade to next`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
    17 BC - 2 BC
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="17"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        17
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="16"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="15"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="14"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="13"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="12"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="11"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="10"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="9"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="8"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="7"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="6"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="5"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="4"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="3"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
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
    1 BC - 15
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="1"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        1
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="3"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="4"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="5"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="6"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="7"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="8"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="9"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="10"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="11"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="12"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="13"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="14"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="15"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
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
    16 - 31
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="16"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        16
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="17"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="18"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="19"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="20"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="21"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="22"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="23"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="24"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="25"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="26"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="27"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="28"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="29"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="30"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="31"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        31
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `View Change`

####   `View button should change views`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
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
      <div
        aria-label="Monday, 4 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
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
      <div
        aria-label="Monday, 11 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
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
      <div
        aria-label="Monday, 18 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
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
      <div
        aria-label="Monday, 25 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2000"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        2000
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2001
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2002"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2002
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2003"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2003
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2004"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2004
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2005
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2006"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2006
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2007"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2007
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2008"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2008
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2009"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2009
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2010"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2010
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2011"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2011
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2012"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2012
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2013"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2013
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2014"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2014
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2015"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2015
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
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
      <div
        aria-label="Monday, 4 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
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
      <div
        aria-label="Monday, 11 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
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
      <div
        aria-label="Monday, 18 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
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
      <div
        aria-label="Monday, 25 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2004"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2004"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2006"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2006"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
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
      <div
        aria-label="Monday, 4 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
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
      <div
        aria-label="Monday, 11 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
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
      <div
        aria-label="Monday, 18 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
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
      <div
        aria-label="Monday, 25 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
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

## `View Change Tap`

####   `View should change on tap`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2000"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        2000
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2001
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2002"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2002
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2003"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2003
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2004"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2004
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2005
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2006"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2006
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2007"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2007
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2008"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2008
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2009"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2009
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2010"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2010
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2011"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2011
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2012"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2012
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2013"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2013
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2014"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2014
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2015"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2015
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
    2001
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2000"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2000"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2002"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2002"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
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
    2001
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2000"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2000"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2001"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2002"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2002"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

####   `Clicking on previous year month should switch years`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2004"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2004"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2006"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2006"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

####   `Clicking on next year month should switch years`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      active=""
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2004"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2004"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="March 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="May 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="June 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jun
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="July 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="August 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="September 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="October 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Oct
      </div>
    </div>
  </div>
  <div
    part="row"
    role="row"
  >
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="November 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="December 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="January 2006"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
    >
      <div
        aria-label="February 2006"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        Feb
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>

```

## `Vew Change Keyboard`

####   `Pressing escape key on month view should return to day view`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
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
      <div
        aria-label="Monday, 4 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
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
      <div
        aria-label="Monday, 11 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
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
      <div
        aria-label="Monday, 18 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
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
      <div
        aria-label="Monday, 25 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
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

####   `Pressing escape key on year view should return to day view`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
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
      <div
        aria-label="Monday, 4 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
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
      <div
        aria-label="Monday, 11 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
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
      <div
        aria-label="Monday, 18 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
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
      <div
        aria-label="Monday, 25 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
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

## `View Change Event`

####   `Prevent default should stop view-change event`

```html
<div
  aria-label="Selected none. Choose date"
  aria-live="polite"
  part="aria-selection"
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
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
      <div
        aria-label="Monday, 4 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
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
      <div
        aria-label="Monday, 11 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
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
      <div
        aria-label="Monday, 18 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
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
      <div
        aria-label="Monday, 25 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
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
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 1 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="0"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        3
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
      <div
        aria-label="Monday, 4 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 8 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        10
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
      <div
        aria-label="Monday, 11 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 15 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        17
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
      <div
        aria-label="Monday, 18 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 22 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        24
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
      <div
        aria-label="Monday, 25 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Friday, 29 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        29
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        aria-selected="false"
        part="cell-content selection"
        role="button"
        tabindex="-1"
      >
        30
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

