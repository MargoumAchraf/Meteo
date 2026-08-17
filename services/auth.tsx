import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export default async function authenticateWithBiometrics() {
  // 1. Check hardware support
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) {
    Alert.alert('No biometric hardware available');
    return false;
  }

  // 2. Check if user has enrolled Face ID / fingerprint
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!isEnrolled) {
    Alert.alert('No biometrics enrolled. Please set up Face ID or fingerprint in device settings.');
    return false;
  }

  // 3. (Optional) Check which types are supported
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
  // types includes FINGERPRINT, FACIAL_RECOGNITION, IRIS

  // 4. Prompt authentication
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate to continue',
    fallbackLabel: 'Use passcode',
    disableDeviceFallback: false, // set true to force biometric only
    cancelLabel: 'Cancel',
  });

  if (result.success) {
    console.log('Authenticated!');
    return true;
  } else {
    console.log('Failed or cancelled:', result.error);
    return false;
  }
}