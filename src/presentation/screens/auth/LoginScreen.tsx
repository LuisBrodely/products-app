import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { useAuthStore } from "../../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParamList, "Login"> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setIsLoading(true);
    const response = await login(form.email, form.password);
    setIsLoading(false);
    if (response) return;

    Alert.alert("Error", "Invalid credentials");
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        label="Email"
        value={form.email}
        style={{ marginBottom: 20 }}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />

      <TextInput
        label="Password"
        value={form.password}
        secureTextEntry
        style={{ marginBottom: 20 }}
        onChangeText={(text) => setForm({ ...form, password: text })}
      />

      <Button mode="contained" onPress={onLogin} disabled={isLoading}>
        Login
      </Button>

      <Text style={{ marginTop: 20, marginBottom: 8 }}>
        Don't have an account?
      </Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 24,
  },
});
