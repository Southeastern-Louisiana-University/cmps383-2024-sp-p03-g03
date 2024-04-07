import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import UserReservationsComponent from "../components/UserReservationsComponent";

const UserReservationsScreen = () => {
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
