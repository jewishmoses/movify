import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nManager, } from 'react-native';
import Home from './src/screens/Home';
import Movie from './src/screens/Movie';

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
    animation: "fade",
};

I18nManager.forceRTL(true);

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Movie" component={Movie} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}