import React, { useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDatePicker = ({ iconName, inputTitle, onSelect }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      onSelect(selectedDate); // Pass the selected date back to the parent component
    }
  };

  const formattedDate = date.toLocaleDateString('en-GB'); // Format the date to DD/MM/YYYY


  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <FontAwesome6 name={iconName} size={24} color="black" style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{inputTitle}</Text>
      </View>
      <View style={{ justifyContent: "space-around" }}>
        <TouchableOpacity style={styles.datePicker} onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};


const styles = StyleSheet.create({
  datePicker: {
    paddingVertical: 15,
    paddingHorizontal: 20,

    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    color: 'black',
  },
});

export default MyDatePicker;
