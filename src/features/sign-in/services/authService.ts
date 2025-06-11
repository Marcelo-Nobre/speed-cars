import { apiAuth } from "@/services/api";
import { LoginPayload } from "../types/signInTypes";

export const useAuthServiceLogin = () => {
    const login = async ({ user, password }: LoginPayload) => {
        try {
            const response = await apiAuth.post('/signIn', { user, password });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Falha no login');
        }
    };

    return { login };
};
