import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const FeedbackTagsDropDown = ({ tags, handleFeedbackTags }) => {
  const [feedbackTags, setFeedbackTags] = useState([]);

  useEffect(() => {
    if (tags?.length) {
      const tagsArr = tags?.map((tag) => {
        return {
          value: tag,
          label: tag,
        };
      });
      setFeedbackTags(tagsArr);
    }
  }, [tags]);

  return (
    <>
      <Select
        size='large'
        mode='multiple'
        placeholder='Please select tags'
        listHeight={950}
        listItemHeight={400}
        style={{
          width: 285,
          // height: '300px'
        }}
        // defaultValue={['']}
        onChange={handleFeedbackTags}
        options={feedbackTags}
      />
    </>
  );
};

export default FeedbackTagsDropDown;
