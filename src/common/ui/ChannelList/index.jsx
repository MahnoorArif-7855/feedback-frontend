import { Skeleton } from 'antd';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { ChannelListModal } from './ChannelListModal';
import { SelectedChannelWrapper } from './styled';

const OrganizationChannelList = ({
  selectedChannel,
  handleSaveChannelId,
  selectedChannelName,
  user,
  organizationId,
}) => {
  const { channelLoading } = useSelector((state) => state.auth);

  return (
    <SelectedChannelWrapper>
      <div>
        <label>Selected weekly digest channel</label>
        {selectedChannel ? (
          <h3>
            {channelLoading ? <Skeleton.Button active style={{ height: '18px' }} /> : <>#{selectedChannelName}</>}{' '}
            <code>{selectedChannel}</code>
          </h3>
        ) : (
          <div>Not selected</div>
        )}
      </div>
      <div>
        <ChannelListModal
          selectedChannel={selectedChannel}
          handleSaveChannelId={handleSaveChannelId}
          user={user}
          organizationId={organizationId}
        />
      </div>
    </SelectedChannelWrapper>
  );
};

export default OrganizationChannelList;
