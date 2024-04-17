import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import ReservationDto from "../features/hotels/ReservationDto";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Image } from 'react-native';

const UserReservationsComponent: React.FC = () => {
    const [reservations, setReservations] = useState<ReservationDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<number | null>(null);
    const [authError, setAuthError] = useState(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation<any>();

    const fetchUserId = async () => {
        try {
            const response = await axios.get('https://selu383-sp24-p03-g03.azurewebsites.net/api/authentication/me');
    
            if (response.status !== 200) {
                setAuthError(true);
                setLoading(false);
            } else {
                setAuthError(false);
                setUserId(response.data.id);
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
            if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                setAuthError(true);
            }
            setLoading(false);
        }
    };

    const fetchUserReservations = async () => {
        try {
            if (!userId) return; 
    
            const response = await axios.get<ReservationDto[]>(`https://selu383-sp24-p03-g03.azurewebsites.net/api/reservations/user/${userId}`);
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchUserId();
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };
    
        fetchData();
    }, [isFocused]);

    useEffect(() => {
        if (userId) {
            fetchUserReservations();
        }
    }, [userId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const navigateToLogin = () => {
        navigation.navigate('Login');
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
                {authError ? (
                    <View style={styles.reservationContainer}>
                        <Text style={styles.notLoggedInMessage}>You are not logged in.</Text>
                        <Text style={styles.notLoggedInMessage}>Please sign in to continue.</Text>
                        <TouchableOpacity onPress={navigateToLogin} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <Text style={styles.heading}>Your Reservations</Text>
                        {loading ? (
                            <ActivityIndicator size="large" color="#10b981" />
                        ) : (
                            reservations.map((reservation) => (
                                <View key={reservation.id} style={styles.reservationContainer}>
                                    <TouchableOpacity onPress={() => handleDeleteReservation(reservation.id)} style={styles.deleteButton}>
                                        <Text style={styles.deleteText}>X</Text>
                                    </TouchableOpacity>
                                    <Image source={require('../assets/placeholder6.jpg')} style={styles.roomImage} />
                                    <View style={styles.reservationInfo}>
                                        <Text style={styles.reservationName}>Hotel - {reservation.hotelName}</Text>
                                        <Text style={styles.reservationDetail}>Reservation Number: {reservation.reservationNumber}</Text>
                                        <Text style={styles.reservationDetail}>Check-In: {formatDate(reservation.checkIn)}</Text>
                                        <Text style={styles.reservationDetail}>Check-Out: {formatDate(reservation.checkOut)}</Text>
                                    </View>
                                </View>
                            ))
                        )}
                    </>
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
        borderWidth: 3,
        borderColor: '#10b981',
        borderRadius: 10,
        padding: 5,
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
        position: 'absolute',
        top: 5,
        right: 0,
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#10b981',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      notLoggedInMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 20, 
    },
    roomImage: {
        width: '85%',
        aspectRatio: 16 / 9,
        height: undefined,
        marginBottom: 10,
        borderRadius: 10,
    },
});

export default UserReservationsComponent;
