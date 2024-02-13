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

const NewGeneratedPlan = ({ newWorkout }) => {
  const { title, detail } = newWorkout;

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
          {detail.map((day) => (
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
            Generated with{' '}
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
      <h1 className='text-4xl font-bold mb-4'>{title}</h1>
      {detail.map((day) => (
        <div key={day.title}>
          <h3 className='text-2xl font-semibold my-2'>{day.title}</h3>
          <ul>
            {day.workoutplan.map((plan) => (
              <li
                key={plan}
                className='list-disc'
              >
                {plan}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className='w-full join mt-4'>
        <button className='btn join-item btn-primary'>Save to Workouts</button>
        <PDFDownloadLink
          document={generatePdf()}
          fileName='workout_plan.pdf'
          className='btn join-item btn-secondary'
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Save As PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};
export default NewGeneratedPlan;
