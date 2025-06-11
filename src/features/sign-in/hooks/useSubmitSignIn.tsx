import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useSignInValidation } from "./useSignInValidation";
import { LoginPayload } from "../types/signInTypes";

export function useSubmitSignIn() {
  const { control, handleSubmit, reset } = useSignInValidation();
  const { signIn } = useAuth();
  const router = useRouter();

  // Função que será executada com os dados validados
  const onSubmit = async (data: LoginPayload) => {
    console.log("🚀 Dados do login:", data); // ← Agora valores corretos

    try {
      await signIn(data.user, data.password);
      reset();
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha no login");
    }
  };

  return {
    handleSubmitSignIn: handleSubmit(onSubmit), // ← aqui a mágica
    control,
    resetForm: reset,
  };
}
