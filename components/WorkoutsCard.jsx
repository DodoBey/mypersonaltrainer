import Link from 'next/link';

const WorkoutsCard = ({ workout }) => {
  const { id, title } = workout;
  return (
    <Link
      href={`/workouts/${id}`}
      className='card card-compact rounded-lg bg-base-100 hover:scale-[1.05] transition-all'
    >
      <div className='card body items-center text-center my-auto'>
        <h2 className='card-title text-center'>{title}</h2>
      </div>
    </Link>
  );
};
export default WorkoutsCard;
