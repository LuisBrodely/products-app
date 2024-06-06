import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/presentation/navigation/StackNavigator";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
