import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import AuthRoutes from './tab.routes';
import Confirmation from '../pages/Confirmation';
import PlantSave from '../pages/PlantSave';
import UserIdentification from '../pages/UserIdentification';
import Welcome from '../pages/Welcome';

const StackRoutes = createStackNavigator();

export interface AppRoutesProps {
    initialRouter?: string;
}

const AppRoutes: React.FC<AppRoutesProps> = props => (
    <StackRoutes.Navigator
        initialRouteName={props.initialRouter || "Welcome"}
        headerMode="none"
        screenOptions={{
            cardStyle: { backgroundColor: colors.white }
        }}
    >
        <StackRoutes.Screen name="Confirmation" component={Confirmation} />
        <StackRoutes.Screen name="MyPlants" component={AuthRoutes} />
        <StackRoutes.Screen name="PlantSave" component={PlantSave} />
        <StackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
        <StackRoutes.Screen name="UserIdentification" component={UserIdentification} />
        <StackRoutes.Screen name="Welcome" component={Welcome} />
    </StackRoutes.Navigator>
);

export default AppRoutes;