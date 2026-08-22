import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import CurrentConditions from '@/components/CurrentConditions/CurrentConditions';
import WeeklyOutlook from '@/components/WeeklyOutlook/WeeklyOutlook';
import useCurrentLocation from '@/services/location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function WeatherScreen() {
  const { location, city, errorMsg: locationError, loading: locationLoading } =
    useCurrentLocation();

  return (
    <View style={styles.page}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.appTitle}>ISOBAR — DAILY WEATHER</Text>

        <View style={styles.pillNav}>
          <View style={[styles.pill, styles.pillActive]}>
            <Text style={styles.pillActiveText}>WEATHER</Text>
          </View>
          <TouchableOpacity
            style={styles.pill}
            onPress={() => router.navigate('/(search)')}
          >
            <Text style={styles.pillText}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#1a1030', '#434625', '#804b21']}
          style={styles.card}
        >
          {locationLoading ? (
            <Text style={styles.message}>Loading location...</Text>
          ) : locationError ? (
            <Text style={styles.message}>{locationError}</Text>
          ) : !location ? (
            <Text style={styles.message}>Unable to determine location.</Text>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.cardContent}
            >
              <HeaderNav city={city} location={location} />
              <CurrentConditions location={location} />
              <WeeklyOutlook location={location} />
            </ScrollView>
          )}
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#12111c',
  },
  safeArea: {
    flex: 1,
  },
  appTitle: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 11,
    letterSpacing: 2,
    color: '#94A3B8',
    fontFamily: 'monospace',
  },
  pillNav: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 999,
    padding: 4,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  pillActive: {
    backgroundColor: '#E8A33D',
  },
  pillActiveText: {
    color: '#1a1030',
    fontWeight: '700',
    fontSize: 13,
  },
  pillText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 13,
  },
  card: {
    flex: 1,
    borderRadius: 32,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardContent: {
    paddingBottom: 24,
  },
  message: {
    color: '#F8FAFC',
    padding: 24,
    fontSize: 14,
    textAlign: 'center',
  },
});