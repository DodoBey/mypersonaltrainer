'use client';

import { getTheAnswer, getUserTokenById, subtractToken } from '@/utils/action';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

const AskMe = () => {
  const [question, setQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState([]);
  const messageAreaRef = useRef(null);
  const { userId } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async (query) => {
      const currentTokens = await getUserTokenById(userId);
      if (currentTokens < 80) {
        toast.error('Insufficient Token Balance');
        return;
      }
      const response = await getTheAnswer([...chatResponse, query]);
      if (!response) {
        toast.error('Something went wrong');
        return;
      }
      setChatResponse((prevState) => [...prevState, response.message]);
      await subtractToken(userId, response.tokens);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: 'user', content: question };
    mutate(query);
    setChatResponse((prevState) => [...prevState, query]);
  };

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chatResponse]);

  return (
    <div className='h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div
        className='max-h-[100%] overflow-y-scroll mt-2'
        ref={messageAreaRef}
      >
        {chatResponse.map(({ role, content }, index) => {
          const messageImg = role === 'user' ? '👤' : '🤖';
          const messageBg = role === 'user' ? 'bg-base-200' : 'bg-base-100';
          return (
            <div
              key={index}
              className={`${messageBg} flex py-6 px-8 text-xl leading-loose rounded-lg`}
            >
              <span className='mr-4'>{messageImg}</span>
              <p className='max-w-3xl'>{content}</p>
            </div>
          );
        })}
        {isPending ? <span className='loading ml-8'></span> : null}
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
            disabled={isPending}
          >
            {isPending ? 'Workin On It' : 'ASK ME!'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AskMe;
