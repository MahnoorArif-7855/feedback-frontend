import ChannelsDropDown from '@/common/ui/DropDowns/ChannelsDropdown';
import { UPDATE_ORGANIZATION_CHANNEL_ID } from '@/state/graphQL/Mutation';
import { organizationDetails } from '@/state/redux/userProfile/userProfileSlice';
import { ChangeModalState } from '@/state/redux/userProfile/userProfileSlice';
import { useMutation } from '@apollo/client';
import { Button, notification } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import ChannelModalStyled from './styled';

const ChannelModal = ({ isModalOpen, setIsModalOpen, userSlackChannels, organizationId }) => {
  const [slackChannelId, setSlackChannelId] = useState('');
  const [slackChannelName, setSlackChannelName] = useState('');
  const [isChannelIdSaving, setIsChannelIdSaving] = useState(false);

  const dispatch = useDispatch();

  const [updateOrganizationChannelId] = useMutation(UPDATE_ORGANIZATION_CHANNEL_ID, {
    onCompleted: (data) => {
      dispatch(organizationDetails(data?.updateOrganizationChannelId[0]));
      notification.success({
        message: 'Organization channel updated',
        type: 'success',
      });
      setIsChannelIdSaving(false);
      setIsModalOpen(false);
      console.log('Successfully updated organization');
    },
    onError: (error) => {
      notification.error({
        message: 'Error updating organization channel',
        type: 'error',
      });
      setIsChannelIdSaving(false);
      console.error('Error updating organization:', error);
    },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(ChangeModalState());
  };

  const handleChannel = useCallback(
    (id, option) => {
      if (id && option) {
        setSlackChannelId(id);
        setSlackChannelName(option?.label);
      }
    },
    [setSlackChannelId]
  );

  const handleSaveChannelId = useCallback(() => {
    if (slackChannelId && slackChannelName) {
      setIsChannelIdSaving(true);
      updateOrganizationChannelId({
        variables: {
          organizationId,
          channelId: slackChannelId,
          channelName: slackChannelName,
        },
      });
    }
  }, [slackChannelId, slackChannelName, setIsChannelIdSaving, updateOrganizationChannelId]);

  return (
    <>
      <ChannelModalStyled
        open={isModalOpen}
        // title='Update your organization channel'
        onOk={handleSaveChannelId}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Ask later
          </Button>,

          <Button key='link' type='primary' loading={isChannelIdSaving} onClick={handleSaveChannelId}>
            Save
          </Button>,
        ]}
      >
        <div>
          <div className='title'>Select Channel </div>
          <div className='updates'>
            Automatically share a summary analysis with your team directly into Slack by enabling a Slack channel.
          </div>
          <div className='channelDropdown'>
            <ChannelsDropDown channels={userSlackChannels} handleChannel={handleChannel} />
          </div>
        </div>
      </ChannelModalStyled>
    </>
  );
};
export default ChannelModal;
