interface todo {   
      id: number
      created_at: string
      task: string
      end_date: Date
      user_id: string
      status: |'pending'|"progress"|"completed"
}
interface ColumnConfig<T> {
  accessorKey?: keyof T;
  header: string;
  cell?: (props: { row: Row<T>; getValue: () => T[keyof T] }) => React.ReactNode;
}

interface Row<T> {
  index: number;
  original: T;
  getValue: (accessorKey: keyof T) => T[keyof T];
}

export type {todo, ColumnConfig, Row}