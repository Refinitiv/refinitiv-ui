const { optimize } = require('svgo');

const encodeHtmlToBase64 = (input) => Buffer.from(input).toString('base64');
const encodeHtmlEntities = (input) => encodeURIComponent(input);
const optimizeSvg = (input) => optimize(input).data;

const wrapAndEncodeSvgToBase64 = (svgCode) =>
  `url("data:image/svg+xml;base64,${encodeHtmlToBase64(optimizeSvg(svgCode))}")`;

const wrapSvg = (svgCode) => `url('data:image/svg+xml;charset=UTF-8,${optimizeSvg(svgCode)}')`;

const wrapAndEncodeSvg = (svgCode) => wrapSvg(encodeHtmlEntities(svgCode));

const encoderWrappers = {
  base64: wrapAndEncodeSvgToBase64,
  encode: wrapAndEncodeSvg
};

const encodeAndWrapWithEnvelope = (svgCode, encoder) => {
  const wrapAndEncode = encoderWrappers[encoder] || wrapSvg;

  return wrapAndEncode(svgCode);
};

module.exports = encodeAndWrapWithEnvelope;
