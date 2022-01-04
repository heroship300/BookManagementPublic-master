import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import defaultOptionsForStack from '../defaultOptionsForStack';

import CategoriesScreen from '../Screen/CategoriesScreen';
import BookOfCategoryScreen from '../Screen/BookOfCategoryScreen';
import BooksDetailScreen from '../Screen/BooksDetailScreen';
import {Title} from 'react-native-paper';

const Stack = createStackNavigator();

const CategoriesStack = () => {
  return (
    <Stack.Navigator initialRouteName="CategoriesScreen">
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{headerShown: false}}/>
      <Stack.Screen
        name="BooksOfCategory"
        component={BookOfCategoryScreen}
        options={({route}) => ({
          title: `Thể Loại: ${route.params.category}`,
        })}
      />
      <Stack.Screen
        name="BooksDetail"
        component={BooksDetailScreen}
        options={({route}) => ({
          title: `Title: ${route.params.title}`,
          headerLeft: null,
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};
//{({ route }) => ({ title: route.params.title })}
//{headerLeft: null}

BooksDetailScreen.navigationOptions = {
  headerLeft: () => {
    return null;
  },
};

export default CategoriesStack;
