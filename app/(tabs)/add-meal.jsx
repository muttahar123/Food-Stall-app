import { useState, useEffect, useContext } from "react";
import { router } from "expo-router";
import { colors } from "../../utils/colors";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CameraComponent from "../../components/CameraComponent/CameraComponent";
import Toast from "react-native-toast-message";
import axios from "axios";
import { routes } from "../../utils/routes";
import { AuthContext } from "../../contexts/AuthContext";

export default function AddMeal() {
  const [cameraPermission, setCameraPermission] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  //? Get camera permission
  useEffect(() => {
    const askCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        setCameraPermission(false);
      }
    };
    askCameraPermission();
  }, []);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      type: "",
      numberOfPeople: "",
      isFoodLeft: false,
    },
  });

  const addMeal = async (data) => {
    const { type, numberOfPeople, isFoodLeft } = data;
    //* Validate the form fields and show error if any field is missing
    if (!type || !numberOfPeople || isFoodLeft === "" || !capturedImage) {
      Toast.show({
        type: "error",
        text1: "Please fill all fields to add meal.",
      });
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();

      //* Add image to FormData
      formData.append("image", {
        uri: capturedImage,
        type: "image/jpeg",
        name: "meal-image.jpg",
      });

      //* Add other form fields to the form data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      //* Make a post request and send formData in body and token in header
      const res = await axios.post(routes.addMeal, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      //* Stop loading and show success message
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Meal added successfully!",
      });
      router.push("/meals");
      reset();
      setCapturedImage(null);
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Oops, something went wrong.",
      });
    }
  };

  //? Show error message if permissions are not granted
  if (!cameraPermission) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="camera" size={100} color={colors.secondary} />
        <Text style={styles.errorText}>Please allow camera permission!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Add Meal Details</Text>
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          {/* Meal Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Meal Type</Text>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <View style={styles.pickerWrapper}>
                  <Picker
                    style={styles.picker}
                    selectedValue={value}
                    onValueChange={onChange}
                  >
                    <Picker.Item
                      style={styles.pickerItem}
                      label="Select Meal Type"
                      value=""
                    />
                    <Picker.Item
                      style={styles.pickerItem}
                      label="BreakFast"
                      value="breakFast"
                    />
                    <Picker.Item
                      style={styles.pickerItem}
                      label="Lunch"
                      value="lunch"
                    />
                    <Picker.Item
                      style={styles.pickerItem}
                      label="Dinner"
                      value="dinner"
                    />
                    <Picker.Item
                      style={styles.pickerItem}
                      label="Sehri"
                      value="sehri"
                    />
                    <Picker.Item
                      style={styles.pickerItem}
                      label="Iftaar"
                      value="iftaar"
                    />
                  </Picker>
                </View>
              )}
            />
          </View>

          {/* Number of People */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of People</Text>
            <Controller
              control={control}
              name="numberOfPeople"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter number of people"
                />
              )}
            />
          </View>

          {/* Is Food Left */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Is Food Left?</Text>
            <Controller
              control={control}
              name="isFoodLeft"
              render={({ field: { onChange, value } }) => (
                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      value && styles.radioButtonSelected,
                    ]}
                    onPress={() => onChange(true)}
                  >
                    <Text
                      style={[
                        styles.radioText,
                        value && styles.radioTextSelected,
                      ]}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      !value && styles.radioButtonSelected,
                    ]}
                    onPress={() => onChange(false)}
                  >
                    <Text
                      style={[
                        styles.radioText,
                        !value && styles.radioTextSelected,
                      ]}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          {/* Camera Button */}
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => setCameraActive(true)}
            disabled={loading}
          >
            <Text style={styles.cameraButtonText}>
              {capturedImage ? "Retake" : "Add Picture"}
            </Text>
            {capturedImage ? (
              <FontAwesome name="undo" size={22} color="white" />
            ) : (
              <Ionicons name="camera" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>

        {capturedImage && (
          <View style={styles.imagePreview}>
            <Image
              source={{ uri: capturedImage }}
              style={styles.previewImage}
            />
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(addMeal)}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Adding" : "Add Meal"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Camera Modal */}
      {cameraPermission && cameraActive && (
        <CameraComponent
          setCameraActive={setCameraActive}
          setCapturedImage={setCapturedImage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: "monsterrat",
    color: colors.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  inputGroup: {},
  label: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: "poppins",
  },
  input: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    fontFamily: "poppins",
    padding: 8,
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
  },
  picker: {
    height: 60,
  },
  pickerItem: {
    fontFamily: "poppins",
  },
  radioGroup: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  radioButton: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.secondary,
    backgroundColor: "#fff",
  },
  radioButtonSelected: {
    backgroundColor: colors.secondary,
  },
  radioText: {
    fontFamily: "poppins",
    color: colors.secondary,
  },
  radioTextSelected: {
    color: "#fff",
  },
  cameraButton: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cameraButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins",
    paddingTop: 2,
  },
  imagePreview: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  previewImage: {
    height: 250,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontFamily: "poppins",
    fontSize: 16,
  },

  //* Error message styles
  errorContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  errorText: {
    fontSize: 24,
    fontFamily: "monsterrat",
    color: colors.secondary,
    textAlign: "center",
  },
  askPermissionButton: {
    width: "80%",
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
  },
});
