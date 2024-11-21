import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashScreen/splashScreen';
import home from '../screens/homeScreen/HomeScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';
// import LoginScreen from '../screens/loginScreen/loginScreen';
// import HomeScreen from '../screens/homeScreen/home';
// import NotificationScreen from '../screens/notificationScreen/notification';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import withAuth from '../components/withAuth';
// import withLoading from '../components/withLoading';

const Stack = createNativeStackNavigator();
// const AuthenticatedNotificationScreen = withAuth(withLoading(NotificationScreen));

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen 
      name="Splash" 
      component={SplashScreen} 
      options={{ headerShown: false }} 
      />
      {/* <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ headerShown: false }} 
      /> */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      {/* <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ title: 'Notifications' }}
      /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
