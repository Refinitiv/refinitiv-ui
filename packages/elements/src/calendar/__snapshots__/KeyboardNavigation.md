# `calendar/KeyboardNavigation`

## `Day View`

####   `Can switch months using arrow keys`

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
    March 2005
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
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Monday"
        part="cell-content"
      >
        <span aria-hidden="true">
          M
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Tuesday"
        part="cell-content"
      >
        <span aria-hidden="true">
          T
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Wednesday"
        part="cell-content"
      >
        <span aria-hidden="true">
          W
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Thursday"
        part="cell-content"
      >
        <span aria-hidden="true">
          T
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Friday"
        part="cell-content"
      >
        <span aria-hidden="true">
          F
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Saturday"
        part="cell-content"
      >
        <span aria-hidden="true">
          S
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Sunday"
        part="cell-content"
      >
        <span aria-hidden="true">
          S
        </span>
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
      first-date=""
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 1 March 2005"
        part="cell-content selection"
        role="button"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 2 March 2005"
        part="cell-content selection"
        role="button"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 3 March 2005"
        part="cell-content selection"
        role="button"
      >
        3
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 4 March 2005"
        part="cell-content selection"
        role="button"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 5 March 2005"
        part="cell-content selection"
        role="button"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 6 March 2005"
        part="cell-content selection"
        role="button"
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
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Monday, 7 March 2005"
        part="cell-content selection"
        role="button"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 8 March 2005"
        part="cell-content selection"
        role="button"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 9 March 2005"
        part="cell-content selection"
        role="button"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 10 March 2005"
        part="cell-content selection"
        role="button"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 11 March 2005"
        part="cell-content selection"
        role="button"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 12 March 2005"
        part="cell-content selection"
        role="button"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 13 March 2005"
        part="cell-content selection"
        role="button"
      >
        13
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 14 March 2005"
        part="cell-content selection"
        role="button"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 15 March 2005"
        part="cell-content selection"
        role="button"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 16 March 2005"
        part="cell-content selection"
        role="button"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 17 March 2005"
        part="cell-content selection"
        role="button"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 18 March 2005"
        part="cell-content selection"
        role="button"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 19 March 2005"
        part="cell-content selection"
        role="button"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 20 March 2005"
        part="cell-content selection"
        role="button"
      >
        20
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 21 March 2005"
        part="cell-content selection"
        role="button"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 22 March 2005"
        part="cell-content selection"
        role="button"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 23 March 2005"
        part="cell-content selection"
        role="button"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 24 March 2005"
        part="cell-content selection"
        role="button"
      >
        24
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 25 March 2005"
        part="cell-content selection"
        role="button"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 26 March 2005"
        part="cell-content selection"
        role="button"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 27 March 2005"
        part="cell-content selection"
        role="button"
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
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Monday, 28 March 2005"
        part="cell-content selection"
        role="button"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 29 March 2005"
        part="cell-content selection"
        role="button"
      >
        29
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 30 March 2005"
        part="cell-content selection"
        role="button"
      >
        30
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
      tabindex="0"
    >
      <div
        aria-label="Thursday, 31 March 2005"
        part="cell-content selection"
        role="button"
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
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Monday"
        part="cell-content"
      >
        <span aria-hidden="true">
          M
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Tuesday"
        part="cell-content"
      >
        <span aria-hidden="true">
          T
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Wednesday"
        part="cell-content"
      >
        <span aria-hidden="true">
          W
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Thursday"
        part="cell-content"
      >
        <span aria-hidden="true">
          T
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Friday"
        part="cell-content"
      >
        <span aria-hidden="true">
          F
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Saturday"
        part="cell-content"
      >
        <span aria-hidden="true">
          S
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="Sunday"
        part="cell-content"
      >
        <span aria-hidden="true">
          S
        </span>
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
      first-date=""
      part="cell day"
      role="gridcell"
      tabindex="0"
    >
      <div
        aria-label="Friday, 1 April 2005"
        part="cell-content selection"
        role="button"
      >
        1
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 2 April 2005"
        part="cell-content selection"
        role="button"
      >
        2
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 3 April 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 4 April 2005"
        part="cell-content selection"
        role="button"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 5 April 2005"
        part="cell-content selection"
        role="button"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 6 April 2005"
        part="cell-content selection"
        role="button"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 7 April 2005"
        part="cell-content selection"
        role="button"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 8 April 2005"
        part="cell-content selection"
        role="button"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 9 April 2005"
        part="cell-content selection"
        role="button"
      >
        9
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 10 April 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 11 April 2005"
        part="cell-content selection"
        role="button"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 12 April 2005"
        part="cell-content selection"
        role="button"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 13 April 2005"
        part="cell-content selection"
        role="button"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 14 April 2005"
        part="cell-content selection"
        role="button"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 15 April 2005"
        part="cell-content selection"
        role="button"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 16 April 2005"
        part="cell-content selection"
        role="button"
      >
        16
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 17 April 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 18 April 2005"
        part="cell-content selection"
        role="button"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 19 April 2005"
        part="cell-content selection"
        role="button"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 20 April 2005"
        part="cell-content selection"
        role="button"
      >
        20
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 21 April 2005"
        part="cell-content selection"
        role="button"
      >
        21
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 22 April 2005"
        part="cell-content selection"
        role="button"
      >
        22
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 23 April 2005"
        part="cell-content selection"
        role="button"
      >
        23
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 24 April 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 25 April 2005"
        part="cell-content selection"
        role="button"
      >
        25
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 26 April 2005"
        part="cell-content selection"
        role="button"
      >
        26
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 27 April 2005"
        part="cell-content selection"
        role="button"
      >
        27
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 28 April 2005"
        part="cell-content selection"
        role="button"
      >
        28
      </div>
    </div>
    <div
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 29 April 2005"
        part="cell-content selection"
        role="button"
      >
        29
      </div>
    </div>
    <div
      last-date=""
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 30 April 2005"
        part="cell-content selection"
        role="button"
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

