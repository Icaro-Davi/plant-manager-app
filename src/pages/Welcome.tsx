import React from 'react';
import { SafeAreaView, Text, Image, Dimensions, StyleSheet, View } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import watering from '../assets/watering.png';

import { NextButton } from '../components/buttons';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();

    const handleStart = () => navigation.navigate('UserIdentification');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie{"\n"}
                suas plantas de{"\n"}
                forma fácil
            </Text>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={watering}
                />
                <Text style={styles.subtitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.</Text>
                <NextButton onPress={handleStart} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        fontFamily: fonts.heading,
        color: colors.heading,
        textAlign: 'center',
        marginTop: 38,
        lineHeight: 34
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get('window').width * 0.7,
    },
});


export default Welcome;