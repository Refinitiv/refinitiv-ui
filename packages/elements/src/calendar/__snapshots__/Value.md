# `calendar/Value`

## `Value Is Selected`

####   `Selected value should be highlighted when set as attribute`

```html
<div
  aria-label="Selected date is Thursday, 21 April 2005"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="true"
      part="cell day"
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: Thursday, 21 April 2005"
        part="cell-content selection"
        role="button"
      >
        21
      </div>
    </div>
    <div
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
  aria-label="Selected date is Thursday, 21 April 2005"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
  aria-label="Selected date is Thursday, 21 April 2005"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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

####   `Selected value should be highlighted when set as property`

```html
<div
  aria-label="Selected date is Thursday, 21 April 2005"
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
    December 2021
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
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 1 December 2021"
        part="cell-content selection"
        role="button"
      >
        1
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 2 December 2021"
        part="cell-content selection"
        role="button"
      >
        2
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="0"
      today=""
    >
      <div
        aria-label="Today, Friday, 3 December 2021"
        part="cell-content selection"
        role="button"
      >
        3
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 4 December 2021"
        part="cell-content selection"
        role="button"
      >
        4
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 5 December 2021"
        part="cell-content selection"
        role="button"
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
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Monday, 6 December 2021"
        part="cell-content selection"
        role="button"
      >
        6
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 7 December 2021"
        part="cell-content selection"
        role="button"
      >
        7
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 8 December 2021"
        part="cell-content selection"
        role="button"
      >
        8
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 9 December 2021"
        part="cell-content selection"
        role="button"
      >
        9
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 10 December 2021"
        part="cell-content selection"
        role="button"
      >
        10
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 11 December 2021"
        part="cell-content selection"
        role="button"
      >
        11
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 12 December 2021"
        part="cell-content selection"
        role="button"
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
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Monday, 13 December 2021"
        part="cell-content selection"
        role="button"
      >
        13
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 14 December 2021"
        part="cell-content selection"
        role="button"
      >
        14
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 15 December 2021"
        part="cell-content selection"
        role="button"
      >
        15
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 16 December 2021"
        part="cell-content selection"
        role="button"
      >
        16
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 17 December 2021"
        part="cell-content selection"
        role="button"
      >
        17
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 18 December 2021"
        part="cell-content selection"
        role="button"
      >
        18
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 19 December 2021"
        part="cell-content selection"
        role="button"
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
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Monday, 20 December 2021"
        part="cell-content selection"
        role="button"
      >
        20
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 21 December 2021"
        part="cell-content selection"
        role="button"
      >
        21
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 22 December 2021"
        part="cell-content selection"
        role="button"
      >
        22
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 23 December 2021"
        part="cell-content selection"
        role="button"
      >
        23
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 24 December 2021"
        part="cell-content selection"
        role="button"
      >
        24
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Saturday, 25 December 2021"
        part="cell-content selection"
        role="button"
      >
        25
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Sunday, 26 December 2021"
        part="cell-content selection"
        role="button"
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
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Monday, 27 December 2021"
        part="cell-content selection"
        role="button"
      >
        27
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 28 December 2021"
        part="cell-content selection"
        role="button"
      >
        28
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Wednesday, 29 December 2021"
        part="cell-content selection"
        role="button"
      >
        29
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Thursday, 30 December 2021"
        part="cell-content selection"
        role="button"
      >
        30
      </div>
    </div>
    <div
      aria-selected="false"
      last-date=""
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 31 December 2021"
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

####   `AD/BC selected value should be highlighted`

```html
<div
  aria-label="Selected date is Friday, 21 April 12"
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
    April 12 BC
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
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 4 April 12"
        part="cell-content selection"
        role="button"
      >
        4
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      role="gridcell"
      selected=""
      tabindex="0"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
  aria-label="Selected date is Friday, 21 April 12"
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
    12 BC
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
  aria-label="Selected date is Friday, 21 April 12"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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

## `Navigation Value`

####   `It should be possible to select value on click`

```html
<div
  aria-label="Selected date is Friday, 1 April 2005"
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
      aria-selected="true"
      first-date=""
      part="cell day"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
  aria-label="Selected date is Saturday, 30 April 2005"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="true"
      last-date=""
      part="cell day"
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: Saturday, 30 April 2005"
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

####   `AD/BC It should be possible to select value on click`

```html
<div
  aria-label="Selected date is Saturday, 1 April 12"
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
    April 12 BC
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
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: Saturday, 1 April 12"
        part="cell-content selection"
        role="button"
      >
        1
      </div>
    </div>
    <div
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 4 April 12"
        part="cell-content selection"
        role="button"
      >
        4
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 21 April 12"
        part="cell-content selection"
        role="button"
      >
        21
      </div>
    </div>
    <div
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
  aria-label="Selected date is Sunday, 30 April 12"
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
    April 12 BC
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
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
      </div>
    </div>
    <div
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Tuesday, 4 April 12"
        part="cell-content selection"
        role="button"
      >
        4
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
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
      aria-selected="false"
      part="cell day"
      role="gridcell"
      tabindex="-1"
    >
      <div
        aria-label="Friday, 21 April 12"
        part="cell-content selection"
        role="button"
      >
        21
      </div>
    </div>
    <div
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="false"
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
      aria-selected="true"
      last-date=""
      part="cell day"
      role="gridcell"
      selected=""
      tabindex="0"
    >
      <div
        aria-label="Selected: Sunday, 30 April 12"
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

