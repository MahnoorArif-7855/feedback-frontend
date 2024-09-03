import { GET_BLOGS } from '@/state/graphQL/Queries';
import { useQuery } from '@apollo/client';
import { Col, Row } from 'antd';
import React, { useEffect } from 'react';

import { BlogStyled, CarouselWrapper } from './Blog.styles';
import BlogCard from './components/BlogCard';
import CarouselCard from './components/CarouselCard';

const Blog = () => {
  const { data, error } = useQuery(GET_BLOGS);

  useEffect(() => {
    if (!data && error) {
      console.log('error fetching blogs', error);
    }
  }, [data, error]);

  return (
    <BlogStyled>
      <div className='container mx-auto border-b border-gray-100 pb-36'>
        <h1 className='my-20 text-center text-4xl text-orange'>Blog</h1>
        <div>
          <CarouselWrapper dotPosition='bottom' dots autoplay>
            {data?.getBlogs?.map((item, index) => (
              <CarouselCard key={index} item={item} />
            ))}
          </CarouselWrapper>
          <div className='blog-cards'>
            <Row gutter={[16, 16]}>
              {data?.getBlogs?.map((blog, index) => {
                return (
                  <Col key={index} lg={8} md={8} sm={12}>
                    <BlogCard blog={blog} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    </BlogStyled>
  );
};

export default Blog;
