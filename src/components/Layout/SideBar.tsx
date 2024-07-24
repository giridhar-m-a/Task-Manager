import { LuHome, LuListTodo } from 'react-icons/lu';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <div className="py-2"></div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={'/dashboard'}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <LuHome className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={'/todo'}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <LuListTodo className="h-5 w-5" />
              <span className="sr-only">To Do</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">To Do</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default SideBar;
