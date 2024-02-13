'use server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getTheAnswer = async (userQuestion) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a helpfull assistand' },
        ...userQuestion,
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
    });
    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};

export const generateNewWorkout = async ({ age, type, days, injury }) => {
  const openAiQuery = `Create a workout plan based on ${age}, ${type} and ${days} in a week. Also consider ${injury} when you are creating the workout plan, if it's available. Also include number of reps and sets everytime when you create a new workout. Also in the detail element of the return object, do not write something like here is a sample workout plan, just write down days and the plan for each day. Once you created the workout plan, response should be in the following JSON format:
{
  "workout": {
    "title": "${days}, ${type} workout plan",
    "detail": [{"title":"day", "workoutplan": ['each move is new elemen of this array like name of the move: number of sets of number of reps']}]
  }
}
If you cannot create a workout based on the given information, return {"workout": null}, with no additional characters.
`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'your are a personal trainer' },
        { role: 'user', content: openAiQuery },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
    });
    const workoutData = JSON.parse(response.choices[0].message.content);

    if (!workoutData.workout) {
      return null;
    }
    return workoutData.workout;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveWorkout = async (workout) => {
  return null;
};
