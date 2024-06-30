import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCY7tdvvk28hYitUglwlnWA3gogbkqtZfk",
  authDomain: "vitatrack-11fd4.firebaseapp.com",
  projectId: "vitatrack-11fd4",
  storageBucket: "vitatrack-11fd4.appspot.com",
  messagingSenderId: "462127157292",
  appId: "1:462127157292:web:cce66e6a9d22b457ba0189"
};


// Initialize Firebase app
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

// Initialize Auth with AsyncStorage
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
