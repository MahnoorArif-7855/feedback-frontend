import { Avatar, Col, Row, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

import searchImage from '../../../../public/images/search.gif';
import { DefaultSearchViewStyled } from '../AISearch.styles';

const { Text } = Typography;

const DefaultSearchView = () => {
  return (
    <DefaultSearchViewStyled>
      <div className='heading-ai-search'>
        <div className='sub-heading-wrapper'>
          <Text className='sub-heading-text'>
            Ask questions about best features, most frequent bugs,
            <br /> and what type of users are churning. Or anything else that comes to mind!
            <br />
          </Text>
        </div>
      </div>

      <div className='feature-section'>
        <div className='feature-wrapper'>
          <Row>
            <Col xs={20} sm={22}>
              <div className='ai-search-features'>
                <Image src={searchImage} width={'10%'} alt='search image' layout='responsive' priority />
                <Text className='description'></Text>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultSearchViewStyled>
  );
};

export default DefaultSearchView;
