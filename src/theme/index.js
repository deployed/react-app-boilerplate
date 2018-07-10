// Here define your theme
const theme = {
  palette: {
    background: {
      default: '#222222',
    },
  },
  zIndex: {
    popUp: 1000,
    navigation: 1100,
    sidebar: 1200,
    modal: 1300,
    alert: 1400,
    tooltip: 1500,
  },
  breakpoints: {
    values: {
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    up: (key) => `@media all and (min-width: ${theme.breakpoints.values[key]}px)`,
    between: (minKey, maxKey) => (
      `@media (min-width: ${
        theme.breakpoints.values[minKey]}px) and (max-width: ${
        theme.breakpoints.values[maxKey]}px)`
    ),
  },
};


export default theme;
