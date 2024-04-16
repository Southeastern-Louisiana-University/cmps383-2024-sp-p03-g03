import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, TextInput, ScrollView } from 'react-native'; // Import ScrollView
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function HomePage({ navigation }) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showDatePicker = (dateType) => {
    setDatePickerVisibility(true);
    setDatePickerVisibility(dateType);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (isDatePickerVisible === 'checkIn') {
      setCheckInDate(date.toDateString());
    } else {
      if (date <= new Date(checkInDate)) {
        setErrorMessage('Check-out date must be after the check-in date.');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      } else {
        setCheckOutDate(date.toDateString());
      }
    }
    hideDatePicker();
  };

  const handleSearch = () => {
    /*if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select both check-in and check-out dates.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000); 
      return;
    } */
    navigation.navigate('HotelsSearch', { searchTerm });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content"/>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Where are you headed?"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => showDatePicker('checkIn')}>
          <Text style={styles.dateText}>{checkInDate || 'Check In'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showDatePicker('checkOut')}>
          <Text style={styles.dateText}>{checkOutDate || 'Check Out'}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible === 'checkIn' || isDatePickerVisible === 'checkOut'}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        textColor='#10b981'
        minimumDate={new Date()}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <ScrollView>
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
      </ScrollView>
    </View>
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
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#10b981',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  content: {
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
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
