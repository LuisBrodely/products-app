import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<RootStackParamList, "Register"> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={user.name}
        style={{ marginBottom: 20 }}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />

      <TextInput
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
        onPress={() => {
          console.log("login");
          navigation.navigate("Home");
        }}
      >
        Register
      </Button>

      <Text style={{ marginTop: 20, marginBottom: 8 }}>
        Already have an account?
      </Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => {
          console.log("login");
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
