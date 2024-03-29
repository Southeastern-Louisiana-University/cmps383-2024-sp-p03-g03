import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ReservationPage({ navigation }) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [city, setCity] = useState('');
  const [hotel, setHotel] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState('');
  const [roomType, setRoomType] = useState('');

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
        <TouchableOpacity style={styles.button}>
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
