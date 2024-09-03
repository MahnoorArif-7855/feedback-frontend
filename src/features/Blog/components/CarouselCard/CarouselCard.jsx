import { blogImage, blogSlugs } from '@/common/utils/hardcode';
import { Avatar, Col, Image, Row, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import CarouselCardStyled from './CarouselCard.styles';

const { Text } = Typography;

const CarouselCard = ({ item }) => {
  const { slug, title, date, subtitle, image_url } = item;

  const router = useRouter();

  const _handleNavigation = useCallback(
    (slug) => () => {
      router.push(`blog/${slug}`);
    },
    [slug]
  );

  return (
    <CarouselCardStyled onClick={_handleNavigation(slug)}>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={8}>
              <div className='carousel-img'>
                <Image alt='blog' className='img' preview={false} src={image_url ? image_url : blogImage(slug)} />
              </div>
            </Col>
            <Col span={12}>
              <div className='card-desc'>
                <div className='sub-heading'>
                  {/* <Text className='carousel-sub-title'>{category}</Text> */}

                  <Text className='carousel-divider'>-</Text>

                  <Text className='carousel-date'>{date}</Text>
                </div>
                <div>
                  <Text className='carousel-title'>{title}</Text>
                </div>
                <div className='carousel-title-desc'>
                  <Text className='desc'>{subtitle}</Text>
                </div>
                {/* <div className='avatar-content'>
                  <Space wrap size={16}>
                    <Avatar size={50} src='https://preview.colorlib.com/theme/magdesign/images/person_1.jpg.webp' />
                    <div className='avatar'>
                      <Text className='avatar-title'>John</Text>
                      <Text className='avatar-desc'>CEO and Founder</Text>
                    </div>
                  </Space>
                </div> */}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </CarouselCardStyled>
  );
};

export default CarouselCard;
