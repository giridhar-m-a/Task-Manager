import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/client';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  const getSession = useCallback(async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    setSession(session);
  }, []);

  useEffect(() => {
    getSession();
  }, [getSession]);

  // console.log('session :', session);

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-fit">
        <Tabs defaultValue="login" className="!w-96">
          <TabsList className="w-full h-fit">
            <TabsTrigger value="login" className="basis-1/2 text-lg">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="basis-1/2 text-lg">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Register />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Auth;
