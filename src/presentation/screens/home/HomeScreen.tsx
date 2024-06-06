import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons';

export const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Logout
      </Button>
    </View>
  )
}