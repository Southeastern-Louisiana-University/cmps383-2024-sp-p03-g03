import React from "react";
import { View, Text, StyleSheet } from 'react-native'; // Update import statement
import HotelsComponent from "../components/HotelsComponent";

const HotelsScreen = () => {
    return (
        <View style={styles.container}>
            <HotelsComponent />
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

export default HotelsScreen;
