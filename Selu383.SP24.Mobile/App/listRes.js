import React from "react";
import { View, Text, StyleSheet } from 'react-native'; // Update import statement
import ReservationsComponent from "../components/ReservationsComponent";

const ReservationListScreen = () => {
    return (
        <View style={styles.container}>
            <ReservationsComponent />
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

export default ReservationListScreen;
