import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/store';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: [{ description: string; icon: string }];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
}

interface WeatherCardProps {
  weatherData: WeatherData;
  showDetails?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  showDetails = false,
}) => {
  const { name, sys, main, weather, wind, visibility } = weatherData;
  const { navigate } = useNavigation<any>();
  const { unit } = useStore();

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';
  const temperature = main.temp.toFixed(1);
  const feelsLike = main.feels_like.toFixed(1);
  const weatherDescription =
    weather[0]?.description || 'No description available';
  const weatherIcon = weather[0]?.icon
    ? `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    : 'https://via.placeholder.com/100';

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigate('Details', { weatherData })}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Image
            source={{ uri: weatherIcon }}
            style={styles.weatherIcon}
            resizeMode="contain"
          />
          <Title style={styles.cityName}>
            {name}, {sys.country}
          </Title>
          <Paragraph style={styles.weatherDescription}>
            {weatherDescription}
          </Paragraph>
          <Text style={styles.temp}>
            {temperature}
            {temperatureUnit}
          </Text>
          <Text style={styles.feelsLike}>
            Feels like: {feelsLike}
            {temperatureUnit}
          </Text>
          <Text style={styles.humidity}>Humidity: {main.humidity}%</Text>

          {showDetails && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>
                Pressure: {main.pressure} hPa
              </Text>
              <Text style={styles.detailText}>
                Wind Speed: {wind.speed} m/s
              </Text>
              <Text style={styles.detailText}>Wind Direction: {wind.deg}°</Text>
              <Text style={styles.detailText}>
                Visibility: {visibility / 1000} km
              </Text>
              <Text style={styles.detailText}>
                Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}
              </Text>
              <Text style={styles.detailText}>
                Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}
              </Text>
            </View>
          )}
        </Card.Content>

        {!showDetails && (
          <View style={styles.detailsButtonContainer}>
            <Text style={styles.detailsText}>Details</Text>
            <Entypo name="chevron-right" size={18} color={'#666'} />
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 4,
    padding: 16,
    position: 'relative',
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginVertical: 8,
  },
  weatherDescription: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'tomato',
    marginBottom: 8,
  },
  feelsLike: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 8,
  },
  humidity: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  weatherIcon: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 16,
  },
  detailsButtonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  detailsText: {
    fontSize: 14,
    color: '#333',
  },
  detailsContainer: {
    marginTop: 16,
    paddingBottom: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  detailText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
    alignSelf: 'center',
  },
});

export default WeatherCard;
