import { router } from 'expo-router';
import { Route } from 'expo-router/build/Route';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Pressable,
    StyleSheet,
    Linking,
} from 'react-native';

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

        // Open Google Maps
        const mapsUrl =
            `https://www.google.com/maps/search/?api=1&query=` +
            encodeURIComponent(place.description);

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
        <View style={styles.container}>

            {/* Search input */}
            <View style={styles.searchContainer}>
                <Text style={styles.icon}>🔍</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Search city..."
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

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f7fa',
    },

    searchContainer: {
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 3,
    },

    icon: {
        fontSize: 20,
        marginRight: 10,
    },

    input: {
        flex: 1,
        fontSize: 16,
    },

    results: {
        backgroundColor: '#fff',
        marginTop: 8,
        borderRadius: 15,
        overflow: 'hidden',
    },

    place: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    locationIcon: {
        fontSize: 20,
        marginRight: 12,
    },

    placeName: {
        fontSize: 15,
        color: '#222',
    },

    selected: {
        marginTop: 30,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
    },

    selectedTitle: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },

    selectedPlace: {
        fontSize: 18,
        fontWeight: '600',
    },
});