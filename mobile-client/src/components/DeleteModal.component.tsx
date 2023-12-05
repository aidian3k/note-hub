import React, { FC, useState } from "react";
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
  Spinner,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { apiService } from "../api/apiService";
import { useNavigation } from "@react-navigation/native";

export const DeleteNoteModal: FC<{
  id: number;
  title: string;
  showModal: boolean;
  setShowModal: any;
}> = (props) => {
  const { id, title, showModal, setShowModal } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigation = useNavigation();

  const deleteCurrentNote = async () => {
    try {
      setLoading(true);
      await apiService
        .delete<void>(`/api/note/${id}`)
        .then((result) => result.data);

      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast
              nativeID={"toast-" + id}
              action="error"
              variant="accent"
              mt="$8"
            >
              <VStack space="xs">
                <ToastTitle>Note deleted successfully</ToastTitle>
                <ToastDescription>
                  The note with title {title} has been deleted successfully!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      setShowModal(false);
      navigation.navigate("note-main-screen");
    } catch (error) {
      console.log(error);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <Toast
              nativeID={"toast-" + id}
              action="error"
              variant="accent"
              mt="$8"
            >
              <VStack space="xs">
                <ToastTitle>Error during note deletion</ToastTitle>
                <ToastDescription>
                  There was a problem with deleting the note!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    } finally {
      setLoading(false);
    }
  };

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
                onPress={deleteCurrentNote}
                style={{
                  backgroundColor: "red",
                }}
              >
                <ButtonText>Delete</ButtonText>
                {loading && <Spinner />}
              </Button>
            </HStack>
          </View>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
