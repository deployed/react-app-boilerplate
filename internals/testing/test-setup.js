window.matchMedia = window.matchMedia || function test() {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};
