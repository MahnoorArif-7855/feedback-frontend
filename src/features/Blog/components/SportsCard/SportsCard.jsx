import { Col, Image, Row, Typography } from 'antd';
import React from 'react';

import SportsCardStyled from './SportsCard.styled';

const { Text } = Typography;

const SportsCard = ({ item }) => {
  const { img, category, title, date } = item;

  return (
    <SportsCardStyled>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={6}>
              <div className='carousel-img'>
                <Image className='img' preview={false} src={img} />
              </div>
            </Col>
            <Col span={12}>
              <div className='card-desc'>
                <div className='sub-heading'>
                  <Text className='carousel-sub-title'>{category}</Text>

                  <Text className='carousel-divider'>-</Text>

                  <Text className='carousel-date'>{date}</Text>
                </div>
                <div>
                  <Text className='carousel-title'>{title}</Text>
                </div>
                {/* <div className='carousel-title-desc'>
                  <Text className='desc'>{sub_title}</Text>
                </div> */}
                {/* <div className='avatar-content'>
                  <Space wrap size={16}>
                    <Avatar size={50} src={avatar_url} />
                    <div className='avatar'>
                      <Text className='avatar-title'>{name}</Text>
                      <Text className='avatar-desc'>{job_title}</Text>
                    </div>
                  </Space>
                </div> */}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </SportsCardStyled>
  );
};

export default SportsCard;
