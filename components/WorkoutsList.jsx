import WorkoutsCard from './WorkoutsCard';

const WorkoutsList = ({ data }) => {
  if (data.lenth === 0)
    return <h3 className='text-lg'>You have not saved any workouts yet</h3>;
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4'>
      {data.map((workout) => {
        return (
          <WorkoutsCard
            key={workout.id}
            workout={workout}
          />
        );
      })}
    </div>
  );
};
export default WorkoutsList;
