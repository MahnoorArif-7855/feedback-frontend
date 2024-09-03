import { ContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import UserManagementStyled from '@/common/styles/UserManagementStyled';
import { FREE_ID, PREMIUM_PLAN } from '@/common/utils/constant';
import { capitalizeFirstLetter } from '@/common/utils/func';
import UserDetailModal from '@/features/UserDetailModal/UserDetailModal';
import { FIND_FEEDBACKS_BY_ORG_ID } from '@/state/graphQL/Queries';
import store from '@/state/redux/store';
import { adminDetailsSlice, getAllUsersInfoSlice } from '@/state/redux/userProfile/userProfileSlice';
import { useLazyQuery } from '@apollo/client';
import { Card, Col, Row, Statistic, Table, Typography } from 'antd';
import Image from 'next/image';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../firebase';
import editImage from '../../../../public/images/edit.png';

const { Text } = Typography;

const Management = ({ organizations, users }) => {
  const [user] = useAuthState(firebaseAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRecord, setUserRecord] = useState();
  const [feedbackLength, setFeedbackLength] = useState();
  const [organizationsubscriptionId, setOrganizationsubscriptionId] = useState(null);

  const { allUsers } = useSelector((state) => state.auth);

  const [feedbacksCheck, { data, error, loading }] = useLazyQuery(FIND_FEEDBACKS_BY_ORG_ID);

  useEffect(() => {
    if (data && !error) {
      setFeedbackLength(data?.findFeedbacksByOrganizationId?.length);
    }
  }, [data, error]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const freePlanOrganization =
    organizations && organizations.filter((organizationInfo) => organizationInfo?.plan === FREE_ID);
  const premiumPlanOrganization =
    organizations && organizations.filter((organizationInfo) => organizationInfo?.plan === PREMIUM_PLAN);
  const appInstall =
    organizations && organizations.filter((organizationInfo) => organizationInfo?.appInstallation === true);

  const editButton = async (record) => {
    setUserRecord(record?.userInfo);
    setOrganizationsubscriptionId(record?.customerId);
    await showModal();
    await feedbacksCheck({
      variables: {
        organizationId: record?.organizationId,
      },
    });
  };

  const columns = [
    {
      title: 'Organization Name',
      dataIndex: 'organizationName',
      key: 'organizationName',
    },
    {
      title: 'Organization ID',
      dataIndex: 'organizationId',
      key: 'organizationId',
    },

    {
      title: 'Plan',

      dataIndex: 'plan',
      key: 'plan',
      render: (text, record) => <Text>{capitalizeFirstLetter(record?.plan)}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <Text>{capitalizeFirstLetter(record?.status)}</Text>,
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      render: (text, record) => <Text>{record?.userInfo?.length}</Text>,
    },
    {
      title: 'Search Counts',
      dataIndex: 'searchCount',
      key: 'searchCount',
    },
    {
      title: 'App Installation',
      dataIndex: 'appInstallation',
      key: 'appInstallation',
      render: (text, record) => {
        return (
          <Text>
            {record?.appInstallation
              ? new Date(record?.date).toDateString() + `(${record?.appStatus})`
              : record?.appStatus
                ? new Date(record?.date).toDateString() + `(${record?.appStatus})`
                : record?.appStatus}
          </Text>
        );
      },
    },

    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      ellipsis: true,
      fixed: 'right',
      render: (text, record) => (
        <Image
          alt='edit-image'
          className='edit-user'
          height={20}
          width={20}
          src={editImage}
          onClick={() => editButton(record)}
        />
      ),
    },
  ];

  return (
    <PageLayout title='Users'>
      <ContentWrapper>
        <UserManagementStyled>
          {/* <Card> */}
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card>
                <Statistic title='Total Active User' value={users && users.length} />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic title='Total App Installation' value={appInstall && appInstall.length} />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title='Free Plan Organizations'
                  value={freePlanOrganization && freePlanOrganization.length}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title='Premium Plan Organizations'
                  value={premiumPlanOrganization && premiumPlanOrganization.length}
                />
              </Card>
            </Col>
          </Row>
          {/* </Card> */}
          <div className='users-Table'>
            <Table
              columns={columns}
              dataSource={allUsers.length > 0 ? allUsers : organizations}
              scroll={{
                x: 1200,
              }}
              pagination={false}
            />
          </div>
          <UserDetailModal
            loading={loading}
            feedbackLength={feedbackLength}
            record={userRecord}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            user={user}
            customerId={organizationsubscriptionId}
          />
        </UserManagementStyled>
      </ContentWrapper>
    </PageLayout>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  await store.dispatch(getAllUsersInfoSlice({ user: cookies?.token }));
  await store.dispatch(adminDetailsSlice({ user: cookies?.token }));
  const state = await store.getState();

  const { auth } = state;

  return { props: { organizations: auth?.allUsers, users: auth?.UsersInfo } };
}

export default Management;
