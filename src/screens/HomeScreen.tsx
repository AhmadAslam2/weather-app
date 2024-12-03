import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import WeatherCard from '../components/WeatherCard';
import { fetchWeatherByCity, fetchWeatherByLocation } from '../api/api';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useStore } from '../store/store';
import { cities } from '../constants';
import EmptyState from '../components/EmptyState';

const HomeScreen = () => {
  const [city, setCity] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { unit, setLoading, loading } = useStore();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [inputPosition, setInputPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    handleCurrentLocationWeather();
  }, []);

  useEffect(() => {
    if (city) {
      handleSearchCity(city);
    } else if (!city && weatherData) {
      handleCurrentLocationWeather();
    }
  }, [unit]);
  const handleInputLayout = (event: any) => {
    const { y, height, width } = event.nativeEvent.layout;
    setInputPosition({
      top: y + height,
      left: event.nativeEvent.layout.x,
      width,
    });
  };
  const handleSearchCity = async (cityName: string) => {
    if (cityName) {
      setCity(cityName);
      setLoading(true);
      try {
        const weather = await fetchWeatherByCity(cityName, unit);
        setWeatherData(weather);
        setSuggestions([]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setWeatherData(null);
      }
    }
  };

  const handleCurrentLocationWeather = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        Alert.alert(
          'Permission Denied',
          'Location permission is required to fetch weather data.'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;

      try {
        const weather = await fetchWeatherByLocation(latitude, longitude, unit);
        setWeatherData(weather);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setWeatherData(null);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setWeatherData(null);
    }
  };

  const handleCityInput = (input: string) => {
    setCity(input);
    if (input.length >= 1) {
      const filteredSuggestions = cities.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => handleSearchCity(item)}
      style={styles.suggestionItem}
    >
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.searchBar} onLayout={handleInputLayout}>
          <TextInput
            style={styles.input}
            placeholder="Search for a city..."
            value={city}
            onChangeText={handleCityInput}
          />
          <Ionicons
            onPress={() => handleSearchCity(city)}
            disabled={!city}
            name="search"
            size={23}
            color={city ? 'tomato' : '#b0adad'}
            style={styles.searchIcon}
          />
        </View>

        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            renderItem={renderItem}
            keyExtractor={(index) => index.toString()}
            style={[
              styles.suggestionList,
              {
                top: inputPosition.top,
                left: inputPosition.left,
                width: inputPosition.width,
              },
            ]}
          />
        )}
        <View style={{ flex: 1 }}>
          {weatherData ? (
            <WeatherCard weatherData={weatherData} />
          ) : loading ? (
            <></>
          ) : (
            <EmptyState />
          )}
        </View>
        <TouchableOpacity
          onPress={handleCurrentLocationWeather}
          activeOpacity={1}
          style={styles.button}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>
            Use Current Location
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  suggestionList: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 200, // Limit height to avoid overflow
    zIndex: 1,
    elevation: 5,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    height: 44,
    width: '100%',
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
