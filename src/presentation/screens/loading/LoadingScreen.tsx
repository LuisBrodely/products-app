import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        color={MD2Colors.purple400}
        size={"large"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
