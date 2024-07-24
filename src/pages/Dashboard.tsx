import ApplistCard from '@/components/ApplistCard';
import { LuListTodo } from 'react-icons/lu';

const Dashboard = () => {
  return (
    <main className="mx-24 py-14">
      <div className="flex justify-start flex-wrap">
        <ApplistCard
          className="lg:basis-1/4 md:basis-1/3 basis-1/2"
          name="Task Manager"
          url="/todo"
          icon={<LuListTodo className="text-9xl" />}
        />
      </div>
    </main>
  );
};

export default Dashboard;
