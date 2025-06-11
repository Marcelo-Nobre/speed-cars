import React, {useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, User} from './AuthContext';
import {useAuthServiceLogin} from "@/features/sign-in/services/authService";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const {login} = useAuthServiceLogin();

    useEffect(() => {
        const loadUserFromStorage = async () => {
            const storedUser = await AsyncStorage.getItem('@user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        loadUserFromStorage();
    }, []);


    const signIn = async (username: string, password: string) => {
        try {
            const data = await login({user: username, password});

            if (!data?.token || !data?.user?.name) {
                throw new Error('Erro ao fazer login');
            }

            const loggedUser: User = {
                name: data.user.name,
                token: data.token,
            };

            setUser(loggedUser);
            await AsyncStorage.setItem('@user', JSON.stringify(loggedUser));
        } catch (error: any) {
            throw new Error(error.message || 'Erro inesperado no login');
        }
    };

    const signOut = async () => {
        await AsyncStorage.removeItem('@user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};
