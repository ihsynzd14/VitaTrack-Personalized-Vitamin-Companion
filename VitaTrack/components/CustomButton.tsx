import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ButtonProps {
  onPress: () => void;
  buttonTitle: string;
  iconName: string;
}

const CustomButton: React.FC<ButtonProps> = ({ onPress, buttonTitle, iconName }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <FontAwesome name={iconName} size={24} color="white" />
      </View>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1E88E5',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 30,
      marginVertical: 12,
      elevation: 5,
    },
    iconContainer: {
      marginRight: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  

export default CustomButton;