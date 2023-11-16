/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["slider/Slider Snapshots DOM structure is correct"] = 
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
      <slot>
      </slot>
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
/* end snapshot slider/Slider Snapshots DOM structure is correct */

snapshots["slider/Slider Snapshots DOM structure with markers is correct"] = 
`<ef-slider-marker
  style="left: 0%;"
  value="0"
>
  0
</ef-slider-marker>
<ef-slider-marker
  style="left: 10%;"
  value="10"
>
  10
</ef-slider-marker>
<ef-slider-marker
  style="left: 50%;"
  value="50"
>
</ef-slider-marker>
<ef-slider-marker
  style="left: 100%; transform: translateX(-100%);"
  value="100"
>
  100
</ef-slider-marker>
`;
/* end snapshot slider/Slider Snapshots DOM structure with markers is correct */

