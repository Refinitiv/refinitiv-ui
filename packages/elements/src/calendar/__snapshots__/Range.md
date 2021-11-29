# `calendar/Range`

## `Range`

####   `Range: selected values should be highlighted`

```html
<div
  aria-label="Selected range is from Friday, 1 April 2005 to Friday, 1 April 2005"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous month"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next month"
    aria-readonly="false"
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
      aria-selected="true"
      first-date=""
      part="cell day"
      range-from=""
      range-to=""
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: Friday, 1 April 2005"
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

```html
<div
  aria-label="Selected range is from Friday, 1 April 2005 to Friday, 1 April 2005"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous year"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    2005
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next year"
    aria-readonly="false"
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
      aria-selected="true"
      part="cell month"
      range-from=""
      range-to=""
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: April 2005"
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

```html
<div
  aria-label="Selected range is from Friday, 1 April 2005 to Friday, 1 April 2005"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous decade"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    2000 - 2015
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next decade"
    aria-readonly="false"
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
      aria-selected="true"
      part="cell year"
      range-from=""
      range-to=""
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: 2005"
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

####   `Range: selected values should be highlighted across months and years`

```html
<div
  aria-label="Selected range is from Tuesday, 1 March 2005 to Wednesday, 1 April 2009"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous month"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next month"
    aria-readonly="false"
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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

```html
<div
  aria-label="Selected range is from Tuesday, 1 March 2005 to Wednesday, 1 April 2009"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous year"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    2005
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next year"
    aria-readonly="false"
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
      aria-selected="true"
      part="cell month"
      range-from=""
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: March 2005"
        part="cell-content selection"
        role="button"
      >
        Mar
      </div>
    </div>
    <div
      part="cell month"
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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
      range=""
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

```html
<div
  aria-label="Selected range is from Tuesday, 1 March 2005 to Wednesday, 1 April 2009"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous decade"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    2000 - 2015
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next decade"
    aria-readonly="false"
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
      aria-selected="true"
      part="cell year"
      range-from=""
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: 2005"
        part="cell-content selection"
        role="button"
      >
        2005
      </div>
    </div>
    <div
      part="cell year"
      range=""
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
      range=""
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
      range=""
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
      aria-selected="true"
      part="cell year"
      range-to=""
      role="gridcell"
      selected=""
      tabindex="-1"
    >
      <div
        aria-label="Selected: 2009"
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

####   `AD/BC Range: selected values should be highlighted`

