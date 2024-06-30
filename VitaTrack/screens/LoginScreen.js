import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SaveAuthData } from '../auth'; // Import the function

// Define your Tailwind-inspired color palette
const colors = {
  blue: '#007bff', // Blue from the palette
  white: '#ffffff', // White from the palette
  gray: '#1f1f1f', // Dark gray background
  lightGray: '#2f2f2f', // Lighter gray for form container
  red: '#dc3545', // Red for error messages
};

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Welcome Back!</Text>
      <Text style={styles.subHeaderText}>Please login to continue.</Text>
    </View>
  );
};

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.148:8000/api/token/', {
        username: username,
        password: password,
      });
  
      const { access, refresh } = response.data;
  
      // Save tokens and username in AsyncStorage
      await SaveAuthData(access, refresh, username);
  
      console.log('Logged in with:', username);
      navigation.navigate('HomeTabs'); // Navigate to 'HomeTabs' screen
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Header />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={username}
            onChangeText={text => setUsername(text)}
            placeholder='Username'
            placeholderTextColor={colors.white} // Placeholder text color
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder='Password'
            placeholderTextColor={colors.white} // Placeholder text color
            secureTextEntry
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? Sign up here.</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray, // Set background color to dark gray
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: colors.white,
    fontSize: 16,
    marginTop: 10,
  },
  formContainer: {
    width: '80%',
    backgroundColor: colors.lightGray, // Lighter gray for form container
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.gray, // Darker background for inputs
    color: colors.white, // Text color for inputs
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.gray,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default LoginScreen;