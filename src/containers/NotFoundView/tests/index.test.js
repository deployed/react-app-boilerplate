import React from 'react';
import { shallow } from 'enzyme';

import NotFoundView from '../index';


describe('<NotFoundView />', () => {
  it('match snapshot', () => {
    const renderedComponent = shallow(
      <NotFoundView />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
