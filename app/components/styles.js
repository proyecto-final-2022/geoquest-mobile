
import React from 'react'
import { StyleSheet } from "react-native";

// colors
export const Colors = {
    lightBrown: '#FFF9CA',
    brown: '#CA955C'
}

const {lightBrown, brown} = Colors

export const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    }
});
