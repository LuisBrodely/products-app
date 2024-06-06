import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/presentation/navigation/StackNavigator";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from './src/presentation/providers/AuthProvider';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
