import Header from '@/components/Layout/Header';
import SideBar from '@/components/Layout/SideBar';
import { supabase } from '@/lib/client';
import { Session, User } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const getSession = useCallback(async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    setSession(session);
    setUser(user);
  }, []);

  useEffect(() => {
    getSession();
  }, [getSession]);

  // console.log('session :', session);

  useEffect(() => {
    if (!session) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [session, navigate]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <SideBar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header user={user} />

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
