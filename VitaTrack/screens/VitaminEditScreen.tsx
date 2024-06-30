import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AppBar from './AppBar';
import TextInput from '../components/TextInput';
import Dropdown from '../components/DropDown';
import { getAuthData } from '../auth';
import TimePicker from '../components/TimePicker';
import MyDatePicker from '../components/DatePicker';
import ContentForm from '../components/ContentForm2';

const VitaminEditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params as { item: any };
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
  const [name, setName] = useState(item.supplement_name);
  const [amount, setAmount] = useState(item.amount.toString());
  const [type, setType] = useState(item.supplement_type);
  const [measure, setMeasure] = useState(item.amount_measure);
  const [startDate, setStartDate] = useState(new Date(item.start_date));
  const [endDate, setEndDate] = useState(new Date(item.end_date));
  const [intakeTimes, setIntakeTimes] = useState(item.daily_intake_times ? item.daily_intake_times.map(time => new Date(`2000-01-01T${time}:00`)) : []);
  const [nutritionalContent, setNutritionalContent] = useState(item.nutritional_content || {});

  useEffect(() => {
    setName(item.supplement_name);
    setAmount(item.amount.toString());
    setType(item.supplement_type);
    setMeasure(item.amount_measure);
    setStartDate(new Date(item.start_date));
    setEndDate(new Date(item.end_date));
    setIntakeTimes(item.daily_intake_times ? item.daily_intake_times.map(time => new Date(`2000-01-01T${time}:00`)) : []);
    setNutritionalContent(item.nutritional_content || {});
  }, [item]);

  const handleNutritionalContentChange = (updatedContent) => {
    setNutritionalContent(updatedContent);
  };

  const handleSaveChanges = async () => {
    const formattedStartDate = startDate ? new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;
    const formattedEndDate = endDate ? new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;

    const formattedIntakeTimes = intakeTimes.map(time => {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    });

    const updatedVitaminData = {
      supplement_name: name,
      amount,
      supplement_type: type,
      amount_measure: measure,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      daily_intake_times: formattedIntakeTimes,
      nutritional_content: nutritionalContent,
    };

    console.log(nutritionalContent);

    const { accessToken } = await getAuthData();

    try {
      const response = await fetch(`http://192.168.1.148:8000/api/vitamin/${item.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedVitaminData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Vitamin updated successfully!');
        navigation.goBack(); // Navigate back after successful update
      } else {
        const errorData = await response.json();
        Alert.alert('Error', `Failed to update vitamin: ${errorData.message}`);
      }
    } catch (error) {
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  return (
    <>
      <AppBar name="Edit Supplement" />
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          inputTitle="Supplement Name"
          inputPlaceholder="Enter supplement name"
          iconName="pills"
          inputValue={name}
          onChangeText={setName}
        />
        <Dropdown
          inputTitle="Supplement Type"
          items={dropdownItems}
          iconName="flask"
          selectedValue={type}
          onValueChange={setType}
        />
        <TextInput
          inputTitle="Amount"
          inputPlaceholder="Enter amount"
          iconName="pills"
          inputValue={amount}
          onChangeText={setAmount}
        />
        <Dropdown
          inputTitle="Amount Measure"
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
           <ContentForm initialValues={nutritionalContent} onNutritionalContentChange={handleNutritionalContentChange} />
        )}
        <Button title="Save Changes" onPress={handleSaveChanges} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    
  },
  dateContainer: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default VitaminEditScreen;
