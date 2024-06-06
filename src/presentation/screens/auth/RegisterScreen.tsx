import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useAuthStore } from "../../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParamList, "Register"> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { register } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const onRegister = async () => {
    if (!user.fullName || !user.username || !user.password) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    setIsLoading(true);
    const response = await register(user.fullName, user.username, user.password);
    setIsLoading(false);
    if (response) return

    Alert.alert("Error", "Invalid credentials");
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Full Name"
        value={user.fullName}
        style={{ marginBottom: 20 }}
        onChangeText={(text) => setUser({ ...user, fullName: text })}
      />

      <TextInput
        autoCapitalize="none"
        label="Email"
        value={user.username}
        style={{ marginBottom: 20 }}
        onChangeText={(text) => setUser({ ...user, username: text })}
      />

      <TextInput
        label="Password"
        value={user.password}
        secureTextEntry
        style={{ marginBottom: 20 }}
        onChangeText={(text) => setUser({ ...user, password: text })}
      />

      <Button
        mode="contained"
        onPress={onRegister}
        disabled={isLoading}
      >
        Register
      </Button>

      <Text style={{ marginTop: 20, marginBottom: 8 }}>
        Already have an account?
      </Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 24,
  },
});
