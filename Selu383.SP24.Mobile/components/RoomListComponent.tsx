// RoomListScreen.tsx

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import RoomDto from '../features/hotels/RoomDto';

interface RoomListProps {
    hotelId: number;
}

const RoomListComponent: React.FC<RoomListProps> = ({ hotelId }) => {
    const [rooms, setRooms] = useState<RoomDto[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get<RoomDto[]>(`https://selu383-sp24-p03-g03.azurewebsites.net/api/rooms/byhotel/${hotelId}`);
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, [hotelId]);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Rooms for Hotel {hotelId}</Text>
            {rooms.map((room, index) => (
                <View key={index} style={styles.roomContainer}>
                    <Text style={styles.roomName}>{room.hotelName}</Text>
                    <Text style={styles.roomName}>{room.beds}</Text>
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
    roomContainer: {
        marginBottom: 20,
    },
    roomName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RoomListComponent;