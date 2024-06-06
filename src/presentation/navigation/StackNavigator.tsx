import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { LoadingScreen } from "../screens/loading/LoadingScreen";
import { ProductScreen } from "../screens/product/ProductScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Product: { productId: string };
  Loading: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true,
        // cardStyleInterpolator: fadeAnimation,
      }}
    >
      <Stack.Screen
        name="Loading"
        options={{
          headerShown: false,
          cardStyleInterpolator: fadeAnimation,
        }}
        component={LoadingScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};
