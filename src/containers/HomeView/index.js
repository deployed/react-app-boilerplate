import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { Header, ReactLogo } from './styles';


function Home() {
  return (
    <React.Fragment>
      <Header>
        <ReactLogo />
        <FormattedMessage {...messages.header}>
          {(txt) => (
            <h1>
              {txt}
            </h1>
          )}
        </FormattedMessage>
      </Header>
    </React.Fragment>
  );
}

export default Home;
