import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import HotelDto from '../features/hotels/HotelDto';
import { useNavigation } from '@react-navigation/native';

const HotelsComponent: React.FC = () => {
    const [hotels, setHotels] = useState<HotelDto[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get<HotelDto[]>('https://selu383-sp24-p03-g03.azurewebsites.net/api/hotels');
                setHotels(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching hotels:', error);
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    const handleHotelPress = (hotelId: number, hotelName: string) => {
        console.log('Hotel ID:', hotelId, 'Hotel Name:', hotelName);
        navigation.navigate('RoomList', { hotelId, hotelName });
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#10b981" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>Hotels</Text>
                {hotels.map((hotel, index) => (
                    <TouchableOpacity key={index} onPress={() => handleHotelPress(hotel.id, hotel.name)}>
                        <View style={styles.hotelContainer}>
                            <Image
                                style={styles.hotelImage}
                                source={require('../assets/placeholder1.jpg')}
                            />
                            <Text style={styles.hotelName}>{hotel.name}</Text>
                            <Text style={styles.hotelAddress}>{hotel.address}</Text>
                            <Text style={styles.hotelAddress}>{hotel.cityName}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    hotelContainer: {
        width: '95%',
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center', 
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: '#10b981',
        borderRadius: 10,
    },
    hotelImage: {
        width: '100%', 
        aspectRatio: 16/9,
        height: undefined, 
        marginBottom: 10,
        borderRadius: 10, 
    },
    hotelName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center', 
    },
    hotelAddress: {
        fontSize: 16,
        textAlign: 'center', 
    },
});

export default HotelsComponent;
