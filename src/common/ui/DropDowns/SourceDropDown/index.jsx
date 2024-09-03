import { feedbackSources } from '@/common/utils/constant';
import { Select } from 'antd';
import React from 'react';

const SourceDropdown = ({ handleSource }) => {
  return (
    <>
      <Select
        size='large'
        mode='multiple'
        placeholder='Please select source'
        listHeight={950}
        listItemHeight={400}
        style={{
          width: 285,
          // height: '300px'
        }}
        // defaultValue={['']}
        onChange={handleSource}
        options={feedbackSources}
      />
    </>
  );
};

export default SourceDropdown;
