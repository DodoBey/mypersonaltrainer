import WorkoutsPage from '@/components/WorkoutsPage';
import { getWorkouts } from '@/utils/action';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const Workouts = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['workouts'],
    queryFn: () => getWorkouts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkoutsPage />
    </HydrationBoundary>
  );
};

export default Workouts;
