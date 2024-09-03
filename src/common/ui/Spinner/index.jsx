import { Spin } from 'antd';
import React from 'react';

import { LoaderStyled } from './styled';

const Loader = () => {
  return (
    <LoaderStyled>
      <Spin />
    </LoaderStyled>
  );
};

export default Loader;
