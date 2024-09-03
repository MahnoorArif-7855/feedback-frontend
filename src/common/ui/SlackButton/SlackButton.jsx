import { FREE_ID, SLACK_BUTTON_INTEGRATION } from '@/common/utils/constant';
import { Button, Grid, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseAuth } from '../../../../firebase';
import { ButtonStyled } from './SlackButton.styles';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const SlackButton = ({
  variety,
  disabled,
  slackIcon,
  size = 'large',
  text,
  imageSize = 30,
  type = 'primary',
  onClick,
  autoResponsive,
}) => {
  const screens = useBreakpoint();
  return (
    <ButtonStyled
      type={type}
      onClick={onClick}
      icon={
        slackIcon && (
          <Image
            src={slackIcon}
            width={autoResponsive && screens.xs == true ? 20 : imageSize}
            alt='slack-img'
            priority
          />
        )
      }
      size={autoResponsive && screens.xs == true ? 'default' : size}
      disabled={disabled}
      variety={variety}
    >
      {text}
    </ButtonStyled>
  );
};

export default SlackButton;
