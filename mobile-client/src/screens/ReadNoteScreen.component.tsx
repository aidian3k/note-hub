import React, { FC, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

export const ReadNoteScreen: FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const navigation = useNavigation();

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
          Beautiful weather app UI concepts we wish existed
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
            4/12/2020
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
          In the ever-evolving world of app design, envisioning a weather app
          that not only serves its purpose but also delights users with a
          visually stunning and intuitive interface is a thrilling prospect.
          Here are some conceptual ideas that could elevate the user experience
          of a weather app to new heights
        </Text>
      </View>
      <DeleteNoteModal
        id={1}
        title={"some"}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      />
    </SafeAreaView>
  );
};
