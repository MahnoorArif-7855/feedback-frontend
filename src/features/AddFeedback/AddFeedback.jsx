import categoryOptions from '@/common/utils/content/categoryOption.json';
import { UPDATE_TAGS } from '@/state/graphQL/Mutation';
import { FIND_FEEDBACKS_BY_ORGANIZATION_ID } from '@/state/graphQL/Mutation';
import { GET_FEEDBACK_TAGS } from '@/state/graphQL/Queries';
import { FeedbackSubmitSlice } from '@/state/redux/searchAI/searchSlice';
import { feedbacksDetail } from '@/state/redux/settings/settingSlice';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddFeedbackStyled } from './AddFeedback.styles';

const { TextArea } = Input;

const FeedbackTags = () => {
  const [feedbackTags, setFeedbackTags] = useState([]);
  const [feedbackSubmittingLoading, setFeedbackSubmittingLoading] = useState(false);
  const [isTagsSubmitting, setIsTagsSubmitting] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const [feedbackTagsSubmitFormTags, setFeedbackTagsSubmitFormTags] = useState([]);

  const feedbackSubmitForm = Form.useForm()[0];

  const { authDetails, authUser, selectedOrganizationId } = useSelector((state) => state.auth);

  const { organizationId } = authDetails || {
    organizationId: null,
  };

  const { user } = authUser || {
    user: null,
  };

  const [getTags, { data, error }] = useLazyQuery(GET_FEEDBACK_TAGS);
  const [updateTags, { data: updateTagsData, error: updateTagsError }] = useMutation(UPDATE_TAGS);

  const [findFeedbackByOrganizationId] = useMutation(FIND_FEEDBACKS_BY_ORGANIZATION_ID, {
    onCompleted: (data) => {
      dispatch(feedbacksDetail(data?.feedbacksByOrganizationId));
    },
    onError: (error) => {
      console.error('Error occured fetching feedbacks by org id:', error);
    },
  });

  useEffect(() => {
    if (organizationId) {
      getTags({
        variables: {
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        },
      });
    }
  }, [organizationId, selectedOrganizationId]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateTagsError && !updateTagsData) {
      console.log('error fetching tags', error);
    }
    if (updateTagsData && !updateTagsError) {
      setFeedbackTagsSubmitFormTags(updateTagsData?.findTagsAndUpdate[0]?.tags);
      const dataTags = updateTagsData?.findTagsAndUpdate[0]?.tags?.map((tag) => {
        return {
          tagName: tag,
          organizationId,
        };
      });
      setFeedbackTags(dataTags);
      setIsTagsSubmitting(false);
    }
    feedbackSubmitForm.resetFields();
  }, [updateTagsData, updateTagsError]);

  useEffect(() => {
    if (error && !data) {
      console.log('error fetching tags', error);
    }
    if (data && !error) {
      setFeedbackTagsSubmitFormTags(data?.getFeedbackTags[0]?.tags);
      const dataTags = data?.getFeedbackTags[0]?.tags?.map((tag) => {
        return {
          tagName: tag,
          organizationId,
        };
      });
      setFeedbackTags(dataTags);
    }
  }, [data, error]);

  const handleCreateTags = useCallback(
    (values) => {
      setIsTagsSubmitting(true);
      const valueTags = values?.names?.map((tag) => tag);
      const dataTags = feedbackTags?.map((tags) => tags.tagName);
      const commonElements = valueTags.filter((tag) => dataTags?.includes(tag));
      if (commonElements.length > 0) {
        return;
      }

      let tagsArr = [];
      if (dataTags === undefined) {
        tagsArr = [...valueTags];
      } else {
        tagsArr = [...dataTags, ...valueTags];
      }
      updateTags({
        variables: {
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
          tags: tagsArr,
        },
      });
    },
    [setIsTagsSubmitting, updateTags, feedbackTags]
  );

  const onSubmitFeedback = async (values) => {
    setFeedbackSubmittingLoading(true);
    await dispatch(
      FeedbackSubmitSlice({
        feedback: values?.feedback,
        category: values?.category,
        customerId: values?.customerId || '',
        authDetails,
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
        source: 'web',
        tags: selectedFeedback,
        user,
      })
    );
    findFeedbackByOrganizationId({
      variables: {
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
      },
    });
    setFeedbackSubmittingLoading(false);

    feedbackSubmitForm.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleFeedbackTags = React.useCallback(
    (value) => {
      const createdTags = value.filter((tag) => !feedbackTagsSubmitFormTags?.includes(tag));
      if (createdTags.length > 0) {
        handleCreateTags({ names: createdTags });
      }
      setSelectedFeedback([...value]);
    },
    [feedbackTagsSubmitFormTags, handleCreateTags]
  );

  const handlePasteFromClipboard = async () => {
    const pasteContent = await navigator.clipboard.readText();
    feedbackSubmitForm.setFieldsValue({
      feedback: pasteContent,
    });
  };

  return (
    <AddFeedbackStyled>
      <Form
        id='feedback_submit_form'
        form={feedbackSubmitForm}
        layout='vertical'
        onFinish={onSubmitFeedback}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        name='feedback-form'
      >
        <Form.Item
          label='Category'
          required
          name='category'
          rules={[
            {
              required: true,
              message: 'Please enter category',
            },
          ]}
        >
          <Select name='category' size='large' placeholder='Enter category' options={categoryOptions} />
        </Form.Item>
        <Form.Item
          label='Feedback'
          required
          name='feedback'
          rules={[
            {
              required: true,
              message: 'Please enter feedback',
            },
          ]}
          className='add-feedback-text'
        >
          <TextArea placeholder='Enter feedback' />
        </Form.Item>
        <Form.Item>
          <div className='paste-clipboard'>
            <Button onClick={handlePasteFromClipboard}>Paste from Clipboard</Button>
          </div>
        </Form.Item>
        <Form.Item label='Customer ID' name='customerId'>
          <Input size='large' placeholder='Enter customer ID' />
        </Form.Item>
        <Form.Item label='Tags' name='tags' extra='Press enter to create a new tag'>
          <Select
            name='tags'
            size='large'
            mode='tags'
            placeholder='Enter tags'
            onChange={handleFeedbackTags}
            disabled={isTagsSubmitting}
            options={feedbackTagsSubmitFormTags?.map((tag) => {
              return {
                label: tag,
                value: tag,
              };
            })}
          />
        </Form.Item>

        <Form.Item
          style={{
            borderTop: '1px solid #f0f0f0',
            paddingTop: '16px',
          }}
        >
          <Button size='large' type='primary' htmlType='submit' loading={feedbackSubmittingLoading}>
            Add Feedback
          </Button>
        </Form.Item>
      </Form>
    </AddFeedbackStyled>
  );
};

export default FeedbackTags;
