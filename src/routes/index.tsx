import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackRoutes, { AppRoutesProps } from './stack.routes';

const Routes: React.FC<AppRoutesProps> = props => (
    <NavigationContainer>
        <StackRoutes {...props} />
    </NavigationContainer>
)

export default Routes;