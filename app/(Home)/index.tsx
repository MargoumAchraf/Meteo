import HomeComponet from '@/Screen/HomeComponent';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function LoginScreen() {

    return (
        <>
            <Stack.Screen options={{ title: 'Home' }} />
            <HomeComponet></HomeComponet>
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