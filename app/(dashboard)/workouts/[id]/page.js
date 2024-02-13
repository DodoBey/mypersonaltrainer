import { getSingleWorkout } from '@/utils/action';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import WorkoutInfo from '@/components/WorkoutInfo';

const WorkoutDetail = async ({ params }) => {
  const workout = await getSingleWorkout(params.id);

  if (!workout) {
    redirect('/workouts');
  }

  return (
    <div>
      <Link
        href='/workouts'
        className='btn btn-accent mb-8 btn-md'
      >
        Back to Workouts
      </Link>
      <WorkoutInfo newWorkout={workout} />
    </div>
  );
};
export default WorkoutDetail;
