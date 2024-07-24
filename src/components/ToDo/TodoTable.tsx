import { todoColumn } from '@/ColumnSchema/TodoColumn';
import { todo } from '@/types/types';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  PaginationState
} from '@tanstack/react-table';
import React, { useState } from 'react';
import ReactTable from '../ReactTable';
import { Card } from '../ui/card';

const TodoTable: React.FC<{ todos: todo[] }> = ({ todos }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const columns = todoColumn;
  const table = useReactTable({
    data: todos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination
    },
    onPaginationChange: setPagination
  });

  return (
    <>
      <Card className="p-8">
        <ReactTable columns={columns} table={table} />
      </Card>
    </>
  );
};

export default TodoTable;
