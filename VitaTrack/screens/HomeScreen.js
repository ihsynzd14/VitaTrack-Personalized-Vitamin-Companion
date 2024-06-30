import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { clearAuthData, getAuthData } from '../auth';
import AppBar from './AppBar';

// Define your Tailwind-inspired color palette
const colors = {
  black: '#1f1f1f', // Dark black background
  white: '#ffffff', // White text
};

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAuthData = async () => {
      const authData = await getAuthData();
      if (authData) {
        setUsername(authData.username);
        setAccessToken(authData.accessToken); // Set access token state
        setRefreshToken(authData.refreshToken); // Set refresh token state
      }
    };
    fetchAuthData();
  }, []);

  const handleSignOut = async () => {
    try {
      await clearAuthData();
      navigation.replace('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <AppBar name="Home" />
      <View style={styles.container}>
        {/* Display user information */}
        <Text style={styles.userInfo}>Welcome, {username}</Text>
        <Text style={styles.tokenInfo}>Access Token: {accessToken}</Text>
        <Text style={styles.tokenInfo}>Refresh Token: {refreshToken}</Text>
        
        {/* Sign out button */}
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181A20', // Set background color to dark black
  },
  userInfo: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tokenInfo: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: '60%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
    elevation: 10,
    backgroundColor: '#24252B', // Button background color
    borderColor: colors.black, // Button border color
    borderWidth: 1, // Button border width
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default HomeScreen;