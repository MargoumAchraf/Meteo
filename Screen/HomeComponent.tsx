import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // npm i expo-linear-gradient
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import CurrentConditions from '@/components/CurrentConditions/CurrentConditions';
import WeeklyOutlook from '@/components/WeeklyOutlook/WeeklyOutlook';
import useCurrentLocation from '@/services/location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
export default function WeatherScreen() {
  const { location, city, errorMsg: locationError, loading: locationLoading } =
    useCurrentLocation();

  if (locationLoading) {
    return (

      <LinearGradient colors={['#1a1030', '#434625', '#804b21']} style={styles.container}>
        <Text style={styles.message}>Loading location...</Text>
      </LinearGradient>

    );
  }

  if (locationError) {
    return (
      <LinearGradient colors={['#1a1030', '#434625', '#804b21']} style={styles.container}>
        <Text style={styles.message}>{locationError}</Text>
      </LinearGradient>
    );
  }
  if (!location) {
    return (
      <LinearGradient colors={['#1a1030', '#434625', '#804b21']} style={styles.container}>
        <Text style={styles.message}>Unable to determine location.</Text>
      </LinearGradient>
    );
  }
  return (
    <LinearGradient colors={['#1a1030', '#434625', '#804b21']} style={styles.container}>
      <SafeAreaView style={styles.SafeAreaView}>

        <TouchableOpacity onPress={() => router.navigate('/(search)')} style={styles.iconContainer}>
          <Ionicons
            name="add-circle-outline"
            color="white"
            size={50}
          />
        </TouchableOpacity>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ScrollView}
        >
          <HeaderNav city={city} location={location} />
          <CurrentConditions location={location} />
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