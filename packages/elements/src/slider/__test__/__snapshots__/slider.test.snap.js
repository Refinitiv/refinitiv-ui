/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["slider/Slider DOM structure is correct"] = 
`<div part="slider-wrapper">
  <div part="slider">
    <div part="track-wrapper">
      <div
        part="track-fill"
        style="width:0%;"
      >
      </div>
      <div
        part="step-container"
        style="transform:translateX(-0.5%);"
      >
        <div
          part="step"
          style="transform:translateX(0.5%);background-size:1% 100%;"
        >
        </div>
      </div>
    </div>
    <div
      aria-label="Value"
      aria-valuemax="100"
      aria-valuemin="0"
      aria-valuenow="0"
      name="value"
      part="thumb-container"
      role="slider"
      style="left:0%;"
      tabindex="1"
    >
      <div part="pin">
        <span part="pin-value-marker">
          0
        </span>
      </div>
      <div
        draggable="true"
        part="thumb"
      >
      </div>
    </div>
  </div>
</div>
`;
/* end snapshot slider/Slider DOM structure is correct */

