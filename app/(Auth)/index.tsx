import authenticateWithBiometrics from '@/services/auth';
import { Stack, router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function LoginScreen() {
    useEffect(() => {
        const checkAuth = async () => {
            const success = await authenticateWithBiometrics();

            if (success) {
                router.replace('/(Home)');
            }
        };

        checkAuth();
    }, []);

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />

            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
});