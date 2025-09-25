import { routes } from "../../utils/routes";
import axios from "axios";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../../components/Loading/Loading";
import { PieChart } from "react-native-chart-kit";
import { RefreshControl } from "react-native";

export default function Home() {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getStats();
  }, []);

  useEffect(() => {
    getStats();
  }, [token]);

  const getStats = async () => {
    try {
      setLoading(true);
      const stats = await axios.get(routes.stats, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(stats?.data?.data);
      setRefreshing(false);
      setLoading(false);
    } catch (err) {
      setRefreshing(false);
      setLoading(false);
      console.log(err);
    }
  };

  const foodLeftPercentage =
    stats && stats.foodLeft ? Math.ceil(stats.foodLeft.percentage) : 0;
  const data = [
    {
      name: "Meals",
      percentage: 100,
      color: colors.primary,
      legendFontColor: "#7F7F7F",
      legendFontSize: 16,
    },
    {
      name: "Food Left",
      percentage: foodLeftPercentage,
      color: colors.secondary,
      legendFontColor: "#7F7F7F",
      legendFontSize: 16,
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
      <Text style={styles.mainHeading}>Stats</Text>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Ionicons name="fast-food" size={24} color={colors.primary} />
          <Text style={styles.value}>{stats?.meals?.total}</Text>
          <Text style={styles.heading}>Meals</Text>
        </View>
        <View style={styles.item}>
          <MaterialIcons name="no-meals" size={24} color={colors.primary} />
          <Text style={styles.value}>{stats?.foodLeft?.meals}</Text>
          <Text style={styles.heading}>Food Left</Text>
        </View>
        <View style={styles.item}>
          <MaterialIcons
            name="free-breakfast"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.value}>{stats?.meals?.breakfast}</Text>
          <Text style={styles.heading}>Breakfast</Text>
        </View>
        <View style={styles.item}>
          <MaterialIcons name="lunch-dining" size={24} color={colors.primary} />
          <Text style={styles.value}>{stats?.meals?.lunch}</Text>
          <Text style={styles.heading}>Lunch</Text>
        </View>
        <View style={styles.item}>
          <MaterialIcons
            name="dinner-dining"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.value}>{stats?.meals?.dinner}</Text>
          <Text style={styles.heading}>Dinner</Text>
        </View>
        <View style={styles.item}>
          <Ionicons name="people" size={24} color={colors.primary} />
          <Text style={styles.value}>{stats?.peopleFed}</Text>
          <Text style={styles.heading}>People Fed</Text>
        </View>
      </View>
      {stats && (
        <View style={styles.chartWrapper}>
          <Text style={styles.chartHeading}>Food Left Ratio</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={data}
              width={250}
              height={220}
              hasLegend={false}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={"percentage"}
              backgroundColor={"transparent"}
              paddingLeft={"60"}
              absolute
            />
            <View style={styles.legendContainer}>
              {data.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[styles.colorBox, { backgroundColor: item.color }]}
                  />
                  <Text
                    style={[styles.legendText, { color: item.legendFontColor }]}
                  >
                    {item.name}: {Math.ceil(item.percentage)}%
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    flex: 1,
    paddingHorizontal: 16,
  },
  mainHeading: {
    fontSize: 24,
    fontFamily: "monsterrat",
    color: colors.secondary,
    textAlign: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
    paddingVertical: 16,
  },
  item: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    width: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  heading: {
    color: colors.secondary,
    fontFamily: "poppins",
    fontWeight: 600,
  },
  value: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "monsterrat",
    marginTop: 8,
  },
  chartWrapper: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  chartHeading: {
    fontSize: 24,
    fontFamily: "monsterrat",
    color: colors.secondary,
    textAlign: "center",
    marginTop: 8,
  },
  chartContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  legendContainer: {
    // marginLeft: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 20,
  },
  legendText: {
    fontSize: 16,
    fontFamily: "poppins",
  },
});
