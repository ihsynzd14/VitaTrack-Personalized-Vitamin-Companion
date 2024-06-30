import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import AppBar from './AppBar';
import TextInput from '../components/TextInput';
import NutritionalContentForm from '../components/ContentForm';
import MyDatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
import Dropdown from '../components/DropDown';
import CustomButton from '../components/CustomButton';
import { getAuthData } from '../auth'; // Adjust the import path as per your project structure

const VitaminAddScreen = () => {
  const dropdownItems = [
    { label: 'Simple', value: 'simple' },
    { label: 'Complex', value: 'complex' },
  ];

  const dropdownMeasures = [
    { label: 'Milligrams', value: 'mg' },
    { label: 'Grams', value: 'gram' },
    { label: 'Capsules', value: 'capsule' },
    { label: 'UI', value: 'ui' },
  ];

  const todaysDate = new Date();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('simple');
  const [measure, setMeasure] = useState('');
  const [startDate, setStartDate] = useState(todaysDate);
  const [endDate, setEndDate] = useState(todaysDate);
  const [intakeTimes, setIntakeTimes] = useState([]);
  const [nutritionalContent, setNutritionalContent] = useState({});

  const handleNutritionalContentChange = (updatedContent) => {
    setNutritionalContent(updatedContent); // Update directly with the new content
  };

  const handleAddVitamin = async () => {
    // Format dates to ISO strings without time component
    const formattedStartDate = startDate ? new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;
    const formattedEndDate = endDate ? new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;

    // Format intake times to HH:mm format strings
    const formattedIntakeTimes = intakeTimes.map(time => {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    });

   

    const vitaminData = {
      supplement_name: name,
      amount,
      supplement_type: type,
      amount_measure: measure,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      daily_intake_times: formattedIntakeTimes,
      nutritional_content: nutritionalContent, // Include nutritionalContent directly
    };

    console.log(vitaminData);

    const { accessToken } = await getAuthData();

    try {
      const response = await fetch('http://192.168.1.148:8000/api/vitamin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Replace with your actual Bearer Token
        },
        body: JSON.stringify(vitaminData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Vitamin added to diary successfully!');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', `Failed to add vitamin: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  return (
    <>
      <AppBar name="Add Vitamin to Diary" />
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Add your vitamin to diary</Text>
          <TextInput
            inputTitle="Supplement Name"
            inputPlaceholder="Enter vitamin"
            iconName="pills"
            inputValue={name}
            onChangeText={setName}
          />
          <TextInput
            inputTitle="Amount"
            inputPlaceholder="Enter Amount"
            iconName="pills"
            inputValue={amount}
            onChangeText={setAmount}
          />
          <Dropdown
            inputTitle="Supplement Type"
            items={dropdownItems}
            iconName="pills"
            selectedValue={type}
            onValueChange={setType}
          />
         
            <Dropdown
              inputTitle="Measurement"
              items={dropdownMeasures}
              iconName="pills"
              selectedValue={measure}
              onValueChange={setMeasure}
            />
         
          <View style={styles.dateContainer}>
            <MyDatePicker iconName="calendar-minus" inputTitle="Start Date" onSelect={setStartDate} />
            <MyDatePicker iconName="calendar-minus" inputTitle="End Date" onSelect={setEndDate} />
          </View>
          <TimePicker iconName="calendar" inputTitle="Daily Intake Times" initialTimes={intakeTimes} onAddTime={setIntakeTimes} />
          {type === 'complex' && (
            <NutritionalContentForm onNutritionalContentChange={handleNutritionalContentChange} />
          )}
          <CustomButton
            buttonTitle="Save"
            iconName="save"
            onPress={handleAddVitamin}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  dateContainer: {
    justifyContent: 'space-between', // Space dates evenly
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default VitaminAddScreen;
