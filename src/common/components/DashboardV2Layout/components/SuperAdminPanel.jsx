import SelectOrganization from '@/common/components/selectOrganization';
import { selectOrganizationId } from '@/state/redux/userProfile/userProfileSlice';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const SuperAdminPanelWrapper = styled.div`
  display: flex;
  padding: 0 20px;
  align-items: center;
  gap: 12px;
  height: 40px;
  background-color: pink;
  border-bottom: 1px solid red;
`;

const Title = styled.div`
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const SuperAdminPanel = () => {
  const dispatch = useDispatch();

  const { authDetails, allUsers, selectedOrganizationId } = useSelector((state) => state.auth);
  const { organizationId } = authDetails || {};
  const handleChange = (data) => {
    dispatch(selectOrganizationId(data?.value ? data?.value : null));
    // TODO: Trigger all API calls to fetch data for the selected organization
  };

  const currentOrgIdContext = selectedOrganizationId ? selectedOrganizationId : organizationId;
  const currentOrgContentName = allUsers.find((org) => org?.organizationId === currentOrgIdContext)?.organizationName;

  return (
    <SuperAdminPanelWrapper>
      <Title>ADMIN TOOLS</Title>
      <SelectOrganization organizations={allUsers} handleChange={handleChange} />
      <Title>
        CURRENT: {currentOrgIdContext} ({currentOrgContentName})
      </Title>
    </SuperAdminPanelWrapper>
  );
};
