export const routing = {
  push: jest.fn(),
  replace: jest.fn(),
  go: jest.fn(),
  goBack: jest.fn(),
  goForward: jest.fn(),
  location: {
    pathname: 'test',
    search: '?test=test',
  },
  history: {
    push: jest.fn(),
    replace: jest.fn(),
  },
};

export const session = {
  refreshToken: jest.fn(),
  isAuthenticated: false,
};

export const cookiesPolicy = {
  cookieName: 'cookieChecked',
  cookieChecked: true,
  setCookieChecked: jest.fn(),
};
