// index.js
import React from 'react';
import { View } from 'react-native';
import HomePage from './HomePage'; 
import LoginScreen from './Login';
import HotelsScreen from './Hotel';
import ListRes from './listRes';
import Room from './Room';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Reservation from './Reservation';
import RoomListScreen from './RoomListScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" 
        component={HomePage} 
        options={{
          drawerLabel: 'Home',
          title: 'EnStay Hotels',
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
          title: 'EnStay Hotels',
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
          drawerLabel: 'All Hotels (improved)',
          title: 'EnStay Hotels',
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
        <Drawer.Screen name="Reservation" 
        component={Reservation}
        options={{
          drawerLabel: 'Reservation Form',
          title: 'EnStay Hotels',
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
        <Drawer.Screen name="List Reservations"
        component={ListRes}
        options={{
          drawerLabel: 'List All Reservations',
          title: 'EnStay Hotels',
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
        <Drawer.Screen name="List Rooms"
        component={Room}
        options={{
          drawerLabel: 'List All Rooms',
          title: 'EnStay Hotels',
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
        <Drawer.Screen
  name="RoomList"
  component={RoomListScreen}
  options={{
    drawerLabel: 'List Rooms By Hotel',
    title: 'Room List',
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