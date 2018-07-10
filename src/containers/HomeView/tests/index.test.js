import React from 'react';
import { shallow } from 'enzyme';

import HomeView from '../index';


describe('<HomeView />', () => {
  it('match snapshot', () => {
    const renderedComponent = shallow(
      <HomeView />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
