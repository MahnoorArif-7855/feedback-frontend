import logo from '@/../public/images/logo-color.svg';
import Image from 'next/image';
import Link from 'next/link';

const MenuLink = ({ href, children }) => (
  <Link href={href} className='px-4 py-[10px] hover:text-orange'>
    {children}
  </Link>
);

export const Header = () => {
  return (
    <div className='py-2 sm:py-6'>
      <div className='container mx-auto flex items-center justify-between px-6 py-4 max-sm:flex-wrap sm:px-10'>
        <Link className='logo flex-1 transition-opacity hover:opacity-65 max-sm:mb-0' href='/'>
          <Image alt='Feedback Sync' src={logo} width={170} className='max-sm:w-28' />
        </Link>
        <div className='flex flex-1 justify-center max-sm:hidden'>
          <div className='flex items-center justify-center rounded-full bg-white font-semibold text-[#7E4738] sm:px-6 sm:text-[17px]'>
            <MenuLink href='/pricing'>Pricing</MenuLink>
            <MenuLink href='/getting-started'>Getting started</MenuLink>
            <MenuLink href='/blog'>Blog</MenuLink>
          </div>
        </div>
        <div className='flex-1 text-right'>
          <a
            href='/signin'
            className='rounded-full px-4 py-[10px] font-semibold text-[#7E4738] transition hover:bg-white hover:text-orange sm:text-[17px]'
          >
            Sign In
          </a>
        </div>
      </div>
      <div className='mt-4 flex w-full justify-center sm:hidden'>
        <div className='flex items-center justify-center rounded-full bg-white font-semibold text-[#7E4738] sm:px-8 sm:text-[17px]'>
          <MenuLink href='/pricing'>Pricing</MenuLink>
          <MenuLink href='/getting-started'>Getting started</MenuLink>
          <MenuLink href='/blog'>Blog</MenuLink>
        </div>
      </div>
    </div>
  );
};
