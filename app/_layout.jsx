import { router, Slot, Stack, useRouter } from "expo-router";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    poppins: require("../assets/fonts/Poppins.ttf"),
    poppinsbold: require("../assets/fonts/Poppins-Bold.ttf"),
    monsterrat: require("../assets/fonts/Monsterrat.ttf"),
    monsterratbold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthContextProvider>
  );
}
