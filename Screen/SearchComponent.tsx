import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Pressable,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type Place = {
    place_id: string;
    description: string;
};

export default function SearchPlace() {
    const [search, setSearch] = useState('');
    const [places, setPlaces] = useState<Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState('');

    const GOOGLE_API_KEY = 'AIzaSyAYVlBJlvPqEXPBdzO6osYCK2cgiqpgviM';

    const searchPlaces = async (text: string) => {
        setSearch(text);

        if (text.length < 2) {
            setPlaces([]);
            return;
        }

        try {
            const url =
                `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
                `?input=${encodeURIComponent(text)}` +
                `&types=(cities)` +
                `&components=country:ma` +
                `&key=${GOOGLE_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.predictions) {
                setPlaces(data.predictions);
            }
        } catch (error) {
            console.log('Search error:', error);
        }
    };

    const selectPlace = async (place: Place) => {
        setSearch(place.description);
        setSelectedPlace(place.description);
        setPlaces([]);

        console.log('Selected:', place.place_id);

        const detailsUrl =
            `https://maps.googleapis.com/maps/api/place/details/json?` +
            `place_id=${encodeURIComponent(place.place_id)}` +
            `&fields=geometry,name` +
            `&key=${GOOGLE_API_KEY}`;

        const response = await fetch(detailsUrl);
        const data = await response.json();

        if (data.status !== 'OK') {
            console.log('Google Places error:', data);
            return;
        }

        const location = data.result.geometry.location;

        const latitude = location.lat;
        const longitude = location.lng;

        console.log('Place:', data.result.name);
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);

        router.push({
            pathname: '/(City)/Inex',
            params: {
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                city: data.result.name,
            },
        });
    };

    return (
        <LinearGradient colors={['#1a1030', '#434625', '#804b21']} style={styles.gradient}>


            <SafeAreaView style={styles.container}>


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
                {/* Search input */}
                <View style={styles.searchContainer}>
                    <Text style={styles.icon}>🔍</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Search city..."
                        placeholderTextColor="#94A3B8"
                        value={search}
                        onChangeText={searchPlaces}
                        autoCapitalize="words"
                    />
                </View>

                {/* Places */}
                {places.length > 0 && (
                    <View style={styles.results}>
                        <FlatList
                            data={places}
                            keyExtractor={(item) => item.place_id}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => (
                                <Pressable
                                    style={styles.place}
                                    onPress={() => selectPlace(item)}
                                >
                                    <Text style={styles.locationIcon}>📍</Text>

                                    <View>
                                        <Text style={styles.placeName}>
                                            {item.description}
                                        </Text>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View>
                )}

                {/* Selected place */}
                {selectedPlace !== '' && (
                    <View style={styles.selected}>
                        <Text style={styles.selectedTitle}>
                            Selected location
                        </Text>

                        <Text style={styles.selectedPlace}>
                            📍 {selectedPlace}
                        </Text>
                    </View>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },

    container: {
        flex: 1,
        padding: 20,
    },
    backButton: {

        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },
    searchContainer: {
        height: 55,
        backgroundColor: '#1c2138',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },

    icon: {
        fontSize: 20,
        marginRight: 10,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: '#F8FAFC',
    },

    results: {
        backgroundColor: '#1c2138',
        marginTop: 8,
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },

    place: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },

    locationIcon: {
        fontSize: 20,
        marginRight: 12,
    },

    placeName: {
        fontSize: 15,
        color: '#F8FAFC',
    },

    selected: {
        marginTop: 30,
        backgroundColor: '#1c2138',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },

    selectedTitle: {
        fontSize: 14,
        color: '#94A3B8',
        marginBottom: 8,
    },

    selectedPlace: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F8FAFC',
    },
});