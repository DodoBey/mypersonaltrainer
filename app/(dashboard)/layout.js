import Sidebar from '@/components/Sidebar';

const layout = ({ children }) => {
  return (
    <div>
      <Sidebar children={children} />
    </div>
  );
};

export default layout;
