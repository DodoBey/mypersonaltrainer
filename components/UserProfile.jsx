import { getOrGenerateTokens, getUserTokenById } from '@/utils/action';
import { UserButton, auth, currentUser } from '@clerk/nextjs';

const UserProfile = async () => {
  const user = await currentUser();
  const { userId } = auth();
  const userEmail = user.emailAddresses[0].emailAddress;
  await getOrGenerateTokens(userId);
  const currentTokens = await getUserTokenById(userId);
  return (
    <div className='px-4 items-center grid grid-rows-2 gap-2'>
      <div className='flex'>
        <span className='block my-auto font-semibold'>
          {currentTokens} Tokens Left
        </span>
        <div
          className='tooltip'
          data-tip='Coming Soon!'
        >
          <button
            className='btn btn-primary btn-sm ml-4'
            disabled
          >
            Buy More!
          </button>
        </div>
      </div>
      <div className='flex'>
        <UserButton afterSignOutUrl='/' />
        <p className='my-auto ml-2'>{userEmail}</p>
      </div>
    </div>
  );
};
export default UserProfile;
