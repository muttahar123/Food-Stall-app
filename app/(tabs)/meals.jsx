import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { routes } from "../../utils/routes";
import MealCard from "../../components/MealCard/MealCard";
import { colors } from "../../utils/colors";
import Toast from "react-native-toast-message";
import Loading from "../../components/Loading/Loading";

export default function MealForm() {
  const { token, user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMeals();
  }, []);

  useEffect(() => {
    if (user) {
      getMeals();
    }
  }, [user, token]);

  const getMeals = async () => {
    // console.log("User", user);
    // console.log("Token", token);
    try {
      const res = await axios.get(
        routes.getMeals + "?" + `branch=${user.branch}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMeals(res.data?.data);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      Toast.show({
        type: "error",
        text2: "Oops, something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Meals</Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={meals}
        keyExtractor={(meal) => meal._id}
        contentContainerStyle={styles.contentContainer}
        renderItem={(meal) => {
          return <MealCard meal={meal} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    gap: 8,
    paddingBottom: 8,
  },
  heading: {
    fontSize: 24,
    fontFamily: "monsterrat",
    fontWeight: 600,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
});
