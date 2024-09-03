import { ContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import { ADD_BLOG } from '@/state/graphQL/Mutation';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { Button, Card, Col, Form, Image, Input, Row, Typography, Upload, message } from 'antd';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const DynamicBundledEditor = dynamic(() => import('@/common/components/MCEEditor'), {
  ssr: false,
});

const { Text } = Typography;

const storage = getStorage();

const AddBlog = () => {
  const [isBlogAdding, setIsBlogAdding] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const editorRef = useRef(null);

  const [addBlog, { data, error }] = useMutation(ADD_BLOG);

  const [form] = Form.useForm();

  const { authDetails, selectedOrganizationId } = useSelector((state) => state.auth);

  const { email, userId } = authDetails || {
    organizationId: null,
  };

  const imgProps = {
    width: '300px',
    name: 'blog-image',
    listType: 'picture-card',
    className: 'avatar-uploader',
    showUploadList: false,
    action: '',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        setLoadingImage(true);
        return;
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest({ file, onSuccess, onError }) {
      const imageRef = ref(storage, `blog/images`);

      uploadBytes(imageRef, file)
        .then((snapshot) => {
          return getDownloadURL(imageRef);
        })
        .then((url) => {
          setImageUrl(url);
          setLoadingImage(false);
          onSuccess();
        })
        .catch((error) => {
          console.error('Error uploading file to Firebase:', error);
          onError(error);
        });
    },
  };

  useEffect(() => {
    if (data && !error) {
      console.log('data after adding blog 2', data);
      setIsBlogAdding(false);
      form.resetFields();
    }

    if (error) {
      console.log('error adding blog', error);
      setIsBlogAdding(false);
    }
  }, [data, error]);

  const onFinish = (formInfo) => {
    setIsBlogAdding(true);
    if (process.env.NODE_ENV !== 'development') {
      window?.pendo?.track('add_blog', {
        user_id: userId,
        email: email,
        organization_id: selectedOrganizationId,
        blog_title: formInfo?.title,
        blog_slug: formInfo?.slug,
      });
    }
    let description;
    if (editorRef.current) {
      description = editorRef.current.getContent();
    }
    const blogData = {
      slug: formInfo?.slug,
      description: description,
      date: new Date().toISOString(),
      userId: '123312',
      title: formInfo?.title,
      subtitle: formInfo?.subtitle,
    };

    addBlog({ variables: blogData });
  };

  const onFinishFailed = (error) => {
    console.log('FORM error', error);
  };

  const uploadButton = (
    <div>
      {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <PageLayout title='Blog'>
      <ContentWrapper>
        <Row justify='center'>
          <Col md={20} lg={24} sm={24}>
            <Card title='Add New Blog'>
              <Upload {...imgProps}>
                {imageUrl ? (
                  <Image
                    preview={false}
                    src={imageUrl}
                    alt='avatar'
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              <Form
                form={form}
                name='blog-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout={'vertical'}
                className='zendesk-form'
              >
                <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Please enter blog title' }]}>
                  <Input placeholder='Enter enter blog slug' />
                </Form.Item>
                <Form.Item
                  label='Sub Title'
                  name='subtitle'
                  rules={[{ required: true, message: 'Please enter blog subtitle' }]}
                >
                  <Input placeholder='Enter enter blog subtitle' />
                </Form.Item>
                <Form.Item label='Slug' name='slug' rules={[{ required: true, message: 'Please enter blog slug' }]}>
                  <Input placeholder='Enter enter blog slug' />
                </Form.Item>

                <Form.Item
                  label='Description'
                  name='description'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter blog description',
                    },
                  ]}
                >
                  <DynamicBundledEditor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue='<p>This is the initial content of the editor.</p>'
                    init={{
                      height: 1000,
                      // menubar: false,
                      plugins: [
                        'advlist',
                        'anchor',
                        'autolink',
                        'help',
                        'image',
                        'link',
                        'lists',
                        'searchreplace',
                        'table',
                        'wordcount',
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button loading={isBlogAdding} type='primary' htmlType='submit' size='large' block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </ContentWrapper>
    </PageLayout>
  );
};

export default AddBlog;
