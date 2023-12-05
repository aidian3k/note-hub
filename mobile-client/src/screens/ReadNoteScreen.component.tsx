import React, { FC, useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import {
  ArrowLeftIcon,
  Button,
  ButtonIcon,
  EditIcon,
  HStack,
  TrashIcon,
} from "@gluestack-ui/themed";
import { DeleteNoteModal } from "../components/DeleteModal.component";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Note, buildDateFromModificationDate } from "../model/note/Note";
import { apiService } from "../api/apiService";

export const ReadNoteScreen: FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const navigation = useNavigation();
  const [note, setNote] = useState<Note>({
    content: "",
    title: "",
    id: -1,
    modificationDate: [],
  });
  const route = useRoute();

  const fetchNoteData = async () => {
    try {
      // @ts-ignore
      await apiService
        .get<Note>(`/api/note/${route.params.noteId}`)
        .then((result) => {
          setNote(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNoteData();
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3b3c36" }}>
      <HStack style={{ justifyContent: "space-between", padding: 15 }}>
        <View>
          <Button
            size="md"
            p="$3.5"
            bg="$indigo600"
            borderRadius={"$full"}
            borderColor="$indigo600"
            // @ts-ignore
            onPress={() => navigation.navigate("note-main-screen")}
          >
            <ButtonIcon as={ArrowLeftIcon} />
          </Button>
        </View>
        <View>
          <HStack space={"sm"}>
            <Button
              size="md"
              p="$3.5"
              borderRadius={"$full"}
              style={{
                backgroundColor: "orange",
              }}
              // @ts-ignore
              onPress={() =>
                navigation.navigate("edit-note", { noteId: note.id })
              }
            >
              <ButtonIcon as={EditIcon} />
            </Button>
            <HStack space={"sm"}>
              <Button
                size="md"
                p="$3.5"
                borderRadius={"$full"}
                style={{
                  backgroundColor: "red",
                }}
                onPress={() => setShowDeleteModal(true)}
              >
                <ButtonIcon as={TrashIcon} />
              </Button>
            </HStack>
          </HStack>
        </View>
      </HStack>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 32,
            includeFontPadding: true,
            color: "white",
            textAlign: "center",
          }}
        >
          {note.title}
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <HStack space={"sm"}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              includeFontPadding: true,
              color: "white",
              textAlign: "center",
            }}
          >
            Modification date:
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              includeFontPadding: true,
              color: "white",
              textAlign: "center",
            }}
          >
            {`${buildDateFromModificationDate(note.modificationDate)}`}
          </Text>
        </HStack>
      </View>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            color: "white",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {note.content}
        </Text>
      </View>
      <DeleteNoteModal
        id={note.id}
        title={note.title}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      />
    </SafeAreaView>
  );
};
