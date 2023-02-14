import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useThemeColors from '../constans/ThemeColors';
import FavoritesScreen from './FavoritesScreen/FavoritesScreen';
import SearchScreen from './SearchScreen/SearchScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScienceScreen from './ScienceScreen/ScienceScreen';
import SportsScreen from './SportsScreen/SportsScreen';
import TechnologyScreen from './TechnologyScreen/TechnologyScreen';
import GeneralNewsScreen from './GeneralNewsScreen/GeneralNewsScreen';
import NewsDetailScreen from './NewsDetailScreen/NewsDetailScreen';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import BusinessNewsScreen from './BusinessNewsScreen/BusinessNewsScreen';
import EntertainmentNewsScreen from './EntertainmentNewsScreen/EntertainmentNewsScreen';
import HealthNewsScreen from './HealthNewsScreen/HealthNewsScreen';
import LoginScreen from './LoginScreen/LoginScreen';
import RegisterScreen from './RegisterScreen/RegisterScreen';
import I18n from '../language/_i18n';

export default function Wrapper() {
  const themeColors = useThemeColors();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  const MyDrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name={I18n.t('trns_14')} component={GeneralNewsScreen} />
        <Drawer.Screen name={I18n.t('trns_6')} component={BusinessNewsScreen} />
        <Drawer.Screen
          name={I18n.t('trns_7')}
          component={EntertainmentNewsScreen}
        />
        <Drawer.Screen name={I18n.t('trns_8')} component={HealthNewsScreen} />
        <Drawer.Screen name={I18n.t('trns_9')} component={ScienceScreen} />
        <Drawer.Screen name={I18n.t('trns_10')} component={SportsScreen} />
        <Drawer.Screen name={I18n.t('trns_11')} component={TechnologyScreen} />
      </Drawer.Navigator>
    );
  };

  const MyTabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Drawer"
          component={MyDrawerNavigator}
          options={{
            tabBarLabel: I18n.t('trns_15'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={18} color="white" />
            ),
            tabBarLabelStyle: { fontSize: 15, color: themeColors.title },
            tabBarStyle: { backgroundColor: themeColors.primary },
            tabBarActiveBackgroundColor: themeColors.secondary,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: I18n.t('trns_16'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" size={18} color="white" />
            ),
            tabBarLabelStyle: { fontSize: 15, color: themeColors.title },
            tabBarStyle: { backgroundColor: themeColors.primary },
            tabBarActiveBackgroundColor: themeColors.secondary,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: I18n.t('trns_17'),
            tabBarLabel: I18n.t('trns_17'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart" size={18} color="white" />
            ),
            tabBarLabelStyle: { fontSize: 15, color: themeColors.title },
            tabBarStyle: { backgroundColor: themeColors.primary },
            tabBarActiveBackgroundColor: themeColors.secondary,
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyTab"
          component={MyTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: I18n.t('trns_13'),
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: themeColors.primary,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
