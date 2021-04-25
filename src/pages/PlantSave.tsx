import React, { useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantProps } from './PlantSelect';

import { Button } from '../components/buttons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadPlant, savePlant } from '../utils/Storage';
import { ConfirmationParams } from './Confirmation';

interface Params {
    plant: PlantProps
}

const PlantSave = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const { plant } = route.params as Params;

    const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState);
        }
        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰');
        }
        if (dateTime) {
            setSelectedDateTime(dateTime);
        }
    }

    const handleOpenDateTimePickerForAndroid = () => {
        setShowDatePicker(oldState => !oldState);
    }

    const handleSave = async () => {
        try {
            await savePlant({ ...plant, dateTimeNotification: selectedDateTime });
            const confirmationParams: ConfirmationParams = {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito Obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants',
            };
            navigation.navigate('Confirmation', confirmationParams);
        } catch (error) {
            Alert.alert('Não foi possível salvar. 😥');
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />
                    <Text style={styles.plantName}>{plant.name}</Text>
                    <Text style={styles.plantAbout}>{plant.about}</Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>{plant.water_tips}</Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                </Text>

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )}

                    {Platform.OS === 'android' && (
                        <TouchableOpacity
                            style={styles.dateTimePickerTextButton}
                            onPress={handleOpenDateTimePickerForAndroid}
                        >
                            <Text style={styles.dateTimePickerText}>
                                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                    )}

                    <Button onPress={handleSave}>Cadastrar planta</Button>

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace()
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginTop: 5
    },
    dateTimePickerTextButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
});

export default PlantSave;