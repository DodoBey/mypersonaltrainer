import SidebarLogo from '../public/logo.png';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
const SideBarHeader = () => {
  return (
    <div className='flex items-center mb-4 gap-4 px-4'>
      <Image
        src={SidebarLogo}
        alt='Page logo'
        width={144}
        height={144}
        className='m-auto'
      />
      <ThemeToggle />
    </div>
  );
};
export default SideBarHeader;
