import { UserButton, currentUser } from '@clerk/nextjs';

const UserProfile = async () => {
  const user = await currentUser();
  const userEmail = user.emailAddresses[0].emailAddress;
  return (
    <div className='px-4 flex items-center gap-2'>
      <UserButton afterSignOutUrl='/' />
      <p>{userEmail}</p>
    </div>
  );
};
export default UserProfile;
