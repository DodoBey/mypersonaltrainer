import NewWorkoutPlan from '@/components/NewWorkout';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const NewWorkoutPage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewWorkoutPlan />
    </HydrationBoundary>
  );
};

export default NewWorkoutPage;
