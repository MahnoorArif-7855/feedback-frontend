import { getSlackChannelsSlice } from '@/state/redux/userProfile/userProfileSlice';
import { Button, Modal, Select } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ChannelListModal = ({ selectedChannel, handleSaveChannelId, user, organizationId }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);
  const [newSelectedChannel, setNewSelectedChannel] = React.useState(selectedChannel);
  const [newSelectedChannelName, setNewSelectedChannelName] = React.useState('');

  const { channelLoading, userSlackChannels, SlackChannelPagination, selectedOrganizationId } = useSelector(
    (state) => state.auth
  );

  const channelOptions = React.useMemo(() => {
    return (
      userSlackChannels &&
      userSlackChannels
        ?.filter((channel) => channel)
        .map(({ channelId, channelName }) => ({
          label: '#' + channelName,
          value: channelId,
          name: channelName, // Add the channel name here for easy reference
        }))
    );  
  }, [userSlackChannels]);

  const handleLoadMore = React.useCallback(() => {
    if ((selectedOrganizationId || organizationId) && user) {
      dispatch(
        getSlackChannelsSlice({
          user,
          SlackChannelPagination,
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        })
      );
    }
  }, [SlackChannelPagination, dispatch, organizationId, selectedOrganizationId, user]);

  const handleSave = React.useCallback(() => {
    handleSaveChannelId({ newSelectedChannel, newSelectedChannelName }); // Pass both the channel ID and name
    setIsOpen(false);
  }, [handleSaveChannelId, newSelectedChannel, newSelectedChannelName]);

  const handleChannel = React.useCallback(
    (id, option) => {
      if (id && option) {
        setNewSelectedChannel(id);
        setNewSelectedChannelName(option.name); // Set the channel name
      }
    },
    [channelOptions]
  );

  const loadMoreButton = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {SlackChannelPagination ? (
          <Button type='default' size='small' onClick={handleLoadMore} loading={channelLoading}>
            Load more channels
          </Button>
        ) : (
          'No more channels found'
        )}
      </div>
    );
  };

  return (
    <>
      <Modal
        title='Weekly Digest Channel'
        open={isOpen}
        onOk={handleSave}
        onCancel={() => setIsOpen(false)}
        okText='Save channel'
      >
        {loadMoreButton()}
        <Select
          size='large'
          style={{ width: '100%', margin: '12px 0' }}
          showSearch
          placeholder='Select a channel'
          defaultValue={selectedChannel}
          value={newSelectedChannel}
          options={channelOptions}
          onChange={handleChannel}
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
        />
      </Modal>
      <Button onClick={() => setIsOpen(true)}>Change</Button>
    </>
  );
};
