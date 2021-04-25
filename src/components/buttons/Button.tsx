import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const Button: React.FC<TouchableOpacityProps> = props => (
    <TouchableOpacity
        {...props}
        style={[
            styles.button,
            props.style,
            props.disabled && { opacity: 0.7 }
        ]}
        activeOpacity={0.7}
    >
        <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading
    }
});

export default Button
