import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { getUsername } from '../utils/Storage';

const Header: React.FC = props => {
    const [profile, setProfile] = useState<string>();
    const [username, setUsername] = useState<string>();

    const getRandomCatProfilePicture = async (isMounted: boolean) => {
        try {
            const response = await fetch('https://aws.random.cat/meow');
            const data = await response.json();
            (isMounted && !profile) && setProfile(data.file);
        } catch (error) {
            alert("Error on try get profile picture.");
        }
    }

    useEffect(() => {
        let isMounted = true;
        async function loadUsername() {
            const user = await getUsername();
            isMounted && setUsername(user || '');
        }

        getRandomCatProfilePicture(isMounted);
        loadUsername();
        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{username}</Text>
            </View>
            <Image style={styles.image} source={{ uri: profile }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overlayColor: colors.white
    }
});

export default Header;