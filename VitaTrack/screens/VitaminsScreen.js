import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Animated, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import AppBar from './AppBar';
import fetchVitamins from '../api/vitaminsApi';
import { getAuthData, clearAuthData } from '../auth';
import { format, addDays, startOfWeek, isSameDay, isAfter, isBefore } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';

const colors = {
  blue: '#007bff', // Blue from the palette
  white: '#ffffff', // White from the palette
  gray: '#1f1f1f', // Dark gray background
  lightGray: '#2f2f2f', // Lighter gray for form container
};

const VitaminsScreen = () => {

  // Define your Tailwind-inspired color palette


  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const navigation = useNavigation();
  const [vitamins, setVitamins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchVitaminsData();
  }, []);

  const fetchVitaminsData = async () => {
    try {
      const vitaminsData = await fetchVitamins();
      setVitamins(vitaminsData);
    } catch (error) {
      console.error('Error fetching vitamins:', error);
      if (error.response && error.response.status === 401) {
        navigation.replace('Login');
      } else {
        Alert.alert('Error', 'Failed to fetch vitamins. Please try again later.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchVitaminsData();
  }, []);

  const deleteVitamin = async (id) => {
    try {
      const { accessToken } = await getAuthData();
      const url = `http://192.168.1.148:8000/api/vitamin/delete/${id}/`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchVitaminsData();
      Alert.alert('Success', 'Vitamin deleted successfully.');
    } catch (error) {
      console.error('Error deleting vitamin:', error);
      Alert.alert('Error', 'Failed to delete vitamin. Please try again later.');
    }
  };

  const renderVitaminItem = ({ item }) => {
    const nutritionalContentItems = Object.entries(item.nutritional_content).map(([key, value]) => (
      <Text key={key} style={styles.detailText}>{key}: {value}</Text>
    ));

    return ( 
      <View className="bg-black-base p-8 my-5 rounded-md">
        <Text className="text-cwhite-dark text-lg font-bold">{item.supplement_name}</Text>
        <Divider className="my-1" />
        <Text className="text-base mb-0.2 text-cwhite-base">Supplement Type: {item.supplement_type}</Text>
        <Text className="text-base mb-0.2 text-cwhite-base">Amount: {item.amount} {item.amount_measure}</Text>
        <Text className="text-base mb-0.2 text-cwhite-base">Start Date: {item.start_date}</Text>
        <Text className="text-base mb-0.2 text-cwhite-base">End Date: {item.end_date}</Text>
        <Text className="text-base mb-0.2 text-cwhite-base">Daily Intake Times: {item.daily_intake_times.join(', ')}</Text>
        
        <View>
          <Text className="mt-2 text-base text-cwhite-base">
          Nutritional Content:
          </Text>
        
          {nutritionalContentItems.map((item, index) => (
          <Text className="text-cwhite-base" key={index}>
            {item}
          </Text>
           ))}
        </View>
        {/* Render other details */}
            
        <TouchableOpacity 
        style={styles.fileButtonEdit} 
        onPress={() => navigation.navigate('VitaminEditScreen', { item })}
      >
        <FontAwesome6 name="edit" size={25} color="#FFFF" />
      </TouchableOpacity>


      
        <TouchableOpacity 
        style={styles.fileButton} 
        onPress={() => 
          Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this vitamin?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Yes', onPress: () => deleteVitamin(item.id) },
            ],
            { cancelable: false }
          )
        }
      >
        <FontAwesome6 name="delete-left" size={25} color="#FFFF" />
      </TouchableOpacity>

      
      </View>
    );
  };

  if (loading) {
    return (
      <>
      <AppBar name="Diary of Vitamins"/>
      <View className="items-center justify-center flex-1 p-2.5">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      </>
    );
  }

  const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeekDate, i);
    const isFetched = vitamins.some(vitamin => isSameDay(new Date(vitamin.start_date), date) || isSameDay(new Date(vitamin.end_date), date));
    return {
      date,
      formatted: format(date, 'yyyy-MM-dd'),
      label: format(date, 'E'),
      isFetched,
    };
  });

  const filteredVitamins = vitamins.filter(vitamin => {
    const startDate = new Date(vitamin.start_date);
    const endDate = new Date(vitamin.end_date);
    return isSameDay(startDate, selectedDate) || isSameDay(endDate, selectedDate) || (isAfter(selectedDate, startDate) && isBefore(selectedDate, endDate));
  });
  

  return (
    <>
     <SafeAreaView style={styles.container}>
      <AppBar name="Diary of Vitamins"/>
      <View style={styles.weekContainer}>
        {weekDays.map(day => (
          <TouchableOpacity
            key={day.formatted}
            style={[
              styles.dayContainer,
              isSameDay(day.date, selectedDate) && styles.selectedDayContainer,
            ]}
            onPress={() => setSelectedDate(day.date)}
          >
            <Text style={styles.dayLabel}>{day.label}</Text>
            <Text style={styles.dayDate}>{format(day.date, 'd')}</Text>
            {day.isFetched && <FontAwesome name="circle" size={10} color="lightgreen" />}
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-1 p-2.5 bg-black-dark">
        <FlatList
          data={filteredVitamins}
          renderItem={renderVitaminItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
      <View className="mb-10" >
        <Animated.View style={{bottom: icon_1}} className="bg-slate-800 w-14 h-14 
                                      absolute bottom-10 right-10 
                                      rounded-3xl items-center 
                                      justify-center">
          <TouchableOpacity onPress={() => navigation.navigate('VitaminAddScreen')}>
            <FontAwesome6 name="pills" size={25} color="#FFFF"/>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{bottom: icon_2, right: icon_2}}  className="bg-slate-800 w-14 h-14 
                                      absolute bottom-10 right-10 
                                      rounded-3xl items-center 
                                      justify-center">
          <TouchableOpacity>
            <FontAwesome name="file-pdf-o" size={25} color="#FFFF"/>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{right: icon_3}}  className="bg-slate-800 w-14 h-14 
                                      absolute bottom-10 right-10 
                                      rounded-3xl items-center 
                                      justify-center">
          <TouchableOpacity>
            <FontAwesome name="share-alt" size={25} color="#FFFF"/>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity className="bg-slate-800 w-14 h-14 
                                      absolute bottom-10 right-10 
                                      rounded-3xl items-center 
                                      justify-center"
                          onPress={() => {
                            pop === false ? popIn() : popOut();
                          }}
        >
          <FontAwesome name="book" size={25} color="#FFFF"/>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20', // Black background color for the entire screen
  },
  fileButton: {
    position: 'absolute',
    top: 6,
    margin: 5,
    right: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f2f2f', // Darker background color
    borderRadius: 20,
  },
  fileButtonEdit: {
    position: 'absolute',
    top: 6,
    margin: 5,
    right: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f2f2f', // Darker background color
    borderRadius: 20,
  },
  detailText: {
    color: '#FFFFFF', // White text color
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#24252B', // Darker background color
  },
  dayContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#24252B', // Darker background color
    borderRadius: 10,
  },
  selectedDayContainer: {
    backgroundColor: '#2f2f2f', // Slightly lighter dark background color
    elevation: 15, // Adjusted elevation for shadow
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#FFFFFF', // White text color
  },
  dayDate: {
    fontSize: 16,
    color: '#FFFFFF', // White text color
  },
});
export default VitaminsScreen;
