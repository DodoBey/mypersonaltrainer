import { getUserTokenById } from '@/utils/action';
import { UserProfile, auth } from '@clerk/nextjs';

const Profile = async () => {
  const { userId } = auth();
  const currentTokens = await getUserTokenById(userId);

  return (
    <div>
      <div className='flex flex-col align-middle ml-8 mb-8'>
        <h2 className='text-lg font-bold my-auto'>
          Token Amount: {currentTokens}
        </h2>
        <div className='flex flex-row mt-2'>
          <span className='block my-auto font-medium'>
            First 2000 tokens are from us! To continue using the app, you should
            get more tokens.
          </span>
          <div
            className='tooltip'
            data-tip='Coming Soon!'
          >
            <button
              className='btn btn-secondary ml-8'
              disabled
            >
              Buy More!
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-center sm:justify-start'>
        <UserProfile />
      </div>
    </div>
  );
};
export default Profile;
