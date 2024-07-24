import AddTodo from '@/components/ToDo/AddTodo';
import TodoTable from '@/components/ToDo/TodoTable';
import { GetToDo } from '@/hooks/ToDo';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const ToDO = () => {
  const { data: todo } = useQuery({
    queryKey: ['tasks'],
    queryFn: GetToDo
  });

  // console.log(todo);

  return (
    <>
      <Toaster />
      <main className="lg:px-14 lg:py-8 p-4 space-y-8">
        <div className="flex justify-end px-2">
          <AddTodo />
        </div>
        {todo && <TodoTable todos={todo} />}
      </main>
    </>
  );
};
export default ToDO;
