import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import HotelDto from '../features/hotels/HotelDto';
import { useNavigation } from '@react-navigation/native';

const HotelsComponent: React.FC = () => {
    const [hotels, setHotels] = useState<HotelDto[]>([]);
    const navigation = useNavigation(); // Initialize navigation

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get<HotelDto[]>('https://selu383-sp24-p03-g03.azurewebsites.net/api/hotels');
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, []);

    const handleHotelPress = (hotelId: number) => {
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Hotels</Text>
            {hotels.map((hotel, index) => (
                <TouchableOpacity key={index} onPress={() => handleHotelPress(hotel.id)}>
                    <View style={styles.hotelContainer}>
                        <Text style={styles.hotelName}>{hotel.name}</Text>
                        <Text style={styles.hotelAddress}>{hotel.address}</Text>
                        <Text style={styles.hotelAddress}>{hotel.cityName}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    hotelContainer: {
        marginBottom: 20,
    },
    hotelName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    hotelAddress: {
        fontSize: 16,
    },
});

export default HotelsComponent;
