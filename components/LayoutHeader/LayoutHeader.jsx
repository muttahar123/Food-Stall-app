import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../utils/colors";

// Custom header component
export default function LayoutHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.webp")}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 4,
  },
  logo: {
    width: "45%",
    height: 60,
  },
});
