import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
    active?: boolean;
}

const EnvironmentButton: React.FC<EnvironmentButtonProps> = props => {
    return (
        <RectButton
            style={[
                styles.container,
                props.active && styles.containerActive
            ]}
            {...props}
        >
            <Text style={[
                styles.text,
                props.active && styles.textActive
            ]}>
                {props.children}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 5,
    },
    containerActive: {
        backgroundColor: colors.green_light
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text
    },
    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
    }
});

export default EnvironmentButton;