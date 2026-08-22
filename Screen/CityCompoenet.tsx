import CurrentConditions from '@/components/CurrentConditions/CurrentConditions';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import WeeklyOutlook from '@/components/WeeklyOutlook/WeeklyOutlook';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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




        <LinearGradient colors={['#1a1030', '#434625', '#804b21']} style={styles.container}>
            <SafeAreaView style={styles.SafeAreaView}>


                <Stack.Screen
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.ScrollView}
                >
                    {/* <Stack.Screen options={{ title: city ?? 'City' }} /> */}

                    <HeaderNav city={city} location={location} />
                    <WeeklyOutlook location={location} />
                </ScrollView>
            </SafeAreaView>

        </LinearGradient>








    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {

        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },
    ScrollView: {
        paddingHorizontal: 12,
        paddingVertical: 20,
        gap: 12,
    },

    message: {
        color: '#F8FAFC',
        padding: 24,
        fontSize: 14,
        textAlign: 'center',
    },
    SafeAreaView: {
        flex: 1,
    },

    iconContainer: {

        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingRight: 20
    }
});