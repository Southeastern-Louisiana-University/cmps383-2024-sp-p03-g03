import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
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
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchRooms();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Rooms</Text>
            {loading ? ( // Render loading indicator if loading is true
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView style={styles.scrollView}>
                    {rooms.map((room, index) => (
                        <View key={index} style={styles.reservationContainer}>
                            <Text style={styles.reservationName}>Hotel -{room.hotelName}</Text>
                            <Text style={styles.reservationAddress}>Room status: {room.isAvailable ? 'Available' : 'Not Available'}</Text>
                            <Text style={styles.reservationAddress}>Room type: {room.beds}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
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
    reservationContainer: {
        marginBottom: 20,
    },
    reservationName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    reservationAddress: {
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
});

export default RoomsComponent;
