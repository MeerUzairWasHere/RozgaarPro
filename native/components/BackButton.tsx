import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, useColorScheme } from "react-native";

const BackButton = () => {
  const colourScheme = useColorScheme();

  return (
    <Pressable
      onPress={() => router.back()}
      android_ripple={{ color: "rgba(0,0,0,0.12)" }}
      className="p-2 rounded-full overflow-hidden self-start"
    >
      <ArrowLeft size={24} color={colourScheme === "dark" ? "#fff" : "#000"} />
    </Pressable>
  );
};
export default BackButton;
