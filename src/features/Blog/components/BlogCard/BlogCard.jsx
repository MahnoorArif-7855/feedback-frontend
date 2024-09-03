import { blogImage } from '@/common/utils/hardcode';
import { Image, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import BlogCardStyled from './BlogCard.styled';

const { Text } = Typography;

const BlogCard = ({ blog }) => {
  const { title, subtitle, slug, image_url } = blog;
  const router = useRouter();

  const _handleNavigation = useCallback(
    (slug) => () => {
      router.push(`blog/${slug}`);
    },
    [slug]
  );
  return (
    <BlogCardStyled onClick={_handleNavigation(slug)}>
      <div className='carousel-img'>
        <Image alt='as' className='img' preview={false} src={image_url ? image_url : blogImage(slug)} />
        <div className='sub-heading'>
          {/* <Text className='carousel-sub-title'>{category}</Text> */}
          <div className='card-desc'>
            <div>
              <Text className='carousel-title'>{title}</Text>
            </div>
            <div className='carousel-title-desc'>
              <Text className='desc'>{subtitle}</Text>
            </div>
          </div>
        </div>
      </div>
    </BlogCardStyled>
  );
};

export default BlogCard;
