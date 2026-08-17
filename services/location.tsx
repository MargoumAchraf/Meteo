import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export default async function getCurrentLocation() {
  // 1. Ask permission
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return null;
  }

  // 2. Get position
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced, // good enough for weather, saves battery
  });

  return location.coords; // { latitude, longitude, altitude, accuracy, ... }
}