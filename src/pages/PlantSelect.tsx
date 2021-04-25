import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { EnvironmentButton } from '../components/buttons';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { getPlants, getPlantsEnvironments } from '../services/SimulatePromise';

import Header from '../components/Header';
import Loading from '../components/Loading';
import PlantCardPrimary from '../components/PlantCardPrimary';

interface EnvironmentPros {
    key: string;
    title: string;
}

export interface PlantProps {
    id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: string[];
    frequency: {
        times: number;
        repeat_every: string;
    };
    hour: string;
    dateTimeNotification: Date;
}

function sortAsc(key: string) {
    return (a: any, b: any) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    }
}

const PlantSelect = () => {
    const navigation = useNavigation();
    const [environments, setEnvironments] = useState<EnvironmentPros[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [EnvironmentSelected, setEnvironmentSelected] = useState('all');
    const [isLoading, setLoading] = useState(true);

    const handleEnvironmentSelected = (environment: string) => {
        setEnvironmentSelected(environment);
        if (environment === 'all')
            return setFilteredPlants(plants);

        setFilteredPlants(plants.filter(
            plant => plant.environments.includes(environment)
        ));
    }

    const handlePlantSelect = (plant: PlantProps) => {
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await Promise.all([
                getPlantsEnvironments(),
                getPlants(),
            ]);
            setEnvironments([
                { key: 'all', title: 'Todos' },
                ...data[0].sort(sortAsc('title'))
            ]);
            const plants = data[1].sort(sortAsc('name')) as PlantProps[];
            setPlants(plants);
            setFilteredPlants(plants);
            setLoading(false);
        })();
    }, []);

    if (isLoading)
        return (<Loading />);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList
                    horizontal
                    keyExtractor={(item) => item.key}
                    showsHorizontalScrollIndicator={false}
                    data={environments}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            onPress={() => handleEnvironmentSelected(item.key)}
                            active={item.key === EnvironmentSelected}
                        >
                            {item.title}
                        </EnvironmentButton>
                    )}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => `plant-${item.id}`}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        paddingLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
});

export default PlantSelect;