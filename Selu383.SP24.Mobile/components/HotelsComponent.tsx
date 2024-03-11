import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import HotelDto from '../features/hotels/HotelDto';

const HotelsComponent: React.FC = () => {
    const [hotels, setHotels] = useState<HotelDto[]>([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get<HotelDto[]>('https://selu383-sp24-p03-g03.azurewebsites.net/api/hotels');
                console.log('Api Response:', response.data);
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Hotels</Text>
            {hotels.map((hotel, index) => (
                <View key={index} style={styles.hotelContainer}>
                    <Text style={styles.hotelName}>{hotel.name}</Text>
                    <Text style={styles.hotelAddress}>{hotel.address}</Text>
                </View>
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
