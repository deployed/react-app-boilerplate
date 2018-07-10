import React from 'react';
import { Route } from 'react-router-dom';

import mountWithData from 'tests/utils/mountWithData';
import {
  session,
  cookiesPolicy,
  routing,
} from 'tests/mockStores';

import App from '../index';


describe('<App />', () => {
  test('renders without exploding', async () => {
    const renderedComponent = await mountWithData(
      <App />,
      {
        options:
          {
            withTheme: true,
            withIntl: true,
            withRouter: true,
          },
        mocks: [],
        stores: { session, cookiesPolicy, routing },
      },
    );
    expect(renderedComponent.find(Route).length).toBeGreaterThan(0);
  });
});
