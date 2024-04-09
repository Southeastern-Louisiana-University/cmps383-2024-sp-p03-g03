import React, { useEffect} from "react";
import { View, Text, StyleSheet } from 'react-native';
import UserReservationsComponent from "../components/UserReservationsComponent";
import { useIsFocused } from '@react-navigation/native';

const UserReservationsScreen = () => {

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            console.log('loading UserReservations page');
        }
    }, [isFocused]);


    return (
        <View style={styles.container}>
            <UserReservationsComponent />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UserReservationsScreen;
