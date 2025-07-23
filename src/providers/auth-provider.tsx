

'use client';

import { createContext, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/hooks/use-local-storage';
import { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (userData: Omit<User, 'id' | 'points'> & {password: string}) => boolean;
  updateUser: (newProfileData: Omit<User, 'id' | 'points' | 'email'>) => boolean;
  addPoints: (pointsToAdd: number) => void;
  spendPoints: (pointsToSpend: number) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('abiko-user-session', null);
  const [users, setUsers] = useLocalStorage<Record<string, string>>('abiko-users', {});
  const router = useRouter();
  const { toast } = useToast();

  const login = useCallback((email: string, password: string): boolean => {
    const userPassword = users[email.toLowerCase()];
    if (userPassword && userPassword === password) {
      const userData = localStorage.getItem(`abiko-user-profile-${email.toLowerCase()}`);
      if (userData) {
        const parsedUser = JSON.parse(userData) as User;
        // Also store user by ID for easy lookup in posts
        localStorage.setItem(`abiko-user-profile-by-id-${parsedUser.id}`, JSON.stringify(parsedUser));
        setUser(parsedUser);
        router.push('/delivery');
        return true;
      }
    }
    toast({
      variant: 'destructive',
      title: 'Login Failed',
      description: 'Invalid email or password.',
    });
    return false;
  }, [users, setUser, router, toast]);

  const signup = useCallback((userData: Omit<User, 'id' | 'points'> & {password: string}): boolean => {
    const { email, password, ...profileData } = userData;
    const lowerCaseEmail = email.toLowerCase();
    
    if (users[lowerCaseEmail]) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'An account with this email already exists.',
      });
      return false;
    }

    const newUserId = `user_${Date.now()}`;
    const newUser: User = {
      id: newUserId,
      email: lowerCaseEmail,
      points: 0,
      ...profileData,
    };
    
    setUsers({ ...users, [lowerCaseEmail]: password });
    localStorage.setItem(`abiko-user-profile-${lowerCaseEmail}`, JSON.stringify(newUser));
    // Also store user by ID for easy lookup in posts
    localStorage.setItem(`abiko-user-profile-by-id-${newUserId}`, JSON.stringify(newUser));


    setUser(newUser);
    router.push('/delivery');
    toast({
        title: 'Welcome to Abhiko!',
        description: 'Your account has been created successfully.',
    });
    return true;
  }, [users, setUsers, setUser, router, toast]);

  const logout = useCallback(() => {
    setUser(null);
    router.push('/login');
  }, [setUser, router]);

  const updateUser = useCallback((newProfileData: Omit<User, 'id' | 'points' | 'email'>): boolean => {
    if (!user) return false;

    const updatedUser: User = { ...user, ...newProfileData };
    
    setUser(updatedUser);
    localStorage.setItem(`abiko-user-profile-${user.email}`, JSON.stringify(updatedUser));
    localStorage.setItem(`abiko-user-profile-by-id-${user.id}`, JSON.stringify(updatedUser));

    return true;
  }, [user, setUser]);

  const updatePointsInStorage = (updatedUser: User) => {
    localStorage.setItem(`abiko-user-profile-${updatedUser.email}`, JSON.stringify(updatedUser));
    localStorage.setItem(`abiko-user-profile-by-id-${updatedUser.id}`, JSON.stringify(updatedUser));
  };

  const addPoints = useCallback((pointsToAdd: number) => {
    if (!user || pointsToAdd <= 0) return;
    
    const updatedUser = { ...user, points: user.points + pointsToAdd };
    setUser(updatedUser);
    updatePointsInStorage(updatedUser);
  }, [user, setUser]);

  const spendPoints = useCallback((pointsToSpend: number) => {
    if (!user || pointsToSpend <= 0) return;

    const updatedUser = { ...user, points: Math.max(0, user.points - pointsToSpend) };
    setUser(updatedUser);
    updatePointsInStorage(updatedUser);
  }, [user, setUser]);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, updateUser, addPoints, spendPoints }}>
      {children}
    </AuthContext.Provider>
  );
}
