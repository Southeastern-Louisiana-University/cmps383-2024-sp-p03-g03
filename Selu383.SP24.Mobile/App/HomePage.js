import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function HomePage({ navigation }) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState('');

  const showDatePicker = (dateType) => {
    setDatePickerVisibility(true);
    setSelectedDateType(dateType);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (selectedDateType === 'checkIn') {
      setCheckInDate(date.toDateString());
    } else {
      setCheckOutDate(date.toDateString());
    }
    hideDatePicker();
  };

  return (
    /*<View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content"/>
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Where?</Text>
      </View>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => showDatePicker('checkIn')}>
          <Image source={require('../assets/calendar_icon.png')} style={styles.calendarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showDatePicker('checkOut')}>
          <Image source={require('../assets/calendar_icon.png')} style={styles.calendarIcon} />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */
      <View style={styles.content}>
        <Image source={require('../assets/placeholder1.jpg')} style={styles.hotelImage} />
        <Text style={styles.welcomeText}>Welcome to EnStay!</Text>
        <Text style={styles.subtitle}>Book your stay with ease.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reservation')}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Need to check in?</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Check In</Text>
        </TouchableOpacity>
      </View>
    //</View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  calendarIcon: {
    width: 30,
    height: 30,
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
});
