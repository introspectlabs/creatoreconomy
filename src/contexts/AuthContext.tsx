'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading] = useState(false);

  // Default Sign In (no Supabase)
  const signIn = async (email: string, _password: string) => {
    const mockUser = { id: '1', email, name: email.split('@')[0] };
    setUser(mockUser);
    setSession({ user: mockUser });
    return { user: mockUser, session: { user: mockUser } };
  };

  // Default Sign Up (no Supabase)
  const signUp = async (email: string, _password: string, metadata: any = {}) => {
    const mockUser = { id: '1', email, name: metadata?.fullName || email.split('@')[0] };
    setUser(mockUser);
    setSession({ user: mockUser });
    return { user: mockUser, session: { user: mockUser } };
  };

  // Sign Out
  const signOut = async () => {
    setUser(null);
    setSession(null);
  };

  // Get Current User
  const getCurrentUser = async () => {
    return user;
  };

  // Check if Email is Verified
  const isEmailVerified = () => {
    return true;
  };

  // Get User Profile
  const getUserProfile = async () => {
    if (!user) return null;
    return { id: user.id, email: user.email, name: user.name };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    isEmailVerified,
    getUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
