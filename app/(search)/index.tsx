import HomeComponet from '@/Screen/HomeComponent';
import SearchPlace from '@/Screen/SearchComponent';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function SearchScreen() {

    return (
        <>
            <Stack.Screen />

            <SearchPlace></SearchPlace>

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