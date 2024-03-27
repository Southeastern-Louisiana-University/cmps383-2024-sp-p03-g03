import React from "react";
import { View, Text, StyleSheet } from 'react-native'; // Update import statement
import RoomListComponent from "../components/RoomListComponent";

const RoomListScreen = () => {
    return (
        <View style={styles.container}>
            <RoomListComponent />
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

export default RoomListScreen;
