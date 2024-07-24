import { DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from '../ui/dialog';
import AddTaskForm from './AddTaskForm';
import { useState } from 'react';

const AddTodo = () => {
  const [open, setopen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <Button>Add New Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add A Task</DialogTitle>
        </DialogHeader>
        <AddTaskForm modalClose={setopen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTodo;
