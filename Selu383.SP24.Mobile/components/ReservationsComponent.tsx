import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import ReservationDto from "../features/hotels/ReservationDto";

const ReservationsComponent: React.FC = () => {
    const [reservations, setReservations] = useState<ReservationDto[]>([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get<ReservationDto[]>('https://selu383-sp24-p03-g03.azurewebsites.net/api/reservations');

                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Reservations</Text>
            {reservations.map((reservation, index) => (
                <View key={index} style={styles.reservatiomContainer}>
                    <Text style={styles.reservationName}>Hotel -{reservation.hotelName}</Text>
                    <Text style={styles.reservationAddress}>Reservation Number: {reservation.reservationNumber}</Text>
                    <Text style={styles.reservationAddress}>Room ID: {reservation.roomId}</Text>
                    <Text style={styles.reservationAddress}>UserID: {reservation.userId}</Text>
                    <Text style={styles.reservationAddress}>Check-In:{formatDate(reservation.checkIn)}</Text>
                    <Text style={styles.reservationAddress}>Check-Out:{formatDate(reservation.checkOut)}</Text>
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
    reservatiomContainer: {
        marginBottom: 20,
    },
    reservationName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    reservationAddress: {
        fontSize: 16,
    },
});

export default ReservationsComponent;