```html
<div
  aria-label="Selected range is from Tuesday, 4 April 12 to Friday, 21 April 12"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous month"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 12 BC
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next month"
    aria-readonly="false"
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
        aria-label="Saturday, 1 April 12"
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
        aria-label="Sunday, 2 April 12"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 3 April 12"
        part="cell-content selection"
        role="button"
      >
        3
      </div>
    </div>
    <div
      aria-selected="true"
      part="cell day"
      range-from=""
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: Tuesday, 4 April 12"
        part="cell-content selection"
        role="button"
      >
        4
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 5 April 12"
        part="cell-content selection"
        role="button"
      >
        5
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 6 April 12"
        part="cell-content selection"
        role="button"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 7 April 12"
        part="cell-content selection"
        role="button"
      >
        7
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 8 April 12"
        part="cell-content selection"
        role="button"
      >
        8
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 9 April 12"
        part="cell-content selection"
        role="button"
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
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Monday, 10 April 12"
        part="cell-content selection"
        role="button"
      >
        10
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 11 April 12"
        part="cell-content selection"
        role="button"
      >
        11
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 12 April 12"
        part="cell-content selection"
        role="button"
      >
        12
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 13 April 12"
        part="cell-content selection"
        role="button"
      >
        13
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 14 April 12"
        part="cell-content selection"
        role="button"
      >
        14
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 15 April 12"
        part="cell-content selection"
        role="button"
      >
        15
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 16 April 12"
        part="cell-content selection"
        role="button"
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
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Monday, 17 April 12"
        part="cell-content selection"
        role="button"
      >
        17
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 18 April 12"
        part="cell-content selection"
        role="button"
      >
        18
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 19 April 12"
        part="cell-content selection"
        role="button"
      >
        19
      </div>
    </div>
    <div
      part="cell day"
      range=""
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 20 April 12"
        part="cell-content selection"
        role="button"
      >
        20
      </div>
    </div>
    <div
      aria-selected="true"
      part="cell day"
      range-to=""
      role="gridcell"
      selected=""
      tabindex="-1"
    >
      <div
        aria-label="Selected: Friday, 21 April 12"
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
        aria-label="Saturday, 22 April 12"
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
        aria-label="Sunday, 23 April 12"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 24 April 12"
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
        aria-label="Tuesday, 25 April 12"
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
        aria-label="Wednesday, 26 April 12"
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
        aria-label="Thursday, 27 April 12"
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
        aria-label="Friday, 28 April 12"
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
        aria-label="Saturday, 29 April 12"
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
        aria-label="Sunday, 30 April 12"
        part="cell-content selection"
        role="button"
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
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
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
  aria-label="Selected range is from Tuesday, 4 April 12 to Friday, 21 April 12"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous year"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    12 BC
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next year"
    aria-readonly="false"
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
        aria-label="November 13"
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
        aria-label="December 13"
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
        aria-label="January 12"
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
        aria-label="February 12"
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
        aria-label="March 12"
        part="cell-content selection"
        role="button"
      >
        Mar
      </div>
    </div>
    <div
      aria-selected="true"
      part="cell month"
      range-from=""
      range-to=""
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: April 12"
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
        aria-label="May 12"
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
        aria-label="June 12"
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
        aria-label="July 12"
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
        aria-label="August 12"
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
        aria-label="September 12"
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
        aria-label="October 12"
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
        aria-label="November 12"
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
        aria-label="December 12"
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
        aria-label="January 11"
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
        aria-label="February 11"
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
  aria-label="Selected range is from Tuesday, 4 April 12 to Friday, 21 April 12"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous decade"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="up"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    17 BC - 2 BC
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next decade"
    aria-readonly="false"
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
        aria-label="17"
        part="cell-content selection"
        role="button"
      >
        17
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="16"
        part="cell-content selection"
        role="button"
      >
        16
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="15"
        part="cell-content selection"
        role="button"
      >
        15
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="14"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="13"
        part="cell-content selection"
        role="button"
      >
        13
      </div>
    </div>
    <div
      aria-selected="true"
      part="cell year"
      range-from=""
      range-to=""
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: 12"
        part="cell-content selection"
        role="button"
      >
        12
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="11"
        part="cell-content selection"
        role="button"
      >
        11
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="10"
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
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="9"
        part="cell-content selection"
        role="button"
      >
        9
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="8"
        part="cell-content selection"
        role="button"
      >
        8
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="7"
        part="cell-content selection"
        role="button"
      >
        7
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="6"
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
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="5"
        part="cell-content selection"
        role="button"
      >
        5
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="4"
        part="cell-content selection"
        role="button"
      >
        4
      </div>
    </div>
    <div
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="3"
        part="cell-content selection"
        role="button"
      >
        3
      </div>
    </div>
    <div
      last-date=""
      part="cell year"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="2"
        part="cell-content selection"
        role="button"
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

## `Navigation Range Value`

####   `It should be possible to select range values on click`

```html
<div
  aria-label="Selected range is from Wednesday, 6 April 2005"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous month"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next month"
    aria-readonly="false"
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
      tabindex="-1"
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
      aria-selected="true"
      part="cell day"
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: Wednesday, 6 April 2005"
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

```html
<div
  aria-label="Selected range is from Wednesday, 6 April 2005 to Sunday, 10 April 2005"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous month"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next month"
    aria-readonly="false"
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
      tabindex="-1"
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
      aria-selected="true"
      part="cell day"
      range-from=""
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: Wednesday, 6 April 2005"
        part="cell-content selection"
        role="button"
      >
        6
      </div>
    </div>
    <div
      part="cell day"
      range=""
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
      range=""
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
      range=""
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
      aria-selected="true"
      part="cell day"
      range-to=""
      role="gridcell"
      selected=""
      tabindex="-1"
    >
      <div
        aria-label="Selected: Sunday, 10 April 2005"
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

```html
<div
  aria-label="Selected range is from Wednesday, 13 April 2005"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous month"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next month"
    aria-readonly="false"
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
      tabindex="-1"
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
      aria-selected="true"
      part="cell day"
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: Wednesday, 13 April 2005"
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

