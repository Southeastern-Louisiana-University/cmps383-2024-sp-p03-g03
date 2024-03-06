import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, DrawerLayoutAndroid, StatusBar } from 'react-native';

export default function HomePage() {
  const drawerRef = useRef(null);

  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={() => (
        <View style={styles.drawerContainer}>
          
          <TouchableOpacity style={styles.drawerItem}>
            <Text style={styles.drawerItemText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Text style={styles.drawerItemText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Text style={styles.drawerItemText}>Check Reservation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Text style={styles.drawerItemText}>Help</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.headerText}>Enstay Hotel</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Where?"
            placeholderTextColor="#000"
          />
        </View>
        <TouchableOpacity onPress={openDrawer} style={styles.drawerButton}>
          <Image source={require('../assets/hamburger_icon.png')} style={styles.drawerIcon} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Image source={require('../assets/placeholder.jpg')} style={styles.hotelImage} />
          <Text style={styles.welcomeText}>Welcome to Enstay!</Text>
          <Text style={styles.subtitle}>Book your stay with ease.</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>Need to check in?</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Check In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  header: {
    backgroundColor: '#10b981',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },
  drawerIcon: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 20, //rounded edges
    width: '65%', // % of screen to take up
    alignSelf: 'center', // Center search 
    marginTop: 20, 
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hotelImage: {
    width: '80%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  drawerItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerItemText: {
    fontSize: 16,
  },
});