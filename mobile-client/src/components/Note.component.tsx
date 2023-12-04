import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

export const NoteComponent: React.FC = () => {
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
      onPress={() => navigation.navigate("read-note")}
    >
      <VStack space={"md"} style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Title of the note
        </Text>
        <VStack space={"sm"}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "#555",
            }}
          >
            Some text in here about the vital things of the biology
          </Text>
          <Text style={{ fontSize: 12, color: "black", fontWeight: "bold" }}>
            May 21, 2020
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
