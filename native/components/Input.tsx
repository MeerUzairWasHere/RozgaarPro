import { View, TextInput, StyleSheet } from "react-native";

export default function Input(props: any) {
  return (
    <View style={styles.container}>
      <TextInput {...props} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
  },
});
