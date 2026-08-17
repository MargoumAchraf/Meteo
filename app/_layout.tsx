import { Stack } from 'expo-router';
import 'react-native-reanimated';


export const unstable_settings = {
  anchor: '(auth)',
};

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="Auth" options={{ title: 'Auth' }} />
    </Stack>
  );
}
