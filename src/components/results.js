import React from 'react';
import PropTypes from 'prop-types';
const Results = ({data}) => {
  return (
      <div className="row">
         <h2>{data}</h2>
         <p>{data}</p>
      </div>
  );
};
export default Results;
