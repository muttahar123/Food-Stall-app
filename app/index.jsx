import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { loginSchema } from "../utils/schemas";
import { routes } from "../utils/routes";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors } from "../utils/colors";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser, setToken } = useContext(AuthContext);
  const router = useRouter();

  //* Initialize react-hook-form with zodResolver
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  //* Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      //* Make an API request to the server and send email and password in request body
      const res = await axios.post(routes.login, data);

      console.log(res?.data?.data?.user.role);

      //* Only allow branch managers to go through the app
      if (res?.data?.data?.user.role !== "branch manager") {
        setError("password", {
          type: "server",
          message: "Access denied, only branch managers are allowed to login.",
        });
        return;
      }
      //* Save the token in secure storage and navigate to the home page
      setUser(res?.data?.data?.user);
      setToken(res.data.data.token);
      await SecureStore.setItemAsync("token", String(res.data.data.token));
      router.push("/(tabs)");
    } catch (err) {
      //* Handle Axios errors
      if (axios.isAxiosError(err)) {
        setError("password", {
          type: "server",
          message: err.response?.data?.msg || "Something went wrong",
        });
      } else {
        setError("password", {
          type: "error",
          message: "Something went wrong",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Saylani Logo */}
      <Image
        source={require("../assets/images/logo.webp")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Login Form*/}
      <View style={styles.inputContainer}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              placeholderTextColor="#3d3333"
              style={[styles.input, errors.email && styles.errorInput]}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Password"
              placeholderTextColor="#3d3333"
              style={[styles.input, errors.password && styles.errorInput]}
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.disabledButton]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting || isLoading}
      >
        <Text style={styles.buttonText}>
          {isSubmitting || isLoading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Sponsor page link */}
      <TouchableOpacity
        style={styles.sponsorButton}
        onPress={() => router.push("/(tabs)/sponser")}
      >
        <Text style={styles.buttonText}>Become a Sponsor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 120,
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 28,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: "poppins",
    textAlignVertical: "center",
  },
  errorInput: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  button: {
    width: "80%",
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 50 / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "monsterrat",
    fontSize: 16,
    fontWeight: 600,
  },
  sponsorButton: {
    width: "80%",
    height: 48,
    backgroundColor: colors.secondary,
    borderRadius: 50 / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  sponsorButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
