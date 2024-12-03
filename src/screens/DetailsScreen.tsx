import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import WeatherCard from '../components/WeatherCard';

const DetailsScreen = () => {
  const route = useRoute<any>();
  const { weatherData } = route.params;
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        title="Detail"
        showBackIcon={true}
        onBackIconPres={() => {
          navigation.goBack();
        }}
      />
      <WeatherCard weatherData={weatherData} showDetails={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cityName: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: { textAlign: 'center', fontSize: 18, marginBottom: 16 },
  temp: { fontSize: 48, textAlign: 'center', marginBottom: 8 },
  feelsLike: { textAlign: 'center', fontSize: 16, marginBottom: 16 },
  detail: { fontSize: 16, marginBottom: 8 },
});

export default DetailsScreen;
