import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import styled from "styled-components/native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChangeText, placeholder }: Props) {
  return (
    <SearchInputContainer>
      <SearchInput
        placeholder={placeholder || "Buscar..."}
        placeholderTextColor={colors.text.placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <Feather name="search" size={20} color={colors.text.placeholder} />
    </SearchInputContainer>
  );
}

const SearchInputContainer = styled.View`
 flex-direction: row;
  align-items: center;
  background-color: ${colors.background.white};
  border-radius: 12px;
  padding: 10px 12px;
  margin-top: 20px;
  margin-bottom: 12px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${colors.text.primary};
`;
