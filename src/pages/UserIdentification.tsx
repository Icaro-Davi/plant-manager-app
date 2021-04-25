import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Button } from '../components/buttons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { setUsername } from '../utils/Storage';
import { ConfirmationParams } from './Confirmation';

const UserIdentification = () => {
    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const handleInputBlur = () => {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    const handleInputFocus = () => {
        setIsFocused(true);
    }

    const handleInputChange = (value: string) => {
        setIsFilled(!!value);
        setName(value);
    }

    const handlerSubmit = async () => {
        try {
            await setUsername(name!);
            const confirmationParams: ConfirmationParams = {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect',
            };
            navigation.navigate('Confirmation', confirmationParams);
        } catch (error) {
            Alert.alert('Não foi possível salver o seu nome. 😥');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>{isFilled ? '😄' : '😀'}</Text>
                                <Text style={styles.title}>
                                    Como podemos{'\n'}
                                chamar você?
                            </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button
                                    onPress={handlerSubmit}
                                    disabled={!name}
                                >
                                    Confirmar
                            </Button>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        marginTop: 20,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        width: "100%",
        marginTop: 40,
        paddingHorizontal: 20
    }
});

export default UserIdentification;
