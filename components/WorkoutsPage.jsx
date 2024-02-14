'use client';
import { getWorkouts } from '@/utils/action';
import { useQuery } from '@tanstack/react-query';
import WorkoutsList from './WorkoutsList';
import Link from 'next/link';

const WorkoutsPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ['workouts'],
    queryFn: () => getWorkouts(),
  });
  return (
    <>
      {isPending ? (
        <span className='loading loading-md'></span>
      ) : data.length > 0 ? (
        <WorkoutsList data={data} />
      ) : (
        <div>
          <h2 className='font-bold text-lg'>
            You have not recorded any workouts yet. First, you need to create
            and save one.
          </h2>
          <Link
            className='btn btn-primary mt-4'
            href='/newworkout'
          >
            Create A Workout
          </Link>
        </div>
      )}
    </>
  );
};
export default WorkoutsPage;
