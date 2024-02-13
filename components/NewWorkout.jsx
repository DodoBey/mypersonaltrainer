'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ageList, numberOfDays, workoutType } from '@/app/constants';
import { useState } from 'react';
import NewGeneratedPlan from './NewGeneratedPlan';
import { generateNewWorkout } from '@/utils/action';
import toast from 'react-hot-toast';

const NewWorkout = () => {
  const [haveInjury, setHaveInjury] = useState(false);

  const {
    mutate,
    isPending,
    data: newWorkout,
  } = useMutation({
    mutationFn: async (userInformation) => {
      const newWorkout = await generateNewWorkout(userInformation);
      if (newWorkout) {
        return newWorkout;
      }
      toast.error('Not able to create a workout with the given information');
      return null;
    },
  });

  const handleCheck = () => {
    setHaveInjury((haveInjury) => !haveInjury);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userInformation = Object.fromEntries(formData.entries());
    mutate(userInformation);
  };

  if (isPending) {
    return <span className='loading loading-lg'></span>;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='max-w-2xl'
      >
        <h2 className='mb-4 font-bold'>Get Your Unique Workout Plan!</h2>
        <div className=' w-full'>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text font-semibold'>Age</span>
            </div>
            <select
              className='select select-bordered'
              name='age'
              required
            >
              <option
                disabled
                selected
              >
                Pick one
              </option>
              {ageList.map((age) => (
                <option
                  key={age}
                  value={age}
                >
                  {age}
                </option>
              ))}
            </select>
          </label>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text font-semibold'>Workout Type</span>
            </div>
            <select
              className='select select-bordered'
              name='type'
              required
            >
              <option
                disabled
                selected
              >
                Pick one
              </option>
              {workoutType.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text font-semibold'>
                How many days a week are you planning to work out?
              </span>
            </div>
            <select
              className='select select-bordered'
              name='days'
              required
            >
              <option
                disabled
                selected
              >
                Pick one
              </option>
              {numberOfDays.map((day) => (
                <option
                  key={day}
                  value={day}
                >
                  {day}
                </option>
              ))}
            </select>
          </label>
          <div className='form-control w-full max-w-xs mt-2'>
            <label className='label cursor-pointer'>
              <span className='label-text font-semibold'>Have an injury?</span>
              <input
                type='checkbox'
                checked={haveInjury}
                className='checkbox'
                onChange={handleCheck}
              />
            </label>
          </div>
          {haveInjury && (
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>
                  Please explain your injury with 2-3 words (e.g. Right
                  Shoulder)
                </span>
              </div>
              <input
                type='text'
                className='input input-bordered w-full max-w-xs'
                placeholder='Injury Type'
                name='injury'
                required
                max={60}
              />
            </label>
          )}
          <button
            type='submit'
            className='btn btn-primary mt-4 w-full max-w-xs'
          >
            Create My Workout Plan!
          </button>
        </div>
      </form>
      <div className='mt-8'>
        {newWorkout ? <NewGeneratedPlan newWorkout={newWorkout} /> : null}
      </div>
    </>
  );
};
export default NewWorkout;
