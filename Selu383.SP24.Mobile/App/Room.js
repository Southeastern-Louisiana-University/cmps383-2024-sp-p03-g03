import React from "react";
import { View, Text, StyleSheet } from 'react-native'; // Update import statement
import RoomsComponent from "../components/RoomsComponent";

const RoomsScreen = () => {
    return (
        <View style={styles.container}>
            <RoomsComponent />
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

export default RoomsScreen;
