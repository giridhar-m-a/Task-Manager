import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from '../ui/date-picker';
import { supabase } from '@/lib/client';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const addTaskSchema = z.object({
  task: z.string().min(1, { message: 'Title is required' }),
  end_date: z.date({ required_error: 'Date is required' })
});

type AddTaskFormType = z.infer<typeof addTaskSchema>;
interface AddTaskFormProps {
  modalClose: (isOpen: boolean) => void;
}

const AddTaskForm = ({ modalClose }: AddTaskFormProps) => {
  const queryClient = useQueryClient();
  const taskForm = useForm<AddTaskFormType>({
    resolver: zodResolver(addTaskSchema)
  });
  const {
    // register,
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = taskForm;

  const onSubmit = async (data: AddTaskFormType) => {
    try {
      const user = await supabase.auth.getUser();
      console.log(data.end_date);
      const { error } = await supabase.from('todo').insert([
        {
          ...data,
          user_id: user.data.user?.id
        }
      ]);
      if (error) {
        throw new Error(error.message);
      }
      reset();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      modalClose(false);
      toast.success('Task added successfully');
    } catch (er) {
      toast.error(`${er}`);
    }
  };

  return (
    <Form {...taskForm}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={taskForm.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <DatePicker
          form={taskForm}
          name="end_date"
          id="end_date"
          label="End Date"
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddTaskForm;
