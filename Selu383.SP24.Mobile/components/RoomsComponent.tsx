import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RoomDto from "../features/hotels/RoomDto";

const RoomsComponent: React.FC = () => {
    const [rooms, setRooms] = useState<RoomDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get<RoomDto[]>('https://selu383-sp24-p03-g03.azurewebsites.net/api/rooms');
                setRooms(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const handleRoomPress = (room: RoomDto) => {
        console.log('Room pressed:', room);
    };

    return (
        <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        >
            <Text style={styles.heading}>All Rooms</Text>
            {loading ? (
                <View style={[styles.loadingContainer, styles.container]}>
                    <ActivityIndicator size="large" color="#10b981" />
                </View>
            ) : (
                <ScrollView style={styles.scrollView}>
                    {rooms.map((room, index) => (
                        <TouchableOpacity key={index} onPress={() => handleRoomPress(room)}>
                            <View style={styles.roomContainer}>
                                <Image
                                    source={require('../assets/placeholder5.jpg')}
                                    style={styles.roomImage}
                                />
                                <Text style={styles.roomName}>Hotel - {room.hotelName}</Text>
                                <Text style={styles.roomInfo}>Room status: {room.isAvailable ? 'Available' : 'Not Available'}</Text>
                                <Text style={styles.roomInfo}>Room type: {room.beds}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    loadingContainer: {
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
    scrollView: {
        flex: 1,
    },
});

export default RoomsComponent;
