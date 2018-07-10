import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import RedirectWithStatus from 'utils/RedirectWithStatus';
import HomeViewLoadable from 'containers/HomeView/Loadable';
import NotFoundViewLoadable from 'containers/NotFoundView/Loadable';


const App = () => (
  <ErrorBoundary
    FallbackComponent={() => 'Error occurred!'}
  >
    <Switch>
      <Route
        exact
        strict
        path="/:url*"
        // Add missing trailing slashes and redirect
        render={({ location, staticContext }) => (
          <RedirectWithStatus
            staticContext={staticContext}
            status={301}
            from={location.pathname}
            to={`${location.pathname}/`}
          />
        )}
      />
      <Route exact path="/" component={HomeViewLoadable} />
      <Route component={NotFoundViewLoadable} />
    </Switch>
  </ErrorBoundary>
);

export default App;
