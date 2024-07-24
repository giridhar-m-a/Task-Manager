import CountDown from '@/components/CountDown';
import TodoChangeStatus from '@/components/ToDo/TodoChangeStatus';
import { Badge } from '@/components/ui/badge';
import { ColumnConfig, todo } from '@/types/types';
import { format } from 'date-fns';

const todoColumn: ColumnConfig<todo & { index?: number }>[] = [
  {
    accessorKey: 'index',
    header: 'S No.',
    cell: (props) => <>{props.row.index + 1}</>
  },
  {
    accessorKey: 'task',
    header: 'Task',
    cell: (props) => <>{props.getValue()}</>
  },
  {
    accessorKey: 'end_date',
    header: 'Date To Complete',
    cell: (props) => <>{format(props.getValue() as Date, 'dd/MM/yyyy')}</>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => (
      <Badge
        className={`${
          props.getValue() === 'completed'
            ? 'bg-green-500 hover:bg-green-500'
            : props.getValue() === 'progress'
            ? 'bg-blue-500 hover:bg-blue-500'
            : 'bg-red-500 hover:bg-red-500'
        } text-black dark:text-white`}
      >
        {props.getValue() as todo['status']}
      </Badge>
    )
  },
  {
    accessorKey: 'end_date',
    header: 'Time Remaining',
    cell: (props) => (
      <CountDown
        targetDateString={`${format(props.getValue() as Date, 'yyyy-MM-dd')}`}
      />
    )
  },
  {
    header: 'Options',
    cell: (props) => <TodoChangeStatus todo={props.row.original} />
  }
];

export { todoColumn };
