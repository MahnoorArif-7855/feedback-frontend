import FeedbackCard from '@/common/components/feedbackCard';
import { searchAISlice, searchModalSlice } from '@/state/redux/searchAI/searchSlice';
import { Col, Divider, Empty, Input, Radio, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../../firebase';
import FeedbackModal from '../../../../common/ui/Modal';
import categoryOptions from '../../../../common/utils/content/categoryOption.json';

const { Search } = Input;

const { Title } = Typography;

const SearchTab = () => {
  const [categoryValue, setCategoryValue] = useState('feature_feedback_positive');

  const [user] = useAuthState(firebaseAuth);
  const [searchValue, setSearchValue] = useState('');
  const [loader, setLoader] = useState(false);

  const { searchInfo, searchFeedback } = useSelector((state) => state.search);
  const { organizationInfo, selectedOrganizationId, intercomTeams } = useSelector((state) => state.auth);

  const { organizationId } = organizationInfo || { organizationId: null };

  const dispatch = useDispatch();

  const { uid } = user || { uid: null };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSubmit = async () => {
    await setLoader(true);

    if (uid !== undefined && categoryValue) {
      await dispatch(
        searchAISlice({
          searchValue,
          myCategoryQry: categoryValue,
          user,
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
          setLoader,
        })
      );
      // dispatch(selectOrganizationId(null));
    }
  };

  const modalData = async (feedback) => {
    await dispatch(searchModalSlice({ mongoId: feedback.mongoId }));
    showModal();
  };

  const onChangeCategory = ({ target: { value } }) => {
    setCategoryValue(value);
  };

  return (
    <>
      <div>
        <Radio.Group options={categoryOptions} onChange={onChangeCategory} value={categoryValue} />
      </div>
      <Divider />
      <Search
        placeholder='input search text'
        size='large'
        loading={loader}
        onChange={(e) => onChange(e)}
        className='dashboard-search'
        onPressEnter={onSubmit}
        enterButton='Search'
        onSearch={onSubmit}
      />

      <Title level={4} underline strong>
        Search Result:
      </Title>
      <div className='feedback-card-container'>
        <Row gutter={[16, 16]}>
          {searchInfo.length !== 0 ? (
            Array.isArray(searchInfo) &&
            searchInfo?.map((feedback, key) => (
              <Col md={12} lg={8} xl={6} key={key}>
                <FeedbackCard
                  feedbacks={feedback}
                  key={key}
                  categoryOptions={categoryOptions}
                  onClickModal={() => modalData(feedback)}
                />
              </Col>
            ))
          ) : (
            <Col lg={24}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Col>
          )}
        </Row>
      </div>

      {searchFeedback && (
        <FeedbackModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          contentInfo={searchFeedback}
          intercomTeams={intercomTeams}
        />
      )}
    </>
  );
};

export default SearchTab;
