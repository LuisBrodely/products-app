import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/presentation/navigation/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
