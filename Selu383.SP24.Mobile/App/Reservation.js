import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';

export default function ReservationPage({ navigation, route }) {
  const { checkInDate, checkOutDate, cityName, hotelName, roomType } = route.params;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [checkInDateState, setCheckInDate] = useState(checkInDate ? checkInDate.toDateString() : '');
  const [checkOutDateState, setCheckOutDate] = useState(checkOutDate ? checkOutDate.toDateString() : '');
  const [city, setCity] = useState(cityName ? cityName : '');
  const [hotel, setHotel] = useState(hotelName ? hotelName : '');
  const [roomTypeState, setRoomType] = useState(roomType ? roomType : '');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCheckInDate(checkInDate ? checkInDate.toDateString() : '');
      setCheckOutDate(checkOutDate ? checkOutDate.toDateString() : '');
      setCity(cityName ? cityName : '');
      setHotel(hotelName ? hotelName : '');
      setRoomType(roomType ? roomType : '');
    });

    return unsubscribe;
  }, [navigation]);

  const showDatePicker = (dateType) => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (selectedDateType === 'checkIn') {
      setCheckInDate(date.toISOString());
    } else {
      setCheckOutDate(date.toISOString());
    }
    hideDatePicker();
  };

  const handleSubmit = async () => {
    try {

      const existingReservations = await axios.get('https://selu383-sp24-p03-g03.azurewebsites.net/api/reservations');
      const existingReservationNumbers = existingReservations.data.map(reservation => reservation.reservationNumber);
  
      let newReservationNumber = 0;
      do {
        newReservationNumber = Math.floor(Math.random() * 9999) + 1;
      } while (existingReservationNumbers.includes(newReservationNumber));
  
      const response = await axios.post('https://selu383-sp24-p03-g03.azurewebsites.net/api/reservations', {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        hotelName: hotel,
        roomId: 1, 
        userId: 3, 
        reservationNumber: newReservationNumber
      });
  
      console.log('Reservation submitted:', response.data);
    Alert.alert('Reservation Submitted', 'Your reservation has been successfully submitted.', [
      { text: 'OK', onPress: () => {
        setCheckInDate('');
        setCheckOutDate('');
        setCity('');
        setHotel('');
        setRoomType('');
        navigation.navigate('Home');
      }}
    ]);
  } catch (error) {
      console.error('Error submitting reservation:', error);
      Alert.alert('Error', 'Failed to submit reservation. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content"/>
      <View style={styles.content}>
        <Image source={require('../assets/placeholder1.jpg')} style={styles.hotelImage} />
        <Text style={styles.welcomeText}>Does everything look correct?</Text>
        <Text style={styles.subtitle}>
          You want to book a <Text style={styles.boldText}>{roomType}</Text> at{' '}
        </Text>
        <Text style={styles.subtitle}>
        <Text style={styles.boldText}>{hotelName}</Text> 
        </Text>
        <Text style={styles.subtitle}>
          in{' '}
        <Text style={styles.boldText}>{cityName}</Text> for the following dates:
        </Text>
        <Text style={styles.subtitle}>Check-in: {' '}
        <Text style={styles.boldText}>{checkInDate.toDateString()}</Text>
        </Text>
        <Text style={styles.subtitle}>Check-out: {' '}
        <Text style={styles.boldText}>{checkOutDate.toDateString()}</Text>
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
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
  dateContainer: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
  hotelInput: {
    marginTop: 10, 
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize:24,
    textDecorationLine: 'underline',
    
  },
});
