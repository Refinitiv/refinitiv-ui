const encodeHtmlToBase64 = (input) => {
  return Buffer.from(input).toString('base64');
};

const encodeHtmlEntities = (input) => {
  return encodeURIComponent(input);
};

const optimizeSvg = (input) => {
  return input.replace(/\s*\n\s*/g, '');
};

const wrapAndEncodeSvgToBase64 = (svgCode) => {
  return `url("data:image/svg+xml;base64,${encodeHtmlToBase64(svgCode)}")`;
};

const wrapSvg = (svgCode) => {
  return `url('data:image/svg+xml;charset=UTF-8,${optimizeSvg(svgCode)}')`;
};

const wrapAndEncodeSvg = (svgCode) => {
  return wrapSvg(encodeHtmlEntities(svgCode));
};

const encoderWrappers = {
  base64: wrapAndEncodeSvgToBase64,
  encode: wrapAndEncodeSvg
};

const encodeAndWrapWithEnvelope = (svgCode, encoder) => {
  const wrapAndEncode = encoderWrappers[encoder] || wrapSvg;
  return wrapAndEncode(svgCode);
};

export default encodeAndWrapWithEnvelope;
