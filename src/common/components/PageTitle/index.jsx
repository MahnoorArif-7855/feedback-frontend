import { Divider } from 'antd';
import React, { useEffect } from 'react';

import { DashboardPageTitleStyled, MainPageTitleStyled } from './styled';

const PageTitle = ({ pageTitle, pageSubHeader, dashboard }) => {
  return (
    <div>
      {dashboard ? (
        <DashboardPageTitleStyled>
          {pageTitle}
          <div className='sub-header'>{pageSubHeader}</div>
          <Divider />
        </DashboardPageTitleStyled>
      ) : (
        <MainPageTitleStyled>{pageTitle}</MainPageTitleStyled>
      )}
    </div>
  );
};

export default PageTitle;
