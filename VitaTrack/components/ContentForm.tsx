import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface NutritionalContentFormProps {
  onNutritionalContentChange: (nutritionalContent: { [key: string]: string }) => void;
}

const NutritionalContentForm: React.FC<NutritionalContentFormProps> = ({ onNutritionalContentChange }) => {
  const [entries, setEntries] = useState<{ name: string; dose: string }[]>([{ name: '', dose: '' }]);

  // Pass nutritional entries back to parent component when entries change
  useEffect(() => {
    // Convert entries to { name: dose } format
    const formattedEntries: { [key: string]: string } = {};
    entries.forEach(entry => {
      if (entry.name && entry.dose) {
        formattedEntries[entry.name] = entry.dose;
      }
    });
    onNutritionalContentChange(formattedEntries);
  }, [entries]);

  const handleNameChange = (text: string, index: number) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], name: text };
    setEntries(updatedEntries);
  };

  const handleDoseChange = (text: string, index: number) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], dose: text };
    setEntries(updatedEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { name: '', dose: '' }]);
  };

  const removeEntry = (index: number) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="file" size={24} color="black" style={{ marginRight: 8 }} />
        <Text style={styles.label}>Nutritional Content</Text>
        <TouchableOpacity onPress={addEntry} style={styles.addButton}>
          <FontAwesome name="plus" size={20} color="white" />
          <Text style={styles.addButtonLabel}>Add Entry</Text>
        </TouchableOpacity>
      </View>
      {entries.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <View style={styles.inputContainer}>
            <FontAwesome name="pencil" size={20} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={entry.name}
              onChangeText={(text) => handleNameChange(text, index)}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="pencil" size={20} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Dose"
              value={entry.dose}
              onChangeText={(text) => handleDoseChange(text, index)}
            />
          </View>
          <TouchableOpacity onPress={() => removeEntry(index)} style={styles.removeButton}>
            <FontAwesome name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    padding: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default NutritionalContentForm;
