import { Select } from 'antd';
import React from 'react';

import categoryOptions from '../../../../common/utils/content/categoryOption.json';

const CategoryDropDown = ({ setCategoryFilter }) => {
  const handleChange = (value) => {
    setCategoryFilter(value);
  };

  return (
    <>
      <Select
        mode='multiple'
        placeholder='Please select category'
        style={{
          width: 285,
          // margin: 8,
        }}
        defaultValue={['bugs', 'churn']}
        onChange={handleChange}
        options={categoryOptions}
      />
    </>
  );
};

export default CategoryDropDown;
