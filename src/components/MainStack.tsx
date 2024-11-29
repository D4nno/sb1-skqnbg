import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LoginScreen } from "./auth/LoginScreen";
import { RegisterScreen } from "./auth/RegisterScreen";
import { LandingScreen } from "./landing/LandingScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#4A90E2",
                },
                headerTintColor: "#ffffff",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="Landing"
                component={LandingScreen}
                options={{ 
                    title: "My Tour Manager",
                    headerLeft: () => null 
                }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);