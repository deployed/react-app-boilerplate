import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';

/**
 * https://github.com/styled-components/jest-styled-components
 */
export default function shallowWithTheme(tree) {
  const context = shallow(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext();
  return shallow(tree, { context });
}
