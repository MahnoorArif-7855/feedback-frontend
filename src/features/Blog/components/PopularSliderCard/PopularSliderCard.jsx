import { Col, Image, Row, Typography } from 'antd';
import React from 'react';

import PopularCardStyled from './PopularSliderCard.styles';

const { Text } = Typography;

const PopularSliderCard = ({ blog }) => {
  const { img, category, title, date, sub_title, avatar_url, name, job_title } = blog;
  return (
    <PopularCardStyled>
      <Row justify='center'>
        <Col lg={12} sm={12}>
          <div className='carousel-img'>
            <Image className='img' preview={false} src={img} />
          </div>
          <div className='sub-heading'>
            <Text className='carousel-sub-title'>{category}</Text>
            <Text className='carousel-divider'>-</Text>
            <Text className='carousel-date'>{date}</Text>

            <div className='card-desc'>
              <div>
                <Text className='carousel-title'>{title}</Text>
              </div>
              <div className='carousel-title-desc'>
                <Text className='desc'>{sub_title}</Text>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </PopularCardStyled>
  );
};

export default PopularSliderCard;
