import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSubmitSignIn } from "@/features/sign-in/hooks/useSubmitSignIn";
import { colors } from "@/styles/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

export default function SignInScreen() {
  const { handleSubmitSignIn, control } = useSubmitSignIn();
  const [showPassword, setShowPassword] = useState(false);

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
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
                  color={colors.text.primary}
                  style={{ marginRight: 8 }}
                />
                <Controller
                  control={control}
                  name="user"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Nome"
                      placeholderTextColor={colors.text.placeholder}
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
                  color={colors.text.primary}
                  style={{ marginRight: 8 }}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Senha"
                      placeholderTextColor={colors.text.placeholder}
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
                    color={colors.text.primary}
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
  background-color: ${colors.background.white};
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
  background-color: ${colors.background.light};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${colors.text.primary};
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.text.primary};
  padding: 14px;
  border-radius: 8px;
  align-items: center;
`;

const LoginButtonText = styled.Text`
  color: ${colors.background.white};
  font-size: 16px;
  font-weight: bold;
`;
