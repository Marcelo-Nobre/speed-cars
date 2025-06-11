import { createContext, useContext } from 'react';

export type User = {
    name: string;
    token: string;
};

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);
