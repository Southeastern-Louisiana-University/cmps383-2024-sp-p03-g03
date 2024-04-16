import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import HotelsSearchComponent from "../components/HotelsSearchComponent";

const HotelsSearchScreen = () => {
    return (
        <View style={styles.container}>
            <HotelsSearchComponent />
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

export default HotelsSearchScreen;
