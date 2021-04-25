import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';
import { Feather } from '@expo/vector-icons';

interface NextButtonProps {
    onPress?: () => void;
}

const NextButton: React.FC<NextButtonProps> = props => (
    <Button {...props} style={styles.button}>
        <Feather
            name="chevron-right"
            style={styles.buttonIcon}
        />
    </Button>
)

const styles = StyleSheet.create({
    button: {
        height: 56,
        width: 56
    },
    buttonIcon: {
        fontSize: 32
    }
});

export default NextButton;