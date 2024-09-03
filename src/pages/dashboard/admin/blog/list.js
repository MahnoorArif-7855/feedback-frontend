import { ContentWrapper, PageLayout } from '@/common/components/DashboardV2Layout';
import { BlogStyled } from '@/features/Blog/Blog.styles';
import { UPDATE_BLOG } from '@/state/graphQL/Mutation';
import { GET_BLOGS } from '@/state/graphQL/Queries';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { Button, Card, Col, Form, Image, Input, Row, Typography, Upload, message } from 'antd';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const storage = getStorage();

const { Dragger } = Upload;

const DynamicBundledEditor = dynamic(() => import('@/common/components/MCEEditor'), {
  ssr: false,
});

const { Text, Title } = Typography;

const ListBlog = () => {
  const [isBlogUpdating, setIsBlogUpdating] = useState(false);
  const [blogsData, setBlogsData] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const { authDetails, selectedOrganizationId } = useSelector((state) => state.auth);

  const { email, userId } = authDetails || {
    organizationId: null,
  };

  const [form] = Form.useForm();

  const { data, error } = useQuery(GET_BLOGS);
  const [updateBlog, { data: updateBlogData, error: updateBlogError }] = useMutation(UPDATE_BLOG);

  const editorRef = useRef(null);

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
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
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
          console.log('Uploaded a blob or file!', snapshot);
          return getDownloadURL(imageRef);
        })
        .then((url) => {
          console.log('Download URL:', url);
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
      setBlogsData(data?.getBlogs);
      console.log('error fetching blogs', error);
    }
  }, [data, error]);

  useEffect(() => {
    console.log(updateBlogData);
    console.log(updateBlogError);
    if (updateBlogData && !updateBlogError) {
      setIsBlogUpdating(false);
      setBlogsData([...blogsData, ...(updateBlogData?.updateBlog || [])]);
    }
  }, [updateBlogData, updateBlogError, setBlogsData]);

  const onFinish = (formInfo) => {
    setIsBlogUpdating(true);
    if (process.env.NODE_ENV !== 'development') {
      window?.pendo?.track('edit_blog_updating', {
        user_id: userId,
        email: email,
        organization_id: selectedOrganizationId,
        blog_title: formInfo?.title,
        blog_slug: formInfo?.slug,
        image_url: imageUrl,
      });
    }
    let description;
    if (editorRef.current) {
      description = editorRef.current.getContent();
    }
    const blogData = {
      slug: formInfo?.slug,
      description: description,
      title: formInfo?.title,
      subtitle: formInfo?.subtitle,
      image_url: imageUrl,
    };

    updateBlog({ variables: blogData });
  };

  const _handleEditBlog = useCallback(
    (blog) => () => {
      if (process.env.NODE_ENV !== 'development') {
        window?.pendo?.track('edit_blog_clicked', {
          user_id: userId,
          email: email,
          organization_id: selectedOrganizationId,
          blog_title: blog.title,
          blog_slug: blog.slug,
        });
      }
      form.setFieldsValue({
        title: blog.title,
        subtitle: blog.subtitle,
        slug: blog.slug,
      });
      setImageUrl(blog?.image_url);
      editorRef.current.setContent(blog.description);
    },
    [form, setImageUrl]
  );

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
        <BlogStyled>
          <div style={{ padding: '2em' }}>
            <Title level='5'> Blog List</Title>
            <Row justify='center' gutter={[8, 8]}>
              <Col md={8} lg={8} sm={24}>
                <div className='blog-list'>
                  <Card title='Blog List'>
                    {blogsData?.map((blog) => {
                      return (
                        <>
                          <div className='blog-content' onClick={_handleEditBlog(blog)}>
                            <Text className='blog-title'>{blog?.title}</Text>
                          </div>
                        </>
                      );
                    })}
                  </Card>
                </div>
              </Col>
              <Col md={16} lg={16} sm={24}>
                <Card>
                  <Dragger {...imgProps}>
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
                  </Dragger>
                  <Form form={form} name='blog-form' onFinish={onFinish} layout={'vertical'} className='blog-edit-form'>
                    <Form.Item
                      label='Title'
                      name='title'
                      rules={[{ required: true, message: 'Please enter blog title' }]}
                    >
                      <Input placeholder='Enter enter blog slug' />
                    </Form.Item>
                    <Form.Item
                      label='Subtitle'
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
                          height: 500,
                          menubar: false,
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
                      <Button loading={isBlogUpdating} type='primary' htmlType='submit' size='large' block>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
        </BlogStyled>
      </ContentWrapper>
    </PageLayout>
  );
};

export default ListBlog;
