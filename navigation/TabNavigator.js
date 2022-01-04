// ./navigation/TabNavigator.js

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import CategoriesStack from './Stack/CategoriesStack';
import FavStack from './Stack/FavStack';
import BooksStack from './Stack/BooksStack';
import ProfileScreen from './Auth/ProfileScreen';

const Tab = createBottomTabNavigator();

// Function Tạo Bottom Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      // Function for Options
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = '';
          if (route.name === 'BooksDetail') {
            iconName = 'book-open';
          }
          if (route.name === 'FavouritesTab') {
            iconName = 'star';
          }
          if (route.name === 'Categories') {
            iconName = 'book';
          }
          if (route.name === 'AllBooksTab') {
            iconName = 'book-open';
          }
          if (route.name === 'Profile') {
            iconName = 'diagnoses';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
          paddingTop: 2,
          paddingBottom: 3,
        },
        tabBarItemStyle: {
          height: 50,
          zIndex: 99,
          borderColor: 'white',
          borderTopWidth: 0,
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}>
      <Tab.Screen
        name="AllBooksTab"
        component={BooksStack}
        options={{
          tabBarLabel: 'All Books',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          tabBarLabel: 'Categories',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="FavouritesTab"
        component={FavStack}
        options={{
          tabBarLabel: 'Favourites',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
