import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = ({ iconName, inputTitle, initialTimes, onAddTime }) => {
  const [times, setTimes] = useState(initialTimes);
  const [showPicker, setShowPicker] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const newTime = selectedDate;
      if (currentEditIndex !== null) {
        const updatedTimes = [...times];
        updatedTimes[currentEditIndex] = newTime;
        setTimes(updatedTimes);
        setCurrentEditIndex(null);
      } else {
        setTimes([...times, newTime]);
      }
      // Update parent state with formatted times
      onAddTime([...times, newTime]);
    }
  };

  const handleEditTime = (index) => {
    setCurrentEditIndex(index);
    setShowPicker(true);
  };

  const handleRemoveTime = (index) => {
    const updatedTimes = times.filter((_, i) => i !== index);
    setTimes(updatedTimes);
    // Update parent state with updated times
    onAddTime(updatedTimes);
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <FontAwesome name={iconName} size={24} color="black" style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{inputTitle}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.addButtonText}>Add Time</Text>
        </TouchableOpacity>
      </View>
      {times.map((time, index) => (
        <View key={index} style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(time)}</Text>
          <TouchableOpacity onPress={() => handleEditTime(index)}>
            <FontAwesome name="edit" size={20} color="blue" style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveTime(index)}>
            <FontAwesome name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()} // Initial value is current date and time
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginLeft: 'auto',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  timeText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
});

export default TimePicker;