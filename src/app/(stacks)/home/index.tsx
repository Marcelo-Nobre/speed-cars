import { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useBrands } from "@/features/brand/hooks/useBrands";
import { colors } from "@/styles/colors";
import SearchBar from "@/components/SearchBar";
import ConfirmModal from "@/components/ConfirmModal";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { brands, loading } = useBrands();

  const [search, setSearch] = useState("");
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setLogoutModalVisible(false);
    router.replace("/");
  };

  const handleBrandPress = (brandId: string, brandName: string) => {
    router.push(`/model/${brandId}?name=${encodeURIComponent(brandName)}`);
  };

  const filteredBrands = brands.filter((brand) =>
    brand.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TopRow>
          <WelcomeText>Olá, {user?.name}</WelcomeText>
          <LogoutButton onPress={() => setLogoutModalVisible(true)}>
            <Feather name="log-out" size={20} color={colors.background.white} />
          </LogoutButton>
        </TopRow>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por marca..."
        />

        <Title>Marcas de Carros</Title>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary.main}
            style={{ marginTop: 40 }}
          />
        ) : (
          <FlatList
            data={filteredBrands}
            keyExtractor={(item) => item.codigo}
            renderItem={({ item }) => (
              <BrandCard onPress={() => handleBrandPress(item.codigo, item.nome)}>
                <BrandText>{item.nome}</BrandText>
              </BrandCard>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </Container>

      <ConfirmModal
        visible={logoutModalVisible}
        title="Deseja realmente sair da aplicação?"
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
        confirmText="Sair"
        cancelText="Cancelar"
      />
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background.light};
  padding: 24px;
`;

const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WelcomeText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.text.primary};
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: ${colors.primary.main};
  padding: 10px;
  border-radius: 8px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.text.secondary};
  margin-bottom: 12px;
`;

const BrandCard = styled.TouchableOpacity`
  background-color: ${colors.background.white};
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const BrandText = styled.Text`
  font-size: 16px;
  color: ${colors.text.secondary};
`;
