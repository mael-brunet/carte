import { Camera, CameraType } from "expo-camera";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PhotoContext } from "./photoContext";
import * as Location from "expo-location";
import React from "react";

type PhotoType = {
  uri: string;
  latitude: number;
  longitude: number;
};

export default function ModalsScreen() {
  const cameraRef = useRef<Camera | null>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { photos, setPhotos } = useContext(PhotoContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.8 };
      const userLocation = await Location.getCurrentPositionAsync();
      const photo: PhotoType = {
        uri: (await cameraRef.current.takePictureAsync(options)).uri,
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };
      console.log("test" + photo.uri)
      setPhotos([photo, ...photos]);
      await AsyncStorage.setItem("photos", JSON.stringify([...photos, photo]));
      console.log(photo);
    }
  };

  return (
    <View>
      <Camera
        type={CameraType.back}
        ref={(camera: Camera | null | undefined) => {
          cameraRef.current = camera;
        }}
        style={{ width: "100%", height: "100%" }}
      />
      <View>
      <TouchableOpacity onPress={takePicture} style={styles.button}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 200,
    backgroundColor: 'white',
    height: 50,
    width: 50,
    justifyContent: 'center',
    position: 'absolute',
    bottom:10,
    alignSelf: 'center',
  },
});