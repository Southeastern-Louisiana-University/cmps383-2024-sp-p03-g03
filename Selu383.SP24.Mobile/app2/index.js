// index.js
import React from 'react';
import { View } from 'react-native';
import HomePage from './HomePage'; 
import LoginScreen from './Login';
import HotelsScreen from './Hotel';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" 
        component={HomePage} 
        options={{
          drawerLabel: 'Home',
          title: 'Enstay Hotels',
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
        />
        <Drawer.Screen name="Login" 
        component={LoginScreen}
        options={{
          drawerLabel: 'Login',
          title: 'Enstay Hotels',
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
        />
        <Drawer.Screen name="Hotels" 
        component={HotelsScreen}
        options={{
          drawerLabel: 'Hotels',
          title: 'Enstay Hotels',
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}