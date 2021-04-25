import React, { Fragment, useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';

import Routes from './src/routes';
import { getUsername } from './src/utils/Storage';

interface PayloadAppData {
  username?: string;
}

export default function App() {
  const [payloadAppData, setPayloadAppData] = useState<PayloadAppData>();
  const [fontsLoaded] = useFonts({ Jost_400Regular, Jost_600SemiBold });

  useEffect(() => {
    (async () => {
      const payload = await Promise.all([
        getUsername()
      ]);

      setPayloadAppData({
        ...payload[0] ? { username: payload[0] } : {}
      });
    })();
  }, []);

  if (!fontsLoaded) return (
    <AppLoading />
  ); else return (
    <Fragment>
      <Routes initialRouter={payloadAppData?.username ? "MyPlants" : undefined} />
      <StatusBar translucent barStyle='dark-content' backgroundColor="transparent" />
    </Fragment>
  );
}

