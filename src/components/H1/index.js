import React from 'react';
import PropTypes from 'prop-types';


export default function H1({ children, ...props }) {
  return (
    <h1 {...props}>
      {children}
    </h1>
  );
}

H1.propTypes = {
  children: PropTypes.node.isRequired,
};
