/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["calendar/Value Value Is Selected Selected value should be highlighted when set as property"] = 
`<div
  aria-label="Selected date is Thursday, April 21, 2005"
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
    >
      <div
        aria-label="Friday, April 1, 2005"
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
        aria-label="Saturday, April 2, 2005"
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
        aria-label="Sunday, April 3, 2005"
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
        aria-label="Monday, April 4, 2005"
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
        aria-label="Tuesday, April 5, 2005"
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
        aria-label="Wednesday, April 6, 2005"
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
        aria-label="Thursday, April 7, 2005"
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
        aria-label="Friday, April 8, 2005"
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
        aria-label="Saturday, April 9, 2005"
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
        aria-label="Sunday, April 10, 2005"
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
        aria-label="Monday, April 11, 2005"
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
        aria-label="Tuesday, April 12, 2005"
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
        aria-label="Wednesday, April 13, 2005"
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
        aria-label="Thursday, April 14, 2005"
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
        aria-label="Friday, April 15, 2005"
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
        aria-label="Saturday, April 16, 2005"
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
        aria-label="Sunday, April 17, 2005"
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
        aria-label="Monday, April 18, 2005"
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
        aria-label="Tuesday, April 19, 2005"
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
        aria-label="Wednesday, April 20, 2005"
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
      active=""
      aria-selected="true"
      part="cell day"
      role="gridcell"
      selected=""
    >
      <div
        aria-label="Selected: Thursday, April 21, 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
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
        aria-label="Friday, April 22, 2005"
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
        aria-label="Saturday, April 23, 2005"
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
        aria-label="Sunday, April 24, 2005"
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
        aria-label="Monday, April 25, 2005"
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
        aria-label="Tuesday, April 26, 2005"
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
        aria-label="Wednesday, April 27, 2005"
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
        aria-label="Thursday, April 28, 2005"
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
        aria-label="Friday, April 29, 2005"
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
        aria-label="Saturday, April 30, 2005"
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
`;
/* end snapshot calendar/Value Value Is Selected Selected value should be highlighted when set as property */

snapshots["calendar/Value Value Is Selected Selected value should be highlighted when set as attribute Selected value should be highlighted in day view"] = 
`<div
  aria-label="Selected date is Thursday, April 21, 2005"
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
    >
      <div
        aria-label="Friday, April 1, 2005"
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
        aria-label="Saturday, April 2, 2005"
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
        aria-label="Sunday, April 3, 2005"
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
        aria-label="Monday, April 4, 2005"
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
        aria-label="Tuesday, April 5, 2005"
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
        aria-label="Wednesday, April 6, 2005"
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
        aria-label="Thursday, April 7, 2005"
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
        aria-label="Friday, April 8, 2005"
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
        aria-label="Saturday, April 9, 2005"
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
        aria-label="Sunday, April 10, 2005"
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
        aria-label="Monday, April 11, 2005"
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
        aria-label="Tuesday, April 12, 2005"
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
        aria-label="Wednesday, April 13, 2005"
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
        aria-label="Thursday, April 14, 2005"
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
        aria-label="Friday, April 15, 2005"
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
        aria-label="Saturday, April 16, 2005"
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
        aria-label="Sunday, April 17, 2005"
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
        aria-label="Monday, April 18, 2005"
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
        aria-label="Tuesday, April 19, 2005"
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
        aria-label="Wednesday, April 20, 2005"
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
      active=""
      aria-selected="true"
      part="cell day"
      role="gridcell"
      selected=""
    >
      <div
        aria-label="Selected: Thursday, April 21, 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
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
        aria-label="Friday, April 22, 2005"
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
        aria-label="Saturday, April 23, 2005"
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
        aria-label="Sunday, April 24, 2005"
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
        aria-label="Monday, April 25, 2005"
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
        aria-label="Tuesday, April 26, 2005"
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
        aria-label="Wednesday, April 27, 2005"
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
        aria-label="Thursday, April 28, 2005"
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
        aria-label="Friday, April 29, 2005"
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
        aria-label="Saturday, April 30, 2005"
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
`;
/* end snapshot calendar/Value Value Is Selected Selected value should be highlighted when set as attribute Selected value should be highlighted in day view */

snapshots["calendar/Value Value Is Selected Selected value should be highlighted when set as attribute Selected value should be highlighted in day month"] = 
`<div
  aria-label="Selected date is Thursday, April 21, 2005"
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
        tabindex="-1"
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
      active=""
      aria-selected="true"
      part="cell month"
      role="gridcell"
      selected=""
    >
      <div
        aria-label="Selected: April 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
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
`;
/* end snapshot calendar/Value Value Is Selected Selected value should be highlighted when set as attribute Selected value should be highlighted in day month */

