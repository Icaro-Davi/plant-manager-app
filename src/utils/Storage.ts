import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';
import { PlantProps } from '../pages/PlantSelect';

const keys = {
    user: '@plantmanager:user',
    plants: '@plantmanager:plants'
}

export const setUsername = async (name: string) => {
    try {
        await AsyncStorage.setItem(keys.user, name);
    } catch (error) {
        throw new Error(error);
    }
}

export const getUsername = async () => {
    return await AsyncStorage.getItem(keys.user);
}

interface StoragePlantProps {
    [id: string]: {
        data: PlantProps,
        notificationId: string;
    }
}

export const savePlant = async (plant: PlantProps): Promise<void> => {
    try {
        const nexTime = new Date(plant.dateTimeNotification);
        const now = new Date();

        const { times, repeat_every } = plant.frequency;
        if (repeat_every === 'week') {
            const interval = Math.trunc(7 / times);
            nexTime.setDate(now.getDate() + interval);
        } else {
            nexTime.setDate(nexTime.getDate() + 1);
        }

        const seconds = Math.abs(Math.ceil((now.getTime() - nexTime.getTime()) / 1000));

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Heey, 🌱',
                body: `Está na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        });

        const data = await AsyncStorage.getItem(keys.plants);
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId
            }
        }

        await AsyncStorage.setItem(keys.plants, JSON.stringify({
            ...newPlant,
            ...oldPlants
        }));

    } catch (error) {
        throw new Error(error);
    }
}

export const loadPlant = async (): Promise<PlantProps[]> => {
    try {
        const data = await AsyncStorage.getItem(keys.plants);
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const plantSorted = Object
            .keys(plants)
            .map(plant => ({
                ...plants[plant].data,
                hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
            }))
            .sort((a, b) =>
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 1000 -
                    Math.floor(new Date(b.dateTimeNotification!).getTime() / 1000)
                )
            );
        return plantSorted;
    } catch (error) {
        throw new Error(error);
    }
}

export const removePlant = async (plantId: number): Promise<void> => {
    try {
        const data = await AsyncStorage.getItem(keys.plants);
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};
        await Notifications.cancelScheduledNotificationAsync(plants[plantId].notificationId);
        delete plants[plantId];
        await AsyncStorage.setItem(keys.plants, JSON.stringify(plants));
    } catch (error) {
        throw new Error(error);
    }
}

export default keys;