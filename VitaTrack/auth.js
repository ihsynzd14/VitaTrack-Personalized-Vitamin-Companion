import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = '@auth_token';
const REFRESH_TOKEN_KEY = '@refresh_token';
const USER_KEY = '@user';

// Function to save authentication tokens and user info
// Function to save authentication tokens and user info
export const SaveAuthData = async (accessToken, refreshToken, user) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

    // Debugging: Log the saved tokens
    console.log('Authentication tokens saved:', accessToken, refreshToken);

  } catch (error) {
    console.error('Failed to save authentication data:', error);
    throw error;
  }
};


// Function to retrieve authentication data (tokens and username)
export const getAuthData = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    const username = await AsyncStorage.getItem(USER_KEY);

    if (accessToken !== null && refreshToken !== null && username !== null) {
      return { accessToken, refreshToken, username: JSON.parse(username) };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to get authentication data:', error);
    throw error;
  }
};

// Function to check if refresh token is expired
export const isRefreshTokenExpired = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    // Implement your logic to check token expiry (e.g., compare with current time)
    // Return true if expired, false otherwise
    return false; // Placeholder logic
  } catch (error) {
    console.error('Failed to check refresh token expiry:', error);
    throw error;
  }
};

// Function to clear authentication data (logout)
export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Failed to clear authentication data:', error);
    throw error;
  }
};