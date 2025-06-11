import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSignInValidation } from "@/features/sign-in/hooks/useSignInValidation";
import { useSubmitSignIn } from "@/features/sign-in/hooks/useSubmitSignIn";

export default function SignInScreen() {
  const { handleSubmitSignIn, control } = useSubmitSignIn();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require("@/assets/background-image.png")}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <Overlay>
            <Card>
              <LoginText>Login</LoginText>

              <InputGroup>
                <Feather
                  name="user"
                  size={20}
                  color="#000"
                  style={{ marginRight: 8 }}
                />
                <Controller
                  control={control}
                  name="user"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Nome"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </InputGroup>

              <InputGroup>
                <Feather
                  name="lock"
                  size={20}
                  color="#000"
                  style={{ marginRight: 8 }}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Senha"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                    />
                  )}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#000"
                    style={{ marginLeft: 8 }}
                  />
                </TouchableOpacity>
              </InputGroup>

              <LoginButton onPress={handleSubmitSignIn}>
                <LoginButtonText>Entrar</LoginButtonText>
              </LoginButton>
            </Card>
          </Overlay>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Card = styled.View`
  width: 90%;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  align-items: center;
`;

const LoginText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const InputGroup = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #000;
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #000;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
`;

const LoginButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
