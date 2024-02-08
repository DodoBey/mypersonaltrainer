import { SignIn } from '@clerk/nextjs';
import BgImage from '../../../public/bg.png';

export default function Page() {
  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage: `url(${BgImage.src})`,
      }}
    >
      <div className='hero-overlay bg-opacity-90'></div>
      <div className='hero-content flex justify-center items-center p-0'>
        <SignIn />
      </div>
    </div>
  );
}
