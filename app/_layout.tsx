import 'react-native-reanimated';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(Auth)/index" options={{ title: 'Auth' }} />
      <Stack.Screen name="(Home)/index" options={{ title: 'Home' }} />
      <Stack.Screen name="(search)/index" options={{ title: 'Search' }} />
      <Stack.Screen name="(City)/Inex" options={{ title: 'City' }} />
    </Stack>
  );
}