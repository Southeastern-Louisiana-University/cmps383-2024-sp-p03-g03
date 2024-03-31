import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import ReservationDto from "../features/hotels/ReservationDto";

const ReservationsComponent: React.FC = () => {
    const [reservations, setReservations] = useState<ReservationDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchReservations = async () => {
        try {
            const response = await axios.get<ReservationDto[]>('https://selu383-sp24-p03-g03.azurewebsites.net/api/reservations');
            setReservations(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };
    
    useEffect(() => {
        fetchReservations();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleDeleteReservation = async (id: number) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this reservation?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await axios.delete(`https://selu383-sp24-p03-g03.azurewebsites.net/api/reservations/${id}`);
                            setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== id));
                            Alert.alert('Success', 'Reservation deleted successfully.');
                        } catch (error) {
                            console.error('Error deleting reservation:', error);
                            Alert.alert('Error', 'Failed to delete reservation. Please try again later.');
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.heading}>Reservations</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#10b981" />
                ) : (
                    reservations.map((reservation) => (
                        <View key={reservation.id} style={styles.reservationContainer}>
                            <TouchableOpacity onPress={() => handleDeleteReservation(reservation.id)} style={styles.deleteButton}>
                                <Text style={styles.deleteText}>X</Text>
                            </TouchableOpacity>
                            <View style={styles.reservationInfo}>
                                <Text style={styles.reservationName}>Hotel - {reservation.hotelName}</Text>
                                <Text style={styles.reservationDetail}>Reservation Number: {reservation.reservationNumber}</Text>
                                <Text style={styles.reservationDetail}>Room ID: {reservation.roomId}</Text>
                                <Text style={styles.reservationDetail}>UserID: {reservation.userId}</Text>
                                <Text style={styles.reservationDetail}>Check-In: {formatDate(reservation.checkIn)}</Text>
                                <Text style={styles.reservationDetail}>Check-Out: {formatDate(reservation.checkOut)}</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    reservationContainer: {
        width: '100%',
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center', 
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: '#10b981',
        borderRadius: 10,
    },
    reservationInfo: {
        flex: 1,
        marginLeft: 10,
    },
    reservationName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    reservationDetail: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 5,
        marginLeft: 175,
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ReservationsComponent;
