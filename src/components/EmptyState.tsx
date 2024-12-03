import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="cloud-offline"
        size={100}
        color="#ccc"
        style={styles.icon}
      />
      <Text style={styles.title}>No Weather Data Available</Text>
      <Text style={styles.description}>
        It seems like we couldn't fetch the weather data. Please try again.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
  },
});

export default EmptyState;
