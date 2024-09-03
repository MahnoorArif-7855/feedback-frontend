/* eslint-disable react-hooks/rules-of-hooks */
import { SettingStyled } from '@/common/styles/settingStyled';
import { ADMIN_EMAIL } from '@/common/utils/constant';
import { UPDATE_ORGANIZATION } from '@/state/graphQL/Mutation';
import { GET_ORGANIZATIONS } from '@/state/graphQL/Queries';
import { useMutation, useQuery } from '@apollo/client';
import { Card, Col, Switch, Typography, notification } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const { Text } = Typography;

const premiumaccess = () => {
  const { authDetails } = useSelector((state) => state.auth);
  const [organizations, setOrganizations] = useState(null);
  const { email, type } = authDetails || {
    email: null,
    type: null,
  };

  const { data, error, loading } = useQuery(GET_ORGANIZATIONS);

  const [updateOrganization] = useMutation(UPDATE_ORGANIZATION, {
    onCompleted: (data) => {
      updateOrganizationIndex(data?.updateOrganization[0]);
      notification.success({
        message: 'Organization updated successfully',
        type: 'success',
      });
    },
    onError: (error) => {
      notification.error({
        title: 'Error updating organization',
        type: 'error',
      });
    },
  });

  useEffect(() => {
    if (data && !error && !loading) {
      setOrganizations(data?.getOrganizations);
    }
  }, [data, error, loading]);
  const _handleOrganization = useCallback(
    (e, orgId) => {
      updateOrganization({
        variables: { organizationId: orgId, allowPaidPlan: e },
      });
    },
    [updateOrganization]
  );

  const updateOrganizationIndex = (organization) => {
    // Find the index of the element you want to update
    const index = organizations.findIndex((item) => item.organizationId === organization?.organizationId);

    if (index !== -1) {
      // Create a new array with the updated element
      const updatedArray = [...organizations];
      updatedArray[index] = organization;

      // Set the updated array in the state
      setOrganizations(updatedArray);
    }
  };
  return (
    (type === 'admin' || ADMIN_EMAIL.includes(email)) && (
      <div style={{ padding: '0px 3rem', overflow: 'scroll' }}>
        <br />
        <br />
        <Card
          key='org-plan'
          title='Allow Premium Features Access'
          style={{
            width: '100%',
          }}
        >
          {organizations?.map((org, i) => {
            const allowedPlan = org?.allowPaidPlan;
            return (
              <SettingStyled key={i}>
                <Text>{`${org?.organizationName} : `} </Text>
                <Switch onChange={(props) => _handleOrganization(props, org?.organizationId)} checked={allowedPlan} />
              </SettingStyled>
            );
          })}
        </Card>
      </div>
    )
  );
};

export default premiumaccess;
