import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaTreinoBonita from './components/Treino/ListaTreinoBonita';
import InfoExercicio from './components/Exercicio/InfoExercicio';

const Stack = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='ListaTreino'>
                <Stack.Screen name="ListaTreino" component={ListaTreinoBonita} options={{ headerShown: false }} />
                <Stack.Screen name="InfoExercicio" component={InfoExercicio} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}