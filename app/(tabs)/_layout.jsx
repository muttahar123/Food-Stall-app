import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import LayoutHeader from "../../components/LayoutHeader/LayoutHeader";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: "#fff",
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 2,
          borderStartWidth: 2,
          borderEndWidth: 2,
          borderColor: colors.primary,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          height: 70,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "poppins",
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        header: () => <LayoutHeader />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="meals"
        options={{
          title: "Meals",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-meal"
        options={{
          title: "Add",
          tabBarLabel() {
            return <></>;
          },
          tabBarIcon: () => (
            <Ionicons
              name="add-circle"
              style={{
                width: 60,
                position: "absolute",
                transform: [{ translateY: 8 }],
              }}
              size={60}
              color={colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sponser"
        options={{
          title: "Sponsor",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="accessibility" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
