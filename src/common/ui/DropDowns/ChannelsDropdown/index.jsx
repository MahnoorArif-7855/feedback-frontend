import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const ChannelsDropDown = ({ channels, handleChannel, defaultValue }) => {
  const [slackChannels, setSlackChannels] = useState([]);
  useEffect(() => {
    if (channels?.length) {
      const channelArr = channels?.map((channel) => {
        return {
          value: channel.channelId,
          label: channel.channelName,
        };
      });
      setSlackChannels(channelArr);
    } else {
      setSlackChannels([]);
    }
  }, [channels]);

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Select
        key={defaultValue}
        showSearch
        size='large'
        placeholder='Please select channel'
        style={{
          width: '100%',
          marginRight: '2em',
          marginBottom: '2em',
        }}
        defaultValue={defaultValue}
        onChange={handleChannel}
        options={slackChannels}
        filterOption={filterOption}
      />
    </>
  );
};

export default ChannelsDropDown;
