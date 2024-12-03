import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useStore } from '../store/store';

const LoadingOverlay = () => {
  const { loading } = useStore();

  return (
    <Modal visible={loading} transparent={true} animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
  },
});

export default LoadingOverlay;
