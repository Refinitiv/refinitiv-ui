const tabSliderPosition = (el, percentValue) => {
  return (el.offsetWidth * percentValue) / 100 + el.offsetLeft;
};

const calculateValue = (el, mouseX) => {
  if (Number(el.min) % 1 !== 0 || Number(el.step) % 1 !== 0) {
    // Get decimal places when step or min have decimal
    const minDecimalPlaces =
      el.min.split('.').length > 1 ? el.min.split('.')[1].length : 0;
    const stepDecimalPlaces =
      el.step.split('.').length > 1 ? el.step.split('.')[1].length : 0;
    let decimalPlaces =
      stepDecimalPlaces > minDecimalPlaces
        ? stepDecimalPlaces
        : minDecimalPlaces;

    // Calculate drag step value
    const value = calculateDragValue(el, mouseX, decimalPlaces);

    // Display value
    let displayValue = '';
    const valueDecimalCount =
      value.toString().split('.').length > 1
        ? value.toString().split('.')[1].length
        : 0;
    if (valueDecimalCount > decimalPlaces) {
      displayValue = value.toFixed(decimalPlaces).toString();
    } else {
      displayValue = value.toFixed(valueDecimalCount).toString();
    }
    return Number(displayValue);
  } else {
    return calculateDragValue(el, mouseX);
  }
};

const calculateDragValue = (el, mouseX, decimalPlaces) => {
  decimalPlaces |= 0;
  // Calculate step value
  const stepSize = Math.abs(
    ((el.minNumber + el.stepNumber || 0) - el.minNumber) /
      (el.maxNumber - el.minNumber)
  );
  const thumbPos = (mouseX - el.offsetLeft) / el.offsetWidth;
  const posToFixStep = Math.round(thumbPos / stepSize) * stepSize;
  let value;
  if (thumbPos <= posToFixStep + stepSize / 2) {
    if (posToFixStep <= 1) {
      value = posToFixStep;
    } else {
      value = posToFixStep - stepSize;
    }
  } else {
    value = posToFixStep + stepSize;
  }

  // Calculate step to value
  return el.minNumber + value * (el.maxNumber - el.minNumber);
};


export { tabSliderPosition, calculateValue }
