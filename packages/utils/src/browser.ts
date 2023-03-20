const isEdge = (/Edge\/\d./i).test(navigator.userAgent);
const isMobile = (/iPhone|iPad|iPod|Android/i).test(window.navigator.userAgent);

export {
  isEdge,
  isMobile
};
