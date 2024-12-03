import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useStore } from '../store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';

const SettingsScreen = () => {
  const { unit, toggleUnit } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Settings" />
      <View style={styles.settingItem}>
        <Text style={styles.title}>Select Unit</Text>
        <View style={styles.pillContainer}>
          <TouchableOpacity
            style={[styles.pill, unit === 'metric' && styles.activePill]}
            onPress={() => unit !== 'metric' && toggleUnit()}
          >
            <Text style={styles.pillText}>°C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pill, unit === 'imperial' && styles.activePill]}
            onPress={() => unit !== 'imperial' && toggleUnit()}
          >
            <Text style={styles.pillText}>°F</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  pillContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'tomato',
    backgroundColor: 'white',
  },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activePill: {
    backgroundColor: 'tomato',
  },
  pillText: {
    color: 'black',
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SettingsScreen;
