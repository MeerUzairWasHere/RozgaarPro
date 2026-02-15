import * as ImagePicker from "expo-image-picker";

export async function pickImageFromGallery(): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    quality: 0.7,
    allowsEditing: true,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }

  return null;
}

export async function takePhotoWithCamera(
  cameraType: ImagePicker.CameraType,
): Promise<string | null> {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchCameraAsync({
    quality: 0.7,
    allowsEditing: true,
    cameraType,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }

  return null;
}
