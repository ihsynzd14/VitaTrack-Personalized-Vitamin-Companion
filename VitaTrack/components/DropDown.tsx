import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

interface DropdownProps {
  inputTitle: string;
  items: { label: string, value: string }[];
  iconName: string;
  selectedValue: string | null;
  onValueChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ inputTitle, items, iconName, selectedValue, onValueChange }) => {
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome6 name={iconName} size={24} color="black" style={{ marginRight: 8 }} />
        <Text style={styles.label}>{inputTitle}</Text>
      </View>
      <View style={styles.container}>
        <RNPickerSelect
          onValueChange={onValueChange}
          items={items}
          style={pickerSelectStyles}
          value={selectedValue}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderWidth: 1, 
    borderColor: '#000000', 
    borderRadius: 8, 
    fontSize: 16, 
    marginTop: 8 ,
    marginBottom: 12
  },
  label: {
    fontSize: 18, 
    fontWeight: 'bold',

  },
  selectedValue: {
    marginTop: 10,
    fontSize: 16,
  
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    padding: 10, 
    fontSize: 16,
  },
});

export default Dropdown;
