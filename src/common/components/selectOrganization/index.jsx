import { Select } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const SelectOrganization = ({ handleChange, organizations }) => {
  const { selectedOrganizationId } = useSelector((state) => state.auth);
  return (
    <Select
      labelInValue
      placeholder='Select Organization'
      className='select-org'
      onChange={handleChange}
      allowClear
      value={selectedOrganizationId}
      style={{ width: '300px' }}
      options={organizations?.map(({ organizationId, organizationName }) => {
        return {
          value: organizationId,
          label: organizationName,
        };
      })}
    />
  );
};

export default SelectOrganization;
