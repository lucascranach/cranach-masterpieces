const getLayoutType = (ratio) => {
  switch (true) {
    case ratio > 1.2:
      return 'landscape';
    case ratio < 0.8:
      return 'portrait';
    default:
      return 'square';
  }
};

const getRatioClass = (ratio) => {
  switch (true) {

    case ratio > 1.6:
      return 'ratio-2-to-1';
    case ratio > 1.2:
      return 'ratio-4-to-3';
    case ratio < 0.6:
        return 'ratio-1-to-2';
    case ratio < 0.8:
      return 'ratio-3-to-4';
    default:
      return 'ratio-1-to-1';
  }
}


module.exports = { getLayoutType, getRatioClass };