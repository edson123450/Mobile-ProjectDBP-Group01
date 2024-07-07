import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { fetchGetWorkerServiceFinalPage, fetchGetWorkerSchedulesBySevenDays } from '../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';

const ContractWorker = () => {
  const [workerDetails, setWorkerDetails] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { workerId, serviceName } = route.params;

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const response = await fetchGetWorkerServiceFinalPage(workerId, serviceName);
        setWorkerDetails(response);
      } catch (error) {
        console.error('Failed to fetch worker details:', error);
      }
    };

    fetchWorkerDetails();
  }, [workerId, serviceName]);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const handleSearchSchedules = async () => {
    if ((endDate - startDate) / (1000 * 60 * 60 * 24) > 7) {
      Alert.alert('Error', 'El intervalo no puede ser mayor a 7 días.');
      return;
    }

    try {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      const response = await fetchGetWorkerSchedulesBySevenDays(workerId, formattedStartDate, formattedEndDate);
      setSchedules(response);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      Alert.alert('Error', 'No se pudieron obtener los horarios.');
    }
  };

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <Text style={styles.scheduleText}>{item.fecha}</Text>
      <Text style={styles.scheduleText}>{item.horaDeInicio} - {item.horaDeFin}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>

      {workerDetails && (
        <View style={styles.detailsContainer}>
          <Image 
            source={workerDetails.worker.profileImage ? { uri: workerDetails.worker.profileImage } : require('../images/NoPhotoImage.jpeg')} 
            style={styles.profileImage} 
          />
          <Text style={styles.workerName}>{`${workerDetails.worker.firstname} ${workerDetails.worker.lastname}`}</Text>
          <Text style={styles.workerRating}>{`Calificación: ${workerDetails.worker.averageRating}`}</Text>
          <Text style={styles.workerPrice}>{`Precio: ${workerDetails.price}`}</Text>
          <Text style={styles.workerDistricts}>Distritos:</Text>
          {workerDetails.distritos_atiende.map((district, index) => (
            <Text key={index} style={styles.districtName}>{district.name}</Text>
          ))}
        </View>
      )}

      <View style={styles.datePickerContainer}>
        <Button title="Seleccionar fecha de inicio" onPress={() => setShowStartDatePicker(true)} />
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
          />
        )}
        <Text style={styles.selectedDate}>{startDate.toDateString()}</Text>

        <Button title="Seleccionar fecha de fin" onPress={() => setShowEndDatePicker(true)} />
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
          />
        )}
        <Text style={styles.selectedDate}>{endDate.toDateString()}</Text>

        <Button title="Buscar Horarios" onPress={handleSearchSchedules} />
      </View>

      <FlatList
        data={schedules}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderScheduleItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  workerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workerRating: {
    fontSize: 18,
    marginBottom: 10,
  },
  workerPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  workerDistricts: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  districtName: {
    fontSize: 16,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  list: {
    marginTop: 20,
  },
  scheduleItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  scheduleText: {
    fontSize: 16,
  },
});

export default ContractWorker;