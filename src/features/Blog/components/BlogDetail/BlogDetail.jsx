import { blogImage } from '@/common/utils/hardcode';
import { markdownify } from '@/common/utils/markdownify';
import { GET_BLOGS_BY_ID } from '@/state/graphQL/Queries';
import { useQuery } from '@apollo/client';
import { Avatar, Col, Image, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import BlogDetailStyled from './BlogDetail.styles';

const { Text } = Typography;

const BlogDetail = () => {
  const router = useRouter();

  const { data, error } = useQuery(GET_BLOGS_BY_ID, {
    variables: {
      slug: router.query.blog_id,
    },
  });

  useEffect(() => {
    if (!data && error) {
      console.log('error fetching data', error);
    }
  }, [data, error]);

  return (
    <BlogDetailStyled className='container mx-auto border-b border-gray-100 pb-36'>
      <Row justify='center'>
        <Col lg={16} md={24}>
          <div className='avatar'>
            <Avatar size={70} src={'/images/blog/patrick.png'} />
            <div className=''>
              <Text className='avatar-title'>Patrick Philbin</Text>
            </div>
            <div>{/* <Text className='avatar-date'>{data?.getBlogById[0]?.date}</Text> */}</div>

            <div className='blog-title-content'>
              <Text className='blog-title'>{data?.getBlogById[0]?.title}</Text>
            </div>
            <div className='blog-subtitle-content'>
              <Text className='blog-subtitle'>{data?.getBlogById[0]?.subtitle}</Text>
            </div>
          </div>
          <div className='carousel-img'>
            <Image
              alt='date'
              className='img'
              preview={false}
              src={data?.getBlogById[0]?.image_url ? data?.getBlogById[0]?.image_url : blogImage(router.query.blog_id)}
            />
          </div>
          <div className='blog-description-content'>
            <Text className='blog-subtitle'>{markdownify(data?.getBlogById[0]?.description)}</Text>
          </div>
        </Col>
      </Row>
    </BlogDetailStyled>
  );
};

export default BlogDetail;
