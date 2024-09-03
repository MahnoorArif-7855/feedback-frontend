import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';

import { Footer } from './Navigation.styles';

const Navigation = ({ prevPage, nextPage, isFinalStep }) => (
  <Footer>
    <Link href={prevPage} passHref>
      <Button size='large'>Back</Button>
    </Link>
    <Link href={nextPage} passHref>
      <Button type='primary' size='large'>
        {isFinalStep ? 'Finish' : 'Next'}
      </Button>
    </Link>
  </Footer>
);

export default Navigation;
