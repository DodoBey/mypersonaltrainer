'use client';
import { getWorkouts } from '@/utils/action';
import { useQuery } from '@tanstack/react-query';
import WorkoutsList from './WorkoutsList';

const WorkoutsPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ['workouts'],
    queryFn: () => getWorkouts(),
  });
  return (
    <>
      {isPending ? (
        <span className='loading loading-md'></span>
      ) : (
        <WorkoutsList data={data} />
      )}
    </>
  );
};
export default WorkoutsPage;
