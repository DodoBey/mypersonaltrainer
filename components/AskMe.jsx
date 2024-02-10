'use client';

import { getTheAnswer } from '@/utils/action';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AskMe = () => {
  const [question, setQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState([]);

  const { mutate } = useMutation({
    mutationFn: (query) => getTheAnswer([...chatResponse, query]),
    onSuccess: (data) => {
      if (!data) {
        toast.error('Something Went Wrong');
        return;
      }
      setChatResponse((prevState) => [...prevState, data]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: 'user', content: question };
    mutate(query);
    setChatResponse((prevState) => [...prevState, query]);
  };
  return (
    <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div>
        <h2 className='text-5xl'>Messages</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className='max-w-4xl pt-12'
      >
        <div className='join w-full'>
          <input
            type='text'
            placeholder='Ask Me Anything!'
            className='input input-bordered join-item w-full'
            value={question}
            required
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className='btn btn-primary join-item'
            type='submit'
          >
            ASK ME!
          </button>
        </div>
      </form>
    </div>
  );
};
export default AskMe;
