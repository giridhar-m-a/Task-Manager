import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { supabase } from '@/lib/client';
import { todo } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Ellipsis } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { useState } from 'react';

const statusSchema = z.object({
  status: z.enum(['pending', 'progress', 'completed'])
});

type status = z.infer<typeof statusSchema>;

const TodoChangeStatus: React.FC<{ todo: todo }> = ({ todo }) => {
  const [open, setopen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const form = useForm<status>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: todo.status
    }
  });

  const onSubmit = async (data: status) => {
    try {
      const { error } = await supabase
        .from('todo')
        .update(data)
        .eq('id', todo.id);
      if (error) {
        throw new Error(error.message);
      }
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setopen(false);
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <Ellipsis />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Status</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent id="status">
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="progress">Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoChangeStatus;
