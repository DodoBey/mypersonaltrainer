'use server';
import OpenAI from 'openai';
import prisma from './db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getTheAnswer = async (userQuestion) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a helpfull assistant' },
        ...userQuestion,
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
      max_tokens: 100,
    });
    return {
      message: response.choices[0].message,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    return null;
  }
};

export const generateNewWorkout = async ({ age, type, days, injury }) => {
  const injuryIsValid = injury ? `I have ${injury} injury` : '';
  const openAiQuery = `Create a workout plan based on ${age}, ${type}, ${days} days/week, and consider ${injuryIsValid}, if applicable. Include reps and sets for each exercise. If ${days} > 2 and type is Full Body, vary daily focus. Return plan in JSON format: {"workout": {"title": "${days}, ${type} plan", "detail": [{"title":"day and workout type", "workoutplan": ['move - sets x reps']}]}}, or {"workout": null} if unable to create plan.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'your are a personal trainer' },
        { role: 'user', content: openAiQuery },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
      max_tokens: 1000,
    });
    const workoutData = JSON.parse(response.choices[0].message.content);

    if (!workoutData.workout) {
      return null;
    }
    return {
      workout: workoutData.workout,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveWorkout = async (workout) => {
  return prisma.workout.create({ data: workout });
};

export const getWorkouts = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('User not authanticated!');
  }
  try {
    const workouts = await prisma.workout.findMany({ where: { userId } });
    return workouts;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSingleWorkout = async (id) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('User not authanticated!');
  }
  try {
    const workout = await prisma.workout.findUnique({ where: { id } });
    return workout;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserTokenById = async (userId) => {
  const result = await prisma.token.findUnique({ where: { userId } });
  return result?.tokens;
};

export const generateUserTokensForId = async (userId) => {
  const result = await prisma.token.create({
    data: {
      userId,
    },
  });
  return result?.tokens;
};

export const getOrGenerateTokens = async (userId) => {
  const result = await getUserTokenById(userId);
  if (result) {
    return result.tokens;
  }
  return (await generateUserTokensForId(userId)).tokens;
};

export const subtractToken = async (userId, tokens) => {
  const result = await prisma.token.update({
    where: { userId },
    data: { tokens: { decrement: tokens } },
  });
  revalidatePath('/');
  return result.tokens;
};

export const addToken = async (userId, tokens) => {
  const result = await prisma.token.update({
    where: { userId },
    data: { tokens: { increment: tokens } },
  });
  revalidatePath('/');
  return result.tokens;
};
