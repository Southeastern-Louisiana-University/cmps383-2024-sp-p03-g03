import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';

export default function ReservationPage({ navigation }) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [city, setCity] = useState('');
  const [hotel, setHotel] = useState('');
  const [roomType, setRoomType] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCheckInDate('');
      setCheckOutDate('');
      setCity('');
      setHotel('');
      setRoomType('');
    });

    return unsubscribe;
  }, [navigation]);

  const showDatePicker = (dateType) => {
    setSelectedDateType(dateType);
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
        { text: 'OK', onPress: () => navigation.navigate('ReservationPage') }
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
        <Text style={styles.welcomeText}>Ready to book?</Text>
        <Text style={styles.subtitle}>Please fill out the information below.</Text>
        <TouchableOpacity style={styles.dateContainer} onPress={() => showDatePicker('checkIn')}>
          <TextInput
            style={styles.input}
            placeholder="Check-in Date"
            value={checkInDate}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateContainer} onPress={() => showDatePicker('checkOut')}>
          <TextInput
            style={styles.input}
            placeholder="Check-out Date"
            value={checkOutDate}
            editable={false}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TextInput
          style={[styles.input, styles.hotelInput]}
          placeholder="Room Type"
          value={roomType}
          onChangeText={setRoomType}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={[styles.input, styles.hotelInput]}
          placeholder="Hotel"
          value={hotel}
          onChangeText={setHotel}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
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
});
