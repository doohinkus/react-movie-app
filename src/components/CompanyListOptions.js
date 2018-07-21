import React from 'react';
import PropTypes from 'prop-types';


const CompanyListOptions = ({companies, action}) => {
  return (
    <select className="custom-select mb-2 mr-sm-2" onChange={action}>
      <option value="null">Make Selection</option>
      {companies.map(company => {
        return (
          <option value={company.id}>{company.name}</option>
        )
      })}
    </select>
  )
};
export default CompanyListOptions;