```html
<div
  aria-label="Selected range is from Tuesday, 12 April 2005"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous month"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    April 2005
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next month"
    aria-readonly="false"
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
      tabindex="-1"
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
      aria-selected="true"
      part="cell day"
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: Tuesday, 12 April 2005"
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

```html
<div
  aria-label="Selected range is from Tuesday, 12 April 2005"
  aria-live="polite"
  part="aria-selection"
>
</div>
<div part="navigation">
  <ef-button
    aria-disabled="false"
    aria-label="Previous month"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    May 2005
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next month"
    aria-readonly="false"
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
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
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
        aria-label="Sunday, 1 May 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 2 May 2005"
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
        aria-label="Tuesday, 3 May 2005"
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
        aria-label="Wednesday, 4 May 2005"
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
        aria-label="Thursday, 5 May 2005"
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
        aria-label="Friday, 6 May 2005"
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
        aria-label="Saturday, 7 May 2005"
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
        aria-label="Sunday, 8 May 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 9 May 2005"
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
        aria-label="Tuesday, 10 May 2005"
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
        aria-label="Wednesday, 11 May 2005"
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
        aria-label="Thursday, 12 May 2005"
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
        aria-label="Friday, 13 May 2005"
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
        aria-label="Saturday, 14 May 2005"
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
        aria-label="Sunday, 15 May 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 16 May 2005"
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
        aria-label="Tuesday, 17 May 2005"
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
        aria-label="Wednesday, 18 May 2005"
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
        aria-label="Thursday, 19 May 2005"
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
        aria-label="Friday, 20 May 2005"
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
        aria-label="Saturday, 21 May 2005"
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
        aria-label="Sunday, 22 May 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 23 May 2005"
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
        aria-label="Tuesday, 24 May 2005"
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
        aria-label="Wednesday, 25 May 2005"
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
        aria-label="Thursday, 26 May 2005"
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
        aria-label="Friday, 27 May 2005"
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
        aria-label="Saturday, 28 May 2005"
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
        aria-label="Sunday, 29 May 2005"
        part="cell-content selection"
        role="button"
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
      tabindex="-1"
    >
      <div
        aria-label="Monday, 30 May 2005"
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
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 31 May 2005"
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
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
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
    aria-disabled="false"
    aria-label="Previous month"
    aria-readonly="false"
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
    aria-disabled="false"
    aria-readonly="false"
    icon="down"
    part="btn-view"
    role="button"
    tabindex="0"
    textpos="before"
  >
    เมษายน ค.ศ. 2005
  </ef-button>
  <ef-button
    aria-disabled="false"
    aria-label="Next month"
    aria-readonly="false"
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
        aria-label="วันอาทิตย์"
        part="cell-content"
      >
        <span aria-hidden="true">
          อา
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="วันจันทร์"
        part="cell-content"
      >
        <span aria-hidden="true">
          จ
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="วันอังคาร"
        part="cell-content"
      >
        <span aria-hidden="true">
          อ
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="วันพุธ"
        part="cell-content"
      >
        <span aria-hidden="true">
          พ
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="วันพฤหัสบดี"
        part="cell-content"
      >
        <span aria-hidden="true">
          พฤ
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="วันศุกร์"
        part="cell-content"
      >
        <span aria-hidden="true">
          ศ
        </span>
      </div>
    </div>
    <div
      part="cell day-name"
      role="columnheader"
      scope="col"
    >
      <div
        aria-label="วันเสาร์"
        part="cell-content"
      >
        <span aria-hidden="true">
          ส
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
        aria-label="Sunday, 3 April 2005"
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
        aria-label="Sunday, 10 April 2005"
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
        aria-label="Sunday, 17 April 2005"
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
        aria-label="Sunday, 24 April 2005"
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

