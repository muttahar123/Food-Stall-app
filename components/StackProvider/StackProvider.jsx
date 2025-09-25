// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import Toast from "react-native-toast-message";
// import Loading from "../Loading/Loading";
// import { Redirect, Stack } from "expo-router";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import { routes } from "../../utils/routes";

// const AuthenticatedStack = () => {
//   return (
//     <Stack
//       initialRouteName="(tabs)/index"
//       screenOptions={{
//         headerShown: false,
//         contentStyle: { backgroundColor: "#fff" },
//       }}
//     >
//       <Stack.Screen name="(tabs)/index" />
//       <Stack.Screen name="(tabs)/meals" />
//       <Stack.Screen name="(tabs)/add-meal" />
//       <Stack.Screen name="(tabs)/sponsor" />
//       <Stack.Screen name="(tabs)/profile" />
//     </Stack>
//   );
// };

// const UnauthenticatedStack = () => {
//   return <Redirect href={"/login"} />;
// };

// export const StackProvider = () => {
//   const { user, setUser, setToken } = useContext(AuthContext);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         console.log("Checking for stored token...");
//         const storedToken = await SecureStore.getItemAsync("token");
//         if (storedToken) {
//           console.log("Token found, setting token in context");
//           setToken(storedToken);
//           const res = await axios.get(routes.userInfo, {
//             headers: { Authorization: `Bearer ${storedToken}` },
//           });
//           console.log("Response received:", res.data);
//           setUser(res.data?.data);
//           console.log("User data set:", res.data?.data);
//         } else {
//           console.log("No token found");
//           setUser(null); // Ensure user is null if no token is found
//         }
//       } catch (err) {
//         console.log("Error fetching user:", err);
//         Toast.show({
//           type: "error",
//           text1: "Something went wrong.",
//         });
//         setUser(null); // Ensure user is null on error
//       } finally {
//         console.log("Finished loading, setting loading state to false");
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Debugging the user state
//   console.log("User state in StackProvider:", user);
//   if (loading) return <Loading />;

//   console.log("Rendering stack:", user ? "authenticated" : "unauthenticated");

//   return <UnauthenticatedStack />;
// };
