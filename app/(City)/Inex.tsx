import CityCompoenet from '@/Screen/CityCompoenet';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function CityScreen() {
    const { latitude, longitude, city } = useLocalSearchParams<{
        latitude: string;
        longitude: string;
        city: string;
    }>();

    return (
        <>
            <Stack.Screen options={{ title: city ?? 'City' }} />
            <CityCompoenet
                latitude={latitude}
                longitude={longitude}
                city={city}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
});