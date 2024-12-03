import 'react-native-gesture-handler';
import React from 'react';
import {
  DefaultTheme,
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import LoadingOverlay from './src/components/LoadingOverlay';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'white',
        },
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any = 'Home';

            if (route.name === 'HomeStack') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: shouldHideTabBar(route) ? { display: 'none' } : {},
        })}
      >
        <Tab.Screen
          options={{ title: 'Home' }}
          name="HomeStack"
          component={HomeStack}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <LoadingOverlay />
    </NavigationContainer>
  );
};

const shouldHideTabBar = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return routeName === 'Details';
};

export default App;