## `Month View`

####   `Can switch years using arrow keys`

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
  part="table"
  role="grid"
>
  <div
    part="row"
    role="row"
  >
    <div
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="November 2003"
        part="cell-content selection"
        role="button"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="December 2003"
        part="cell-content selection"
        role="button"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="January 2004"
        part="cell-content selection"
        role="button"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="February 2004"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="March 2004"
        part="cell-content selection"
        role="button"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="April 2004"
        part="cell-content selection"
        role="button"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="May 2004"
        part="cell-content selection"
        role="button"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="June 2004"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="July 2004"
        part="cell-content selection"
        role="button"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="August 2004"
        part="cell-content selection"
        role="button"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="September 2004"
        part="cell-content selection"
        role="button"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="October 2004"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="November 2004"
        part="cell-content selection"
        role="button"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="December 2004"
        part="cell-content selection"
        role="button"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="January 2005"
        part="cell-content selection"
        role="button"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
      tabindex="0"
    >
      <div
        aria-label="February 2005"
        part="cell-content selection"
        role="button"
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
      first-date=""
      idle=""
      part="cell month"
      role="gridcell"
      tabindex="0"
    >
      <div
        aria-label="November 2004"
        part="cell-content selection"
        role="button"
      >
        Nov
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="December 2004"
        part="cell-content selection"
        role="button"
      >
        Dec
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="January 2005"
        part="cell-content selection"
        role="button"
      >
        Jan
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="February 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="March 2005"
        part="cell-content selection"
        role="button"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="April 2005"
        part="cell-content selection"
        role="button"
      >
        Apr
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="May 2005"
        part="cell-content selection"
        role="button"
      >
        May
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="June 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="July 2005"
        part="cell-content selection"
        role="button"
      >
        Jul
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="August 2005"
        part="cell-content selection"
        role="button"
      >
        Aug
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="September 2005"
        part="cell-content selection"
        role="button"
      >
        Sep
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="October 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="November 2005"
        part="cell-content selection"
        role="button"
      >
        Nov
      </div>
    </div>
    <div
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="December 2005"
        part="cell-content selection"
        role="button"
      >
        Dec
      </div>
    </div>
    <div
      idle=""
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="January 2006"
        part="cell-content selection"
        role="button"
      >
        Jan
      </div>
    </div>
    <div
      idle=""
      last-date=""
      part="cell month"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="February 2006"
        part="cell-content selection"
        role="button"
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

## `Year View`

####   `Can switch decades using arrow keys`

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
    1984 - 1999
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
      first-date=""
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1984"
        part="cell-content selection"
        role="button"
      >
        1984
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1985"
        part="cell-content selection"
        role="button"
      >
        1985
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1986"
        part="cell-content selection"
        role="button"
      >
        1986
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1987"
        part="cell-content selection"
        role="button"
      >
        1987
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
      tabindex="-1"
    >
      <div
        aria-label="1988"
        part="cell-content selection"
        role="button"
      >
        1988
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1989"
        part="cell-content selection"
        role="button"
      >
        1989
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1990"
        part="cell-content selection"
        role="button"
      >
        1990
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1991"
        part="cell-content selection"
        role="button"
      >
        1991
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
      tabindex="-1"
    >
      <div
        aria-label="1992"
        part="cell-content selection"
        role="button"
      >
        1992
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1993"
        part="cell-content selection"
        role="button"
      >
        1993
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1994"
        part="cell-content selection"
        role="button"
      >
        1994
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1995"
        part="cell-content selection"
        role="button"
      >
        1995
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
      tabindex="-1"
    >
      <div
        aria-label="1996"
        part="cell-content selection"
        role="button"
      >
        1996
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1997"
        part="cell-content selection"
        role="button"
      >
        1997
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="1998"
        part="cell-content selection"
        role="button"
      >
        1998
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
      tabindex="0"
    >
      <div
        aria-label="1999"
        part="cell-content selection"
        role="button"
      >
        1999
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
      first-date=""
      part="cell year"
      role="gridcell"
      tabindex="0"
    >
      <div
        aria-label="2000"
        part="cell-content selection"
        role="button"
      >
        2000
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2001"
        part="cell-content selection"
        role="button"
      >
        2001
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2002"
        part="cell-content selection"
        role="button"
      >
        2002
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2003"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="2004"
        part="cell-content selection"
        role="button"
      >
        2004
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2005"
        part="cell-content selection"
        role="button"
      >
        2005
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2006"
        part="cell-content selection"
        role="button"
      >
        2006
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2007"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="2008"
        part="cell-content selection"
        role="button"
      >
        2008
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2009"
        part="cell-content selection"
        role="button"
      >
        2009
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2010"
        part="cell-content selection"
        role="button"
      >
        2010
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2011"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="2012"
        part="cell-content selection"
        role="button"
      >
        2012
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2013"
        part="cell-content selection"
        role="button"
      >
        2013
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2014"
        part="cell-content selection"
        role="button"
      >
        2014
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2015"
        part="cell-content selection"
        role="button"
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

