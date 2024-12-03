import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AppHeaderProps {
  title: string;
  showBackIcon?: boolean;
  onBackIconPres?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackIcon,
  onBackIconPres,
}) => {
  return (
    <View style={styles.headerContainer}>
      {showBackIcon && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onBackIconPres}
          style={styles.iconContainer}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, showBackIcon && styles.marginLeft]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  iconContainer: {
    padding: 8,
    zIndex: 100,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  marginLeft: {
    marginLeft: -40,
  },
});

export default AppHeader;