snapshots["calendar/Value Value Is Selected Selected value should be highlighted when set as attribute Selected value should be highlighted in day year"] = 
`<div
  aria-label="Selected date is Thursday, April 21, 2005"
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
      aria-selected="false"
      first-date=""
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="2000"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
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
      active=""
      aria-selected="true"
      part="cell year"
      role="gridcell"
      selected=""
    >
      <div
        aria-label="Selected: 2005"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
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
`;
/* end snapshot calendar/Value Value Is Selected Selected value should be highlighted when set as attribute Selected value should be highlighted in day year */

snapshots["calendar/Value Value Is Selected AD/BC selected value should be highlighted Selected value should be highlighted in day view"] = 
`<div
  aria-label="Selected date is Friday, April 21, 12"
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
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
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
      aria-selected="false"
      first-date=""
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Saturday, April 1, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-01">
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
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, April 2, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-02">
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
        aria-label="Monday, April 3, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-03">
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
        aria-label="Tuesday, April 4, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-04">
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
        aria-label="Wednesday, April 5, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-05">
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
        aria-label="Thursday, April 6, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-06">
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
        aria-label="Friday, April 7, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-07">
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
        aria-label="Saturday, April 8, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-08">
          8
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
        aria-label="Sunday, April 9, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-09">
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
        aria-label="Monday, April 10, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-10">
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
        aria-label="Tuesday, April 11, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-11">
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
        aria-label="Wednesday, April 12, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-12">
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
        aria-label="Thursday, April 13, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-13">
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
        aria-label="Friday, April 14, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-14">
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
        aria-label="Saturday, April 15, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-15">
          15
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
        aria-label="Sunday, April 16, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-16">
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
        aria-label="Monday, April 17, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-17">
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
        aria-label="Tuesday, April 18, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-18">
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
        aria-label="Wednesday, April 19, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-19">
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
        aria-label="Thursday, April 20, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-20">
          20
        </slot>
      </div>
    </div>
    <div
      active=""
      aria-selected="true"
      part="cell day"
      role="gridcell"
      selected=""
    >
      <div
        aria-label="Selected: Friday, April 21, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="-000011-04-21">
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
        aria-label="Saturday, April 22, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-22">
          22
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
        aria-label="Sunday, April 23, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-23">
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
        aria-label="Monday, April 24, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-24">
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
        aria-label="Tuesday, April 25, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-25">
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
        aria-label="Wednesday, April 26, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-26">
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
        aria-label="Thursday, April 27, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-27">
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
        aria-label="Friday, April 28, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-28">
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
        aria-label="Saturday, April 29, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-29">
          29
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
        aria-label="Sunday, April 30, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-30">
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
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
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
`;
/* end snapshot calendar/Value Value Is Selected AD/BC selected value should be highlighted Selected value should be highlighted in day view */

snapshots["calendar/Value Value Is Selected AD/BC selected value should be highlighted Selected value should be highlighted in day month"] = 
`<div
  aria-label="Selected date is Friday, April 21, 12"
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
  aria-multiselectable="false"
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
    >
      <div
        aria-label="November 13"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000012-11">
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
        aria-label="December 13"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000012-12">
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
        aria-label="January 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-01">
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
        aria-label="February 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-02">
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
        aria-label="March 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-03">
          Mar
        </slot>
      </div>
    </div>
    <div
      active=""
      aria-selected="true"
      part="cell month"
      role="gridcell"
      selected=""
    >
      <div
        aria-label="Selected: April 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="-000011-04">
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
        aria-label="May 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-05">
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
        aria-label="June 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-06">
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
        aria-label="July 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-07">
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
        aria-label="August 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-08">
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
        aria-label="September 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-09">
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
        aria-label="October 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-10">
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
        aria-label="November 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-11">
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
        aria-label="December 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-12">
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
        aria-label="January 11"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000010-01">
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
        aria-label="February 11"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000010-02">
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
`;
/* end snapshot calendar/Value Value Is Selected AD/BC selected value should be highlighted Selected value should be highlighted in day month */

snapshots["calendar/Value Value Is Selected AD/BC selected value should be highlighted Selected value should be highlighted in day year"] = 
`<div
  aria-label="Selected date is Friday, April 21, 12"
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
  aria-multiselectable="false"
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
    >
      <div
        aria-label="17"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-16">
          17
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="16"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-15">
          16
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="15"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-14">
          15
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="14"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-13">
          14
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
        aria-label="13"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-12">
          13
        </slot>
      </div>
    </div>
    <div
      active=""
      aria-selected="true"
      part="cell year"
      role="gridcell"
      selected=""
    >
      <div
        aria-label="Selected: 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="-11">
          12
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="11"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-10">
          11
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="10"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-9">
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
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="9"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-8">
          9
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="8"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-7">
          8
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="7"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-6">
          7
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="6"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-5">
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
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="5"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-4">
          5
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="4"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-3">
          4
        </slot>
      </div>
    </div>
    <div
      aria-selected="false"
      part="cell year"
      role="gridcell"
    >
      <div
        aria-label="3"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-2">
          3
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
        aria-label="2"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-1">
          2
        </slot>
      </div>
    </div>
  </div>
</div>
<div part="footer">
  <slot name="footer">
  </slot>
</div>
`;
/* end snapshot calendar/Value Value Is Selected AD/BC selected value should be highlighted Selected value should be highlighted in day year */

