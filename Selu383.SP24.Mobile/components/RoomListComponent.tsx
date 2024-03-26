import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RoomDto from '../features/hotels/RoomDto';

const RoomListComponent: React.FC = () => {
    const [currentHotelId, setCurrentHotelId] = useState<number>(5);
    const [rooms, setRooms] = useState<RoomDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get<RoomDto[]>(`https://selu383-sp24-p03-g03.azurewebsites.net/api/rooms/byhotel/${currentHotelId}`);
                setRooms(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setLoading(false);
            }
        };

        fetchRooms();
    }, [currentHotelId]);

    const handleRoomPress = (room: RoomDto) => {
        console.log('Room pressed:', room);
    };
    
    const changeHotel = () => {
        setCurrentHotelId(prevHotelId => prevHotelId === 8 ? 5 : prevHotelId + 1);
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#10b981" />
            </View>
        );
    }

    const imageSource = require('../assets/placeholder5.jpg');

    return (
        <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        >
            <TouchableOpacity style={styles.button} onPress={changeHotel}>
                <Text style={styles.buttonText}>Change Hotel</Text>
            </TouchableOpacity>
            <Text style={styles.heading}>Rooms for Hotel {currentHotelId}</Text>
            {rooms.map((room, index) => (
                <TouchableOpacity key={index} onPress={() => handleRoomPress(room)}>
                    <View style={styles.roomContainer}>
                        <Image
                            source={imageSource}
                            style={styles.roomImage}
                        />
                        <Text style={styles.roomName}>{room.hotelName}</Text>
                        <Text style={styles.roomInfo}>Room Type - {room.beds}</Text>
                        <Text style={styles.roomInfo}>Room Number - {room.id}</Text>
                    </View>
                </TouchableOpacity>
            ))}
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
    button: {
        backgroundColor: '#10b981',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RoomListComponent;
