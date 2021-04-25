import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FlatList } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';
import { loadPlant, removePlant } from '../utils/Storage';

import { PlantProps } from './PlantSelect';
import PlantCardSecondary from '../components/PlantCardSecondary';
import Loading from '../components/Loading';

const MyPlants = () => {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>()

    const handleRemove = (plant: PlantProps) => {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 😥',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);
                        setMyPlants(oldData => oldData.filter(
                            item => item.id !== plant.id
                        ));
                    } catch (error) {
                        Alert.alert('Não foi possível remover! 😥');
                    }
                }
            }
        ])
    }

    useEffect(() => {
        let isMounted = true;
        (async () => {
            const plantStorages = await loadPlant();
            const nextTime = formatDistance(
                new Date(plantStorages[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: ptBR }
            );
            if (isMounted) {
                setNextWatered(`Não esqueça de regar a ${plantStorages[0].name} à ${nextTime} horas.`);
                setMyPlants(plantStorages);
                setLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        }
    }, []);


    if (isLoading) return <Loading />

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary
                            data={item}
                            handleRemove={() => handleRemove(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
});

export default MyPlants;