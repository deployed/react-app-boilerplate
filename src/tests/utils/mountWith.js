import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';

import theme from 'theme';

import { mountWithIntl } from './intlTestHelper';


/**
 * Helper function that mounts component with optionally included theme and intl contexts.
 */
export default function mountWith(tree, {
  withTheme = false,
  withIntl = false,
  withRouter = false,
  stores = {},
  customTheme = null,
}) {
  let context = {};
  let childContextTypes = {};
  if (withTheme) {
    context = shallow(<ThemeProvider theme={customTheme || theme} />).instance().getChildContext();
    childContextTypes = ThemeProvider.childContextTypes; // eslint-disable-line prefer-destructuring
  }
  const chosenMount = withIntl ? mountWithIntl : mount;

  let toRender = tree;
  if (withRouter) {
    toRender = (
      <MemoryRouter keyLength={0}>
        {toRender}
      </MemoryRouter>
    );
  }
  if (Object.keys(stores).length) {
    toRender = (
      <Provider {...stores}>
        {toRender}
      </Provider>
    );
  }

  return chosenMount(toRender, { context, childContextTypes });
}
