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
      ) : data ? (
        <WorkoutsList data={data} />
      ) : (
        <div>
          <h2 className='font-bold text-lg'>
            You don't have any workout yet. You should create one first.
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
