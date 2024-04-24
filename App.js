import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import CoffeesData from './screens/CoffeesData';
import Coffeepage from './screens/Coffeepage';
import FavoritesScreen from './screens/Favoritelist';
import ShoppingCartPage from './screens/shoppingcart';
import ProfilePage from './screens/ProfilePage';
import UpdateInfoPage from './screens/Updateinfo';
const Stack = createNativeStackNavigator();


export default function app  ()  {
 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="Welcom" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
       <Stack.Screen name="cartlist" component={ShoppingCartPage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Coffeepage" component={Coffeepage} />
        <Stack.Screen name="favoritelist" component={FavoritesScreen} />
        <Stack.Screen name="profile" component={ProfilePage} />
        <Stack.Screen name="updateinfo" component={UpdateInfoPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'brown',
    

    padding: 16,
  },
 
});