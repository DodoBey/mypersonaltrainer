import { SignUp } from '@clerk/nextjs';
import BgImage from '../../../public/bg.png';

export default function Page() {
  return (
    <div
      className='hero min-h-screen flex justify-center items-center'
      style={{
        backgroundImage: `url(${BgImage.src})`,
      }}
    >
      <SignUp />;
    </div>
  );
}