snapshots["calendar/Value Navigation Value It should be possible to select value on click Selected value should be highlighted when clicked"] = 
`<div
  aria-label="Selected date is Friday, April 1, 2005"
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
      aria-selected="true"
      first-date=""
      part="cell day"
      role="gridcell"
      selected=""
    >
      <div
        aria-label="Selected: Friday, April 1, 2005"
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
        aria-label="Saturday, April 2, 2005"
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
        aria-label="Sunday, April 3, 2005"
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
        aria-label="Monday, April 4, 2005"
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
        aria-label="Tuesday, April 5, 2005"
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
        aria-label="Wednesday, April 6, 2005"
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
        aria-label="Thursday, April 7, 2005"
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
        aria-label="Friday, April 8, 2005"
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
        aria-label="Saturday, April 9, 2005"
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
        aria-label="Sunday, April 10, 2005"
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
        aria-label="Monday, April 11, 2005"
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
        aria-label="Tuesday, April 12, 2005"
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
        aria-label="Wednesday, April 13, 2005"
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
        aria-label="Thursday, April 14, 2005"
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
        aria-label="Friday, April 15, 2005"
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
        aria-label="Saturday, April 16, 2005"
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
        aria-label="Sunday, April 17, 2005"
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
        aria-label="Monday, April 18, 2005"
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
        aria-label="Tuesday, April 19, 2005"
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
        aria-label="Wednesday, April 20, 2005"
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
        aria-label="Thursday, April 21, 2005"
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
        aria-label="Friday, April 22, 2005"
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
        aria-label="Saturday, April 23, 2005"
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
        aria-label="Sunday, April 24, 2005"
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
        aria-label="Monday, April 25, 2005"
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
        aria-label="Tuesday, April 26, 2005"
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
        aria-label="Wednesday, April 27, 2005"
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
        aria-label="Thursday, April 28, 2005"
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
        aria-label="Friday, April 29, 2005"
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
        aria-label="Saturday, April 30, 2005"
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
`;
/* end snapshot calendar/Value Navigation Value It should be possible to select value on click Selected value should be highlighted when clicked */

snapshots["calendar/Value Navigation Value AD/BC It should be possible to select value on click Selected value should be highlighted when clicked"] = 
`<div
  aria-label="Selected date is Saturday, April 1, 12"
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
  aria-multiselectable="false"
  part="table"
  role="grid"
>
  <div
    part="row day-name-row"
    role="row"
  >
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
      aria-selected="true"
      first-date=""
      part="cell day"
      role="gridcell"
      selected=""
    >
      <div
        aria-label="Selected: Saturday, April 1, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="0"
      >
        <slot name="-000011-04-01">
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
      part="cell day"
      role="gridcell"
    >
      <div
        aria-label="Sunday, April 2, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-02">
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
        aria-label="Monday, April 3, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-03">
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
        aria-label="Tuesday, April 4, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-04">
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
        aria-label="Wednesday, April 5, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-05">
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
        aria-label="Thursday, April 6, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-06">
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
        aria-label="Friday, April 7, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-07">
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
        aria-label="Saturday, April 8, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-08">
          8
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
        aria-label="Sunday, April 9, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-09">
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
        aria-label="Monday, April 10, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-10">
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
        aria-label="Tuesday, April 11, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-11">
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
        aria-label="Wednesday, April 12, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-12">
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
        aria-label="Thursday, April 13, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-13">
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
        aria-label="Friday, April 14, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-14">
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
        aria-label="Saturday, April 15, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-15">
          15
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
        aria-label="Sunday, April 16, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-16">
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
        aria-label="Monday, April 17, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-17">
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
        aria-label="Tuesday, April 18, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-18">
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
        aria-label="Wednesday, April 19, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-19">
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
        aria-label="Thursday, April 20, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-20">
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
        aria-label="Friday, April 21, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-21">
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
        aria-label="Saturday, April 22, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-22">
          22
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
        aria-label="Sunday, April 23, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-23">
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
        aria-label="Monday, April 24, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-24">
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
        aria-label="Tuesday, April 25, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-25">
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
        aria-label="Wednesday, April 26, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-26">
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
        aria-label="Thursday, April 27, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-27">
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
        aria-label="Friday, April 28, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-28">
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
        aria-label="Saturday, April 29, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-29">
          29
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
        aria-label="Sunday, April 30, 12"
        part="cell-content selection selectable"
        role="button"
        tabindex="-1"
      >
        <slot name="-000011-04-30">
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
    <div
      part="cell day"
      role="gridcell"
    >
      <div part="cell-content">
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
`;
/* end snapshot calendar/Value Navigation Value AD/BC It should be possible to select value on click Selected value should be highlighted when clicked */

