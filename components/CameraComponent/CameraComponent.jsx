import { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useCameraPermissions, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

const CameraComponent = ({ setCameraActive, setCapturedImage }) => {
  const cameraRef = useRef(null);
  const [status, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const toggleTorch = () => setTorch(!torch);
  const turnCameraOff = () => setCameraActive(false);
  const takePicture = async () => {
    try {
      if (!isReady || !cameraRef.current) return;
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });
      setCapturedImage(photo.uri);
      setCameraActive(false);
    } catch (error) {
      Alert.alert("Error", "Failed to take picture");
      console.error(error);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      <CameraView
        facing="back"
        ref={cameraRef}
        mode="picture"
        enableTorch={torch}
        onMountError={() => setCameraActive(false)}
        onCameraReady={() => setIsReady(true)}
        style={styles.camera}
      >
        <View style={styles.cameraControls}>
          {/* Flashlight button */}
          <TouchableOpacity style={styles.flashButton} onPress={toggleTorch}>
            {!torch ? (
              <Ionicons name="flash-off" size={30} />
            ) : (
              <Ionicons name="flash" size={30} />
            )}
          </TouchableOpacity>

          {/* Capture Button */}
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
            disabled={!isReady}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={turnCameraOff}>
            <Ionicons name="close" size={30} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    ...StyleSheet.absoluteFillObject,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: 40,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
  },
  flashButton: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraComponent;
