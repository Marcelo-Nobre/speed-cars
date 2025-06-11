import { Modal } from "react-native";
import { colors } from "@/styles/colors";
import styled from "styled-components/native";

type ConfirmModalProps = {
  visible: boolean;
  title?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function ConfirmModal({
  visible,
  title = "Tem certeza?",
  onCancel,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <Box>
          <Message>{title}</Message>
          <Actions>
            <CancelButton onPress={onCancel}>
              <CancelText>{cancelText}</CancelText>
            </CancelButton>
            <ConfirmButton onPress={onConfirm}>
              <ConfirmText>{confirmText}</ConfirmText>
            </ConfirmButton>
          </Actions>
        </Box>
      </Overlay>
    </Modal>
  );
}

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: ${colors.background.white};
  padding: 24px;
  border-radius: 12px;
  width: 80%;
`;

const Message = styled.Text`
  font-size: 18px;
  color: ${colors.text.primary};
  text-align: center;
  margin-bottom: 20px;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CancelButton = styled.TouchableOpacity`
  padding: 10px 16px;
`;

const CancelText = styled.Text`
  color: ${colors.text.secondary};
  font-size: 16px;
`;

const ConfirmButton = styled.TouchableOpacity`
  padding: 10px 16px;
  background-color: ${colors.primary.main};
  border-radius: 6px;
`;

const ConfirmText = styled.Text`
  color: ${colors.background.white};
  font-size: 16px;
  font-weight: bold;
`;
