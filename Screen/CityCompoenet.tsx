import HeaderNav from '@/components/HeaderNav/HeaderNav';
import WeeklyOutlook from '@/components/WeeklyOutlook/WeeklyOutlook';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type CityComponentProps = {
    latitude: string;
    longitude: string;
    city: string;
};

export default function CityCompoenet({
    latitude,
    longitude,
    city,
}: CityComponentProps) {

    const location = {
        latitude: Number(latitude),
        longitude: Number(longitude),
    };

    return (
        <>
            <Stack.Screen options={{ title: city ?? 'City' }} />

                <HeaderNav city={city} location={location} />
                <WeeklyOutlook location={location} />

                
          
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