import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuthData, isRefreshTokenExpired } from './auth';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import VitaminsScreen from './screens/VitaminsScreen';
import VitaminAddScreen from './screens/VitaminAddScreen';
import VitaminEditScreen from './screens/VitaminEditScreen';
import { PaperProvider } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const navigationRef = useRef(null);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const authData = await getAuthData();
        if (authData) {
          const { refreshToken } = authData;
          const refreshTokenExpired = await isRefreshTokenExpired(refreshToken);
          if (!refreshTokenExpired) {
            // If tokens are valid, navigate to 'HomeTabs'
            navigationRef.current?.navigate('HomeTabs');
          }
        }
      } catch (error) {
        console.error('Error checking authentication state:', error);
        // Handle error as needed (e.g., navigate to Login screen)
        navigationRef.current?.navigate('Login');
      }
    };

    checkAuthState();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen 
        name="Vitamins"
        component={VitaminsScreen}
        />
        <Stack.Screen 
        name="VitaminAddScreen"
        component={VitaminAddScreen}
        options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen 
        name="VitaminEditScreen"
        component={VitaminEditScreen}
        options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeTabs = () => (

  <Tab.Navigator
  screenOptions={{
    
    headerShown: false,
    tabBarActiveTintColor: '#FF7A00', // Adjust active tab color
    tabBarInactiveTintColor: '#FFFFFF', // Adjust inactive tab color
    tabBarLabelStyle: {
   
      fontSize: 10,
      marginTop: -4,
      marginBottom: 5,
    },
    tabBarStyle: {
      position: 'absolute',
      backgroundColor: '#181A20', // Background color of the tab bar
      borderTopWidth: 0, // Remove top border if not needed
      borderRadius: 20, // Rounded corners
      marginHorizontal: 35, // Add horizontal margin
      marginBottom: 18, // Add bottom margin
      elevation: 5, // Elevation for shadow on Android
    },
  }}
>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" size={size} color={color} />,
    }}
  />
  <Tab.Screen
    name="Vitamins"
    component={VitaminsScreen}
    options={{
      tabBarIcon: ({ color, size }) => <FontAwesome6 name="pills" size={20} color={color} />,
    }}
  />
</Tab.Navigator>

);


export default App;