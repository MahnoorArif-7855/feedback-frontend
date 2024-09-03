import footerLogo from '@/../public/images/logo-color.svg';
import footer from '@/common/utils/content/footer.json';
import { Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { FooterStyled } from './Footer.styles';

const { Text } = Typography;

function AppFooter() {
  return (
    <div className='container mx-auto px-24 py-12 max-sm:px-8 max-sm:pb-8'>
      <FooterStyled className='flex w-full items-start justify-between gap-8 max-sm:flex-col'>
        <div className='footer-logo flex-1'>
          <Link href='/' aria-label='Feedback Sync'>
            <Image src={footerLogo} alt='Feedback Sync' />
          </Link>
        </div>
        <div className='flex items-start gap-36 max-sm:gap-8 max-sm:text-xs'>
          {footer &&
            footer.map((col) => {
              return (
                <div key={col.name}>
                  <Text className='ul-title'>{col.name}</Text>
                  <ul className='ul-text'>
                    {col?.menu.map((item) => (
                      <ul className='li-text' key={item.text}>
                        <Link href={item.url} rel=''>
                          {item.text}
                        </Link>
                      </ul>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
      </FooterStyled>
    </div>
  );
}

export default AppFooter;
