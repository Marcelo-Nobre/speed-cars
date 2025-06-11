import {apiAuth} from "@/services/api";
import {LoginPayload} from "@/features/sign-in/types/signInTypes";

export const useAuthServiceLogin = () => {
    const login = async ({user, password}: LoginPayload) => {
        const response = await apiAuth.post('/signIn', {user, password});
        return response.data;
    };

    return {
        login,
    }

}
