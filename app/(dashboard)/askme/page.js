import AskMe from '@/components/AskMe';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const AskMePage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AskMe />
    </HydrationBoundary>
  );
};

export default AskMePage;
