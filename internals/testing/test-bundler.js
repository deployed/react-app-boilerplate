// needed for regenerator-runtime
import 'babel-polyfill';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-react-adapter-future';
// https://github.com/styled-components/jest-styled-components#global-installation
import 'jest-styled-components';

import { runtimeConfig } from 'settings';


Enzyme.configure({ adapter: new Adapter() });

window.env = runtimeConfig;
