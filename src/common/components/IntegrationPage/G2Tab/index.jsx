import { DashboardSearchStyled } from '@/common/styles/searchStyled';
import { DELETE_FEEDBACK, FEEDBACK_DELETE } from '@/common/utils/constant';
import { G2Guides } from '@/common/utils/g2Review';
import { FIND_FEEDBACKS_BY_ORGANIZATION_ID } from '@/state/graphQL/Mutation';
import { G2ReviewSlice } from '@/state/redux/integration/integrationSlice';
import { G2Reviewsreducer } from '@/state/redux/integration/integrationSlice';
import { FeedbackDeleteSlice } from '@/state/redux/searchAI/searchSlice';
import { feedbacksDetail } from '@/state/redux/settings/settingSlice';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Col, Collapse, Divider, Empty, Input, Modal, Row, Typography, notification } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../../../firebase';
import G2Image1 from '../../../../../public/images/g2-guides/4.png';
import G2Image2 from '../../../../../public/images/g2-guides/5.png';
import G2Image3 from '../../../../../public/images/g2-guides/6.png';
import FeedbackModal from '../../../ui/Modal';
import FeedbackCard from '../../feedbackCard';

const { Panel } = Collapse;
const { Search } = Input;
const { Text, Title } = Typography;

const { confirm } = Modal;

const G2ReviewTab = ({ selectedOrganizationId }) => {
  const dispatch = useDispatch();
  const [urlValue, setURLValue] = useState('');
  const [g2modalFeedback, setg2ModalFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useAuthState(firebaseAuth);
  const [g2loader, setG2Loader] = useState(false);
  const { authDetails } = useSelector((state) => state.auth);
  const { G2Reviews } = useSelector((state) => state.integration);
  const { organizationId, email, userId } = authDetails || {
    organizationId: null,
  };

  const [findFeedbackByOrganizationId] = useMutation(FIND_FEEDBACKS_BY_ORGANIZATION_ID, {
    onCompleted: (data) => {
      dispatch(feedbacksDetail(data?.feedbacksByOrganizationId));
    },
    onError: (error) => {
      console.error('Error occured fetching feedbacks by org id:', error);
    },
  });

  // console.log('organizationId', organizationId);

  const [api, contextHolder] = notification.useNotification();
  const { insertedDocs, numInsertedDocs } = G2Reviews || {
    insertedDocs: [],
    numInsertedDocs: 0,
  };

  const modalInfo = async (feedback) => {
    setg2ModalFeedback(feedback);
    showModal();
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChange = (e) => {
    setURLValue(e.target.value);
  };
  const { uid } = user || { uid: null };

  const handleDeleteFeedback = useCallback(
    async (feedbackId, orgId) => {
      if (feedbackId && orgId) {
        const dataFeedback = {
          feedbackId,
          orgId,
          user,
        };

        confirm({
          className: 'confirm',
          title: DELETE_FEEDBACK,
          icon: <ExclamationCircleOutlined />,
          content: FEEDBACK_DELETE,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            try {
              const resp = await dispatch(FeedbackDeleteSlice(dataFeedback));

              const filteredData = insertedDocs?.filter((feedback) => {
                const objId = feedback.objectID || feedback?._id;
                return objId !== feedbackId;
              });

              const feedbackData = {
                insertedDocs: filteredData,
                numInsertedDocs: filteredData.length,
              };
              dispatch(G2Reviewsreducer(feedbackData));
              if (process.env.NODE_ENV !== 'development') {
                window?.pendo?.track('g2_feedback_delete', {
                  user_id: userId,
                  email: email,
                  organization_id: selectedOrganizationId,
                  feedback_id: feedbackId,
                });
              }
            } catch (error) {
              console.error('Error deleting feedback:', error);
            }
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    },
    [dispatch, FeedbackDeleteSlice, user, G2Reviewsreducer, FeedbackDeleteSlice, insertedDocs]
  );

  const onSubmit = async () => {
    setG2Loader(true);
    if (process.env.NODE_ENV !== 'development') {
      window?.pendo?.track('g2_integration', {
        user_id: userId,
        email: email,
        organization_id: selectedOrganizationId,
        g2_url: urlValue,
      });
    }
    const checkHTTP = urlValue.includes('https://www.g2.com/products/');

    if (checkHTTP) {
      const wURL = urlValue.split('https://www.g2.com/products/');
      const slugWithURl = wURL[1];
      const slug = slugWithURl.split('/')[0];
      if (slug) {
        if (uid !== undefined) {
          await dispatch(
            G2ReviewSlice({
              user,
              slugValue: slug,
              organizationId: selectedOrganizationId,
              setG2Loader,
            })
          );

          findFeedbackByOrganizationId({
            variables: { organizationId: selectedOrganizationId },
          });
          // dispatch(selectOrganizationId(null));
        }
      } else {
        wrongURL();
        setG2Loader(false);
      }
    } else {
      wrongURL();
      setG2Loader(false);
    }
  };

  const wrongURL = () => {
    api.error({
      message: 'Something went wrong with URL. Please verify the URL again',
    });
  };
  return (
    <DashboardSearchStyled>
      {contextHolder}
      <Collapse>
        <Panel header='Guide: How to fetch data from G2' key='1'>
          <div className='steps-points'>
            <Text className='point-text' type='danger' strong>
              1. Go to <Link href={'https://www.g2.com/'}>https://www.g2.com/</Link>
            </Text>
          </div>

          <Image className='image' alt='search-image' layout='responsive' priority src={G2Image1} />

          <div className='steps-points'>
            <Text className='point-text' type='danger' strong>
              2. Search any product name, software category or service name and on clicking it go to review page
            </Text>
          </div>

          <Image className='image' alt='search-image' layout='responsive' priority src={G2Image2} />
          <div className='steps-points'>
            <Text className='point-text' type='danger' strong>
              3. Copy the link and past in the integration field
            </Text>
          </div>
          <Image className='image' alt='search-image' layout='responsive' priority src={G2Image3} />
        </Panel>
      </Collapse>

      <Divider />
      <Search
        size='large'
        placeholder='Insert G2 Review Complete URL'
        onChange={(e) => onChange(e)}
        className='search-input'
        loading={g2loader}
        onPressEnter={onSubmit}
        enterButton='Search'
        onSearch={onSubmit}
        disabled={!selectedOrganizationId}
      />
      <Divider />
      {numInsertedDocs ? (
        <Title level={3} underline strong>
          {numInsertedDocs} Reviews
        </Title>
      ) : null}
      <div className='feedback-card-container'>
        <Row gutter={[16, 16]}>
          {insertedDocs.length !== 0 ? (
            insertedDocs?.map((feedback, key) => (
              <>
                <Col md={12} lg={8} xl={6}>
                  <FeedbackCard
                    feedbacks={feedback}
                    key={key}
                    onClickModal={() => modalInfo(feedback)}
                    handleDeleteFeedback={handleDeleteFeedback}
                  />
                </Col>
              </>
            ))
          ) : (
            <Col lg={24}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Col>
          )}
        </Row>
      </div>
      {g2modalFeedback ? (
        <FeedbackModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} contentInfo={g2modalFeedback} />
      ) : null}
    </DashboardSearchStyled>
  );
};

export default G2ReviewTab;
