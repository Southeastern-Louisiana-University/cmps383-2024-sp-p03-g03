import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import HotelDto from '../features/hotels/HotelDto';
import { useNavigation, useRoute } from '@react-navigation/native';

interface RouteParams {
    searchTerm: string, 
    checkInDate: Date, 
    checkOutDate: Date,
    cityName: string
}

const HotelsComponent: React.FC = () => {
    const [hotels, setHotels] = useState<HotelDto[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();
    const route = useRoute();

    useEffect(() => {
        const { searchTerm } = route.params as RouteParams || { searchTerm: '' };

        const fetchHotels = async () => {
            try {
                const response = await axios.post<HotelDto[]>('https://selu383-sp24-p03-g03.azurewebsites.net/api/hotels/find', { searchTerm });
                setHotels(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching hotels:', error);
                setLoading(false);
            }
        };

        fetchHotels();
    }, [route.params]);

    const handleHotelPress = (hotelId: number, hotelName: string, cityName: string) => {
        console.log('Hotel ID:', hotelId, 'Hotel Name:', hotelName, 'City:', cityName);
        navigation.navigate('RoomList', { hotelId, hotelName, checkInDate, checkOutDate, cityName });
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#10b981" />
            </View>
        );
    }

    const { checkInDate, checkOutDate } = route.params as RouteParams;
    //console.log('Check in:', checkInDate, 'Check out:' ,checkOutDate);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <Text style={styles.subtitle}>Hotels nearby</Text>
                    <Text style={styles.dateText}>{checkInDate ? checkInDate.toDateString() : 'Check In'} - {checkOutDate ? checkOutDate.toDateString() : 'Check Out'}</Text>
                </View>
                {hotels.map((hotel, index) => (
                    <TouchableOpacity key={index} onPress={() => handleHotelPress(hotel.id, hotel.name, hotel.cityName)}>
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
    headerContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    dateText: {
        fontSize: 16,
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
        padding: 20,
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
