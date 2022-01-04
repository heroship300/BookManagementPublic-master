import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import defaultOptionsForStack from '../defaultOptionsForStack';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" >
      <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
