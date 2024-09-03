import { firebaseAuth } from '@/../firebase';
import {
  ACCOUNT_DELETE,
  ADMIN_EMAIL,
  DELETED_ACCOUNT_TITLE,
  DISCONNECT_SLACK_APP,
  DISCONNECT_SLACK_FROM_WEBAPP,
  RESET_DATA,
  RESET_DATA_TEXT,
  UNINSTALL_SLACK_APP,
  UNINSTALL_SLACK_APP_TEXT,
} from '@/common/utils/constant';
import {
  deleteUserAccount,
  disconnectSlackApp,
  resetOrgData,
  uninstallSlackApp,
} from '@/state/redux/settings/settingSlice';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Space } from 'antd';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { event } from 'nextjs-google-analytics';
import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

const { confirm } = Modal;

export const AccountSettings = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [user] = useAuthState(firebaseAuth);
  const [isDataDeleting, setIsDataDeleting] = useState(false);

  const { authDetails, organizationInfo } = useSelector((state) => state.auth);
  const { deletedUser } = useSelector((state) => state.settings);

  const { userName, organizationId, organizationDetails, userId: currentUser, email, type } = authDetails || {};
  const { customerId } = organizationInfo || { customerId: null };

  const { userId } = organizationDetails[0] || { userId: null };

  const orgName = organizationInfo?.organizationName;

  useEffect(() => {
    if (deletedUser) {
      signOut(firebaseAuth);
      router.push('/signin');
    }
  }, [deletedUser]);

  const handleDeleteUserClick = () => {
    const { uid } = user || { uid: null };
    event('delete_account', { userId: uid });
    confirm({
      className: 'confirm',
      title: DELETED_ACCOUNT_TITLE(userName),
      icon: <ExclamationCircleOutlined />,
      content: ACCOUNT_DELETE,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteUserAccount({ user, uid, customerId, organizationId }));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDisconnectAppClick = () => {
    const { uid } = user || { uid: null };
    event('token_revoke', { userId: uid });
    confirm({
      className: 'confirm',
      title: DISCONNECT_SLACK_FROM_WEBAPP(),
      icon: <ExclamationCircleOutlined />,
      content: DISCONNECT_SLACK_APP,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(disconnectSlackApp({ user, uid, organizationId }));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const handleUnInstallAppClick = () => {
    const { uid } = user || { uid: null };
    event('unistall_app', { userId: uid });
    confirm({
      className: 'confirm',
      title: UNINSTALL_SLACK_APP(),
      icon: <ExclamationCircleOutlined />,
      content: UNINSTALL_SLACK_APP_TEXT,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(uninstallSlackApp({ user, uid, organizationId, setIsDataDeleting }));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const _resetData = useCallback(() => {
    if (organizationId) {
      confirm({
        className: 'confirm',
        title: RESET_DATA(orgName),
        icon: <ExclamationCircleOutlined />,
        content: RESET_DATA_TEXT,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          setIsDataDeleting(true);
          const resp = await dispatch(
            resetOrgData({
              organizationId,
              user,
              router,
              setIsDataDeleting,
            })
          );
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }, [organizationId]);

  return (
    <Space direction='vertical' style={{ display: 'flex' }}>
      <Card title='Delete Account'>
        <p
          style={{
            color: 'red',
            marginBottom: '10px',
          }}
        >
          Your organization account will be deleted permanently.
        </p>
        <Button type='primary' danger onClick={handleDeleteUserClick}>
          Delete Account
        </Button>
      </Card>
      {currentUser === userId && (
        <Card title='Disconect App for Slack'>
          <p
            style={{
              color: 'red',
              marginBottom: '10px',
            }}
          >
            Disconnect Slack app to web app.
          </p>
          <Button type='primary' danger onClick={handleDisconnectAppClick}>
            Disconnect app
          </Button>
        </Card>
      )}
      {currentUser === userId && (
        <Card title='Uninstall App for Slack'>
          <p
            style={{
              color: 'red',
              marginBottom: '10px',
            }}
          >
            Your want to uninstall your Slack app?
          </p>
          <Button type='primary' danger onClick={handleUnInstallAppClick}>
            Uninstall app
          </Button>
        </Card>
      )}
      {(type === 'admin' || ADMIN_EMAIL.includes(email)) && (
        <Card
          title='All data will be completely reset and redirected to the login
              page.'
        >
          <p
            style={{
              color: 'red',
              marginBottom: '10px',
            }}
          >
            Your want to reset your Slack data?
          </p>
          <Button type='primary' danger onClick={_resetData}>
            Reset Data
          </Button>
        </Card>
      )}
    </Space>
  );
};
