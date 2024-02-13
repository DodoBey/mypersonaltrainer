import BgImage from '../public/bg.png';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Home = () => {
  const { userId } = auth();

  if (userId) {
    redirect('/workouts');
  }
  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage: `url(${BgImage.src})`,
      }}
    >
      <div className='hero-overlay bg-opacity-50'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-lg'>
          <h1 className='mb-5 text-5xl font-bold'>Your Personal Trainer</h1>
          <p className='mb-5 font-semibold text-lg'>
            Your Personal Trainer companion. Powered by OpenAI, it creates the
            best workouts for you!
          </p>
          <button className='btn glass'>
            <Link href='/sign-in'>Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
