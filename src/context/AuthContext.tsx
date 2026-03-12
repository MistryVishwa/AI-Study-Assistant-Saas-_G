import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: any | null;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, name: string, goal: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  sendOTP: (email: string) => Promise<any>;
  verifyOTP: (email: string, token: string, type: 'signup' | 'recovery' | 'email') => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        ensureProfile(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await ensureProfile(session.user);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const ensureProfile = async (user: User) => {
    // First try to fetch
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error && error.code === 'PGRST116') {
      // Profile doesn't exist, create it
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
            learning_goal: user.user_metadata?.learning_goal || 'General Learning',
          }
        ])
        .select()
        .single();

      if (createError) {
        console.error('Error creating profile:', createError);
      } else {
        setProfile(newProfile);
      }
    } else if (data) {
      setProfile(data);
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, name: string, goal: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          learning_goal: goal,
        },
        emailRedirectTo: window.location.origin
      }
    });
    if (error) throw error;
    return data;
  };

  const signIn = async (email: string, password: string) => {
    // First check if user exists in profiles (as requested)
    const { data: profileCheck, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (!profileCheck && !profileError) {
      throw new Error('Email not registered. Please register first.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const sendOTP = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  };

  const verifyOTP = async (email: string, token: string, type: 'signup' | 'recovery' | 'email') => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    });
    if (error) throw error;
    return data;
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return data;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      profile, 
      signInWithGoogle, 
      signUp, 
      signIn, 
      signOut, 
      sendOTP,
      verifyOTP,
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
