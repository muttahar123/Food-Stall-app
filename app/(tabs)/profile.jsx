import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import { AuthContext } from "../../contexts/AuthContext";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
export default function Profile() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  const handleLogout = async () => {
    setUser(null);
    setToken(null);
    await SecureStore.deleteItemAsync("token");
    router.navigate("/");
    router.canGoBack() && router.dismissAll();
  };

  useEffect(() => {
    if (user) setUserData(user);
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={{ uri: userData.profileImg }}
            style={styles.avatar}
            contentFit="cover"
            transition={1000}
          />
          <View style={styles.editIconContainer}>
            <MaterialCommunityIcons name="pencil" size={16} color="white" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{userData.fullname}</Text>
        <Text style={styles.role}>Branch Manager</Text>
      </View>

      {/* User Info Section */}
      <View style={styles.infoContainer}>
        <InfoItem icon="email" label="Email" value={userData.email} />
        <InfoItem icon="office-building" label="Branch Name" value="SMIT" />
        <InfoItem
          icon="map-marker"
          label="Branch Location"
          value="Bahadurabad"
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <View style={styles.infoItem}>
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={colors.primary}
        style={styles.infoIcon}
      />
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#2196F3",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 4,
    fontFamily: "poppins",
  },
  role: {
    fontSize: 14,
    color: "#E8F5E9",
    marginBottom: 8,
    fontFamily: "monsterrat",
  },
  infoContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  infoItem: {
    borderWidth: 1,
    borderColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  infoIcon: {
    marginRight: 12,
  },
  infoLabel: {
    color: "#666",
    fontFamily: "poppins",
  },
  infoValue: {
    fontWeight: "bold",
    color: colors.secondary,
    fontFamily: "monsterrat",
  },
  logoutButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 24,
  },
  logoutButtonText: {
    color: "#fff",
    fontFamily: "poppins",
    fontSize: 16,
  },
});
