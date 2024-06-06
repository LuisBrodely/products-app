import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuthStore } from '../../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const { logout } = useAuthStore()

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button mode="contained" onPress={logout}>
        Logout
      </Button>
    </View>
  )
}