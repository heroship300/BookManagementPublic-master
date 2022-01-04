import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import defaultOptionsForStack from '../defaultOptionsForStack';

import BooksDetailScreen from '../Screen/BooksDetailScreen';
import AllBooksScreen from '../Screen/AllBooksScreen';
import AddBookScreen from '../../screen/Books/AddBookScreen';

const Stack = createStackNavigator();

const BooksStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultOptionsForStack}>
      <Stack.Screen
        name="AllBooks"
        component={AllBooksScreen}
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
    </Stack.Navigator>
  );
};

export default BooksStack;

//<Stack.Screen name="BooksOfCategory" component={BooksOfCategory} />
