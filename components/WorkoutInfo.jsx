'use client';

import { saveWorkout } from '@/utils/action';
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from '@react-pdf/renderer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#e5e7eb',
    padding: 20,
    fontSize: 12,
  },
  logo: {
    width: '200px',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  plan: {
    marginBottom: 5,
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

const WorkoutInfo = ({ newWorkout }) => {
  const { title, detail } = newWorkout;
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const params = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const saveNewWorkout = await saveWorkout(data);
      if (saveNewWorkout) {
        queryClient.invalidateQueries({ queryKey: 'workouts' });
        toast.success('Workout succesfully saved');
        return;
      }
      toast.error('Something went wrong');
      return null;
    },
  });

  const data = { ...newWorkout, userId };

  const handleSaveWorkout = () => {
    mutate(data);
  };

  const generatePdf = () => {
    const MyDocument = (
      <Document>
        <Page
          size='A4'
          style={styles.page}
        >
          {/* Logo */}
          <Image
            src='/logo.png'
            style={styles.logo}
          />
          {/* Rest of the content */}
          <Text style={styles.title}>{title}</Text>
          {detail &&
            detail.map((day) => (
              <View
                key={day.title}
                style={styles.section}
              >
                <Text style={styles.dayTitle}>{day.title}</Text>
                {day.workoutplan.map((plan, index) => (
                  <Text
                    key={index}
                    style={styles.plan}
                  >
                    {'\u2022'} {plan}
                  </Text>
                ))}
              </View>
            ))}
          <Text
            fixed
            style={styles.footer}
          >
            Generated with
            <Link src='https://mypersonaltrainer.vercel.app'>
              mypersonaltrainer.vercel.app
            </Link>
          </Text>
        </Page>
      </Document>
    );

    return MyDocument;
  };

  return (
    <div className='max-w-2xl'>
      <h1 className='text-xl sm:text-4xl font-bold mb-4 underline underline-offset-8'>
        {title}
      </h1>
      {detail &&
        detail.map((day) => (
          <div key={day.title}>
            <h3 className='text-2xl font-semibold my-2'>{day.title}</h3>
            <ul className='card bg-base-300 shadow-lg shadow-primary-content p-4 w-full sm:w-2/3 mb-4'>
              {day.workoutplan.map((plan) => (
                <li
                  key={plan}
                  className='list-disc ml-6 font-medium mb-1'
                >
                  {plan}
                </li>
              ))}
            </ul>
          </div>
        ))}
      <div className='w-full mt-4 grid grid-cols-2 gap-12'>
        {!params.id && (
          <button
            className='btn btn-primary w-full'
            onClick={handleSaveWorkout}
          >
            {isPending ? 'Saving...' : 'Save to Workouts'}
          </button>
        )}
        <PDFDownloadLink
          document={generatePdf()}
          fileName='workout_plan.pdf'
          className='btn btn-secondary w-full'
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Save As a PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};
export default WorkoutInfo;
