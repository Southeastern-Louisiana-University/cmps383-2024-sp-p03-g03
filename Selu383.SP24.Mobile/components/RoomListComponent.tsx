import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import RoomDto from '../features/hotels/RoomDto';

interface RouteParams {
    hotelId: number;
    hotelName: string;
    checkInDate: Date, 
    checkOutDate: Date,
    cityName: string
}

const RoomListComponent: React.FC = () => {
    const [rooms, setRooms] = useState<RoomDto[]>([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation<any>();
    const { hotelId , hotelName, checkInDate, checkOutDate, cityName} = route.params as RouteParams;

    //console.log('City name -', cityName);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get<RoomDto[]>(`https://selu383-sp24-p03-g03.azurewebsites.net/api/rooms/byhotel/${hotelId}`);
                setRooms(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setLoading(false);
            }
        };

        fetchRooms();
    }, [hotelId]);

    const getUniqueRoomTypes = () => {
        const uniqueRoomTypes: string[] = [];
        rooms.forEach(room => {
            if (!uniqueRoomTypes.includes(room.beds)) {
                uniqueRoomTypes.push(room.beds);
            }
        });
        return uniqueRoomTypes;
    };

    const uniqueRoomTypes = getUniqueRoomTypes();

    const handleRoomPress = (room: RoomDto) => {
        console.log("Room details: room list", room);
        navigation.navigate('Reservation', {
            hotelName: hotelName,
            cityName: cityName,
            roomType: room.beds,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
        });
        
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#10b981" />
            </View>
        );
    }

    const imageSource = require('../assets/placeholder6.jpg');

    return (
        <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.heading}>Rooms for {hotelName}</Text>
            <Text style={styles.dateText}>{checkInDate ? checkInDate.toDateString() : 'Check In'} - {checkOutDate ? checkOutDate.toDateString() : 'Check Out'}</Text>
            {uniqueRoomTypes.map(roomType => {
                const room = rooms.find(room => room.beds === roomType);
                if (room) {
                    return (
                        <TouchableOpacity key={room.id} onPress={() => handleRoomPress(room)}>
                            <View style={styles.roomContainer}>
                                <Image
                                    source={imageSource}
                                    style={styles.roomImage}
                                />
                                <Text style={styles.roomName}>{room.hotelName}</Text>
                                <Text style={styles.roomInfo}>Room Type - {room.beds}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                } else {
                    return null;
                }
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
    },
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
    roomContainer: {
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
    roomImage: {
        width: '100%',
        aspectRatio: 16 / 9,
        height: undefined,
        marginBottom: 10,
        borderRadius: 10,
    },
    roomName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    roomInfo: {
        fontSize: 16,
        textAlign: 'center',
    },
    dateText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default RoomListComponent;
