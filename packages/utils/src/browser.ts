const isEdge = (/Edge\/\d./i).test(navigator.userAgent);
const isIE = (/Trident/g).test(navigator.userAgent) || (/MSIE/g).test(navigator.userAgent);
const isMobile = (/iPhone|iPad|iPod|Android/i).test(window.navigator.userAgent);

export {
  isEdge,
  isIE,
  isMobile
};
