import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


/**
 * ReactRouter redirect with status ssr helper
 */
function RedirectWithStatus({ from, to, status, staticContext }) {
  if (staticContext) {
    // eslint-disable-next-line no-param-reassign
    staticContext.status = status;
  }
  return <Redirect from={from} to={to} />;
}

RedirectWithStatus.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  staticContext: PropTypes.object,
};


export default RedirectWithStatus;
