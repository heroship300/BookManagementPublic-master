import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import defaultOptionsForStack from '../defaultOptionsForStack';

import CategoriesScreen from '../Screen/CategoriesScreen';
import BooksDetailScreen from '../Screen/BooksDetailScreen';
import FavScreen from '../Screen/FavScreen';

const Stack = createStackNavigator();

const FavStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultOptionsForStack}>
      <Stack.Screen
        name="Favourites"
        component={FavScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BooksDetail"
        component={BooksDetailScreen}
        options={({route}) => ({
          title: `Title: ${route.params.title}`,
          headerLeft: null,
          // headerShown: false,
        })}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default FavStack;
