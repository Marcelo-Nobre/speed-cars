import { useModels } from "@/features/model/hooks/useModels";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import SearchBar from "@/components/SearchBar";

export default function ModelScreen() {
  const { brandId, name } = useLocalSearchParams<{
    brandId: string;
    name?: string;
  }>();
  const { models, loading } = useModels(brandId!);
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredModels = models.filter((model) =>
    model.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <HeaderRow>
          <BackButton onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={colors.text.primary} />
          </BackButton>
          <Title>Modelos da Marca: {decodeURIComponent(name || "")}</Title>
        </HeaderRow>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar modelo..."
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary.main}
            style={{ marginTop: 40 }}
          />
        ) : (
          <FlatList
            data={filteredModels}
            keyExtractor={(item) => item.codigo}
            renderItem={({ item }) => (
              <ModelCard>
                <ModelText>{item.nome}</ModelText>
              </ModelCard>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background.light};
  padding: 24px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.text.primary};
  flex-shrink: 1;
`;

const ModelCard = styled.View`
  background-color: ${colors.background.white};
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ModelText = styled.Text`
  font-size: 16px;
  color: ${colors.text.secondary};
`;
