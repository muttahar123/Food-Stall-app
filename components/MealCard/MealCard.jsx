import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../utils/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function MealCard({ meal }) {
  let { type, numberOfPeople, isFoodLeft, image } = meal.item;
  type = type.charAt(0).toUpperCase() + type.slice(1);
  let iconName =
    type === "breakfast"
      ? "free-breakfast"
      : type === "lunch"
      ? "lunch-dining"
      : "dinner-dining";
  return (
    <View style={styles.container}>
      {/* Number of people */}
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>{numberOfPeople} People</Text>
      </View>

      {/* Image Wrapper */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      {/* Info Wrapper */}
      <View style={styles.info}>
        <View style={styles.infoTitle}>
          <MaterialIcons name={iconName} size={24} color={colors.primary} />
          <Text style={styles.infoText}>Meal Type</Text>
        </View>
        <Text style={styles.infoText}>{type}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infoTitle}>
          <MaterialIcons name="lunch-dining" size={20} color={colors.primary} />
          <Text style={styles.infoText}>Food Left</Text>
        </View>
        <Text style={styles.infoText}>{isFoodLeft ? "Yes" : "No"}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 8,
    borderRadius: 8,
  },
  headingWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
  },
  heading: {
    color: colors.secondary,
    fontSize: 20,
    fontFamily: "poppinsbold",
    marginTop: 4,
  },
  imageWrapper: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  infoText: {
    color: colors.primary,
    fontFamily: "poppinsbold",
    marginTop: 4,
  },
});
