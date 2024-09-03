import { ContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import OrgMonitorAISearchCard from '@/common/components/OrganizationMonitorAISearchCard';
import { OrganizationListBox, OrganizationsBox } from '@/common/styles/userSearch';
import { UserSearchSlice } from '@/state/redux/searchAI/searchSlice';
import { Card, Col, Empty, Input, Modal, Row, Typography } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Search } = Input;
const { Text, Title } = Typography;

const MonitorAISearch = () => {
  const { allUsers } = useSelector((state) => state.auth);
  const { OrganizationSearch } = useSelector((state) => state.search);
  const [selectedOrganization, setSelectedOrganization] = useState({
    id: null,
    name: null,
  });
  const [searchValue, setSearchValue] = useState('');
  const [displayOrganization, setDisplayOrganization] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchValue !== '') {
      const searchedList =
        allUsers &&
        allUsers.filter(
          ({ organizationName }) =>
            organizationName && organizationName.toLowerCase().includes(searchValue.toLowerCase())
        );
      setDisplayOrganization(searchedList);
    } else {
      allUsers && setDisplayOrganization([...allUsers]);
    }
  }, [searchValue, allUsers]);

  const onSearch = (value) => {
    setSearchValue(value);
  };
  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleChange = (e, data) => {
    setSelectedOrganization({
      name: data.organizationName,
      id: data.organizationId,
    });
    dispatch(UserSearchSlice({ organizationId: data?.organizationId }));
    e.preventDefault();
  };
  return (
    <PageLayout title='Monitor AI Search'>
      <ContentWrapper>
        <Row gutter={16}>
          <Col sm={24} md={12} lg={9} xl={8}>
            <Search
              allowClear
              onChange={onSearchChange}
              placeholder='Search Organization'
              onSearch={onSearch}
              style={{ width: '100%' }}
            />
            <OrganizationListBox>
              <Card bodyStyle={{ padding: '10px' }}>
                <div>
                  {displayOrganization && displayOrganization.length ? (
                    displayOrganization.map((data, index) => {
                      const { organizationId, organizationName } = data;
                      return (
                        <div key={index} className='tool-list-name'>
                          <div
                            className={`${selectedOrganization.id === organizationId && 'active'}`}
                            onClick={(e) => {
                              handleChange(e, data);
                            }}
                          >
                            {organizationName}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Col md={24}>
                      <Text>Data Not Found!</Text>
                    </Col>
                  )}
                </div>
              </Card>
            </OrganizationListBox>
          </Col>
          <Col sm={24} md={12} lg={15} xl={16}>
            <OrganizationsBox>
              <div className='search-title'>Results</div>
              <Card bodyStyle={{ padding: '0px 15px', margin: 0 }}>
                <Title className='org-title' level={3}>
                  {selectedOrganization.name}
                </Title>
              </Card>
              {OrganizationSearch && OrganizationSearch.length > 0 ? (
                OrganizationSearch.map((contentInfo, key) => {
                  return <OrgMonitorAISearchCard key={key} contentInfo={contentInfo} />;
                })
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </OrganizationsBox>
          </Col>
        </Row>
      </ContentWrapper>
    </PageLayout>
  );
};

export default MonitorAISearch;
