import React from 'react';
import { View, TextInput as RNTextInput, Text } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

const TextInput = ({ iconName, inputTitle, inputPlaceholder, inputValue, onChangeText }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome6 name={iconName} size={24} color="black" style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{inputTitle}</Text>
      </View>
      <RNTextInput
        value={inputValue}
        placeholder={inputPlaceholder}
        onChangeText={onChangeText} // Pass onChangeText to RNTextInput
        style={{ borderWidth: 1, borderColor: '#000000', padding: 10, borderRadius: 8, fontSize: 16, marginTop: 8 }}
      />
    </View>
  );
};

export default TextInput;
