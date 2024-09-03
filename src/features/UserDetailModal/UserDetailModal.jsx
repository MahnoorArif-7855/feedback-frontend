import { ACCOUNT_DELETE, DELETED_ACCOUNT_TITLE } from '@/common/utils/constant';
import { deleteUserAccount } from '@/state/redux/settings/settingSlice';
import { getAllUsersInfoSlice, userTypeUpdateSlice } from '@/state/redux/userProfile/userProfileSlice';
import { DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { Divider, Modal, Select, Spin, Table, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import FetchUserData from '../../common/components/FetchUserData';
import { UserDetailModalStyled } from './UserDetailModal.styled';

const { Text } = Typography;
const { confirm } = Modal;

const UserDetailModal = ({ loading, feedbackLength, record, isModalOpen, setIsModalOpen, user, customerId }) => {
  const dispatch = useDispatch();

  const handleOk = async () => {
    user &&
      (
        await user.getIdToken(/* forceRefresh */ true).then(async (token) => {
          await dispatch(getAllUsersInfoSlice({ user: token }));
        })
      ).catch((error) => {
        console.log('error in UserManagementModal ', error);
      });

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const options = [
    {
      value: 'user',
      label: 'User',
    },
    {
      value: 'admin',
      label: 'Admin',
    },
    {
      value: 'manager',
      label: 'Manager',
    },
  ];

  const handleChange = (value, userId) => {
    dispatch(userTypeUpdateSlice({ user, type: value, uid: userId }));
    // setUserType(value);
  };

  const deleteUser = (value) => {
    confirm({
      className: 'confirm',
      title: DELETED_ACCOUNT_TITLE(value?.userName),
      icon: <ExclamationCircleOutlined />,
      content: ACCOUNT_DELETE,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(
          deleteUserAccount({
            user,
            uid: value.userId,
            customerId,
            organizationId: value.organizationId,
          })
        );
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Email',

      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => {
        return (
          <Select
            defaultValue={record?.type}
            onChange={(value) => handleChange(value, record?.userId)}
            // onSelect={() => onSelectValue(record?.userId)}
            options={options}
            style={{
              width: '100%',
            }}
          />
        );
      },
    },
    {
      title: 'Firebase Last login',
      dataIndex: 'last-login',
      key: 'last-login',
      render: (text, record) => {
        return <FetchUserData userId={record?.userId} />;
      },
    },
    {
      title: 'Last Activity',
      dataIndex: 'lastActivity',
      key: 'lastActivity',
      render: (text, record) => {
        const { lastActivity, lastActivityDate } = record;
        if (lastActivity && lastActivityDate) {
          return (
            <div>
              <div>{`${lastActivity} (${new Date(lastActivityDate).toDateString()})`}</div>
            </div>
          );
        } else {
          return <div>N/A</div>;
        }
      },
    },

    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      ellipsis: true,
      fixed: 'right',
      render: (text, record) => (
        <DeleteTwoTone twoToneColor='rgb(242, 140, 111)' className='delete-icon' onClick={() => deleteUser(record)} />
      ),
    },
  ];
  return (
    <>
      <UserDetailModalStyled
        title='Edit user details'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Text className='description'>Edit user details help you organize your work</Text>
        <Divider />
        <Text>
          Number of feedbacks:{' '}
          {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 12 }} spin />} /> : feedbackLength}
        </Text>
        <Divider />
        <Table columns={columns} dataSource={record} pagination={false} />
      </UserDetailModalStyled>
    </>
  );
};
export default UserDetailModal;
