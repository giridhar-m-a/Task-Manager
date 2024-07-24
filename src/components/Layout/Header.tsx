import { User } from '@supabase/supabase-js';
import { Home, ListTodo, Package2, PanelLeft } from 'lucide-react';
import * as React from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GetProfile } from '@/hooks/Profile';
import { supabase } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../ui/theme-toggle';
import BreadcrumbHeader from './HeaderBreadCrumbs';

const Header: React.FC<{ user: User | null }> = ({ user }) => {
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // console.log(user);

  const { data: profile, error } = useQuery({
    queryKey: ['profile'],
    queryFn: GetProfile
  });

  if (error) return <div>{error.message}</div>;
  // console.log(user);

  return (
    <>
      <header className="sticky justify-between top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="/todo"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <ListTodo className="h-5 w-5" />
                ToDo
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <BreadcrumbHeader />
        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src={
                    profile?.avatar_url
                      ? profile?.avatar_url
                      : 'https://ydnptkontnonrczurgrf.supabase.co/storage/v1/object/public/profile_pic/user.png'
                  }
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.user_metadata?.full_name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hidden">Settings</DropdownMenuItem>
              <DropdownMenuItem className="hidden">Support</DropdownMenuItem>
              <DropdownMenuSeparator className="hidden" />
              <DropdownMenuItem className="bg-red-500" onClick={signOut}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
};

export default Header;
