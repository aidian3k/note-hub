import React, { FC } from "react";
import { Text, View } from "react-native";
import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@gluestack-ui/themed";

export const DeleteNoteModal: FC<{
  id: number;
  title: string;
  showModal: boolean;
  setShowModal: any;
}> = (props) => {
  const { id, title, showModal, setShowModal } = props;

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" style={{ textAlign: "center" }}>
            Delete note
          </Heading>
          <ModalCloseButton
            style={{ backgroundColor: "red", borderRadius: 25 }}
          >
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Are you sure you want to delete note with title:
          </Text>
          <Heading size="lg" style={{ textAlign: "center" }}>
            Some title
          </Heading>
        </ModalBody>
        <ModalFooter>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <HStack space={"sm"}>
              <Button
                variant="outline"
                size="sm"
                action="secondary"
                mr="$3"
                onPress={() => {
                  setShowModal(false);
                }}
                style={{
                  backgroundColor: "gray",
                }}
              >
                <ButtonText style={{ color: "white" }}>Cancel</ButtonText>
              </Button>
              <Button
                size="sm"
                action="positive"
                borderWidth="$0"
                onPress={() => {
                  setShowModal(false);
                }}
                style={{
                  backgroundColor: "red",
                }}
              >
                <ButtonText>Delete</ButtonText>
              </Button>
            </HStack>
          </View>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
