import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/client';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const SignUPConfirm = () => {
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
    <main className="h-screen flex justify-center items-center">
      <Card>
        <CardContent className="text-center space-x-4">
          <h1>Confirmation Email Has Been Sent</h1>
          <p>Please check your email</p>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignUPConfirm;
