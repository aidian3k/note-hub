import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { buildDateFromModificationDate, Note } from "../model/note/Note";

export const NoteComponent: React.FC<{ note: Note }> = (props) => {
  const { note } = props;
  const navigation = useNavigation();

  const getRandomBackgroundColorFromPalette = () => {
    return noteRandomColors[
      Math.floor(Math.random() * (noteRandomColors.length - 1))
    ];
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: getRandomBackgroundColorFromPalette(),
        width: "50%",
        borderRadius: 25,
      }}
      // @ts-ignore
      onPress={() => navigation.navigate("read-note", { noteId: note.id })}
    >
      <VStack space={"md"} style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {note.title}
        </Text>
        <VStack space={"sm"}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "#555",
            }}
          >
            {note.content}
          </Text>
          <Text style={{ fontSize: 12, color: "black", fontWeight: "bold" }}>
            {`${buildDateFromModificationDate(note.modificationDate)}`}
          </Text>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
};

const noteRandomColors: string[] = [
  "#ffdead",
  "#ff9999",
  "#ccb3ff",
  "#b3ffe0",
  "#ffffb3",
  "#ffd699",
];
