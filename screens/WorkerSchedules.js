import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchGetWorkerSchedulesByDate } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment-timezone';

const WorkerSchedules = () => {
  const [fecha, setFecha] = useState(new Date());
  const [showFechaPicker, setShowFechaPicker] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const navigation = useNavigation();

  const handleFechaChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowFechaPicker(false);
    setFecha(currentDate);
  };

  const handleBuscar = async () => {
    // Convertir la fecha a la zona horaria de Lima antes de enviarla
    const formattedDate = moment(fecha).tz('America/Lima').format('YYYY-MM-DD');
    console.log("Fecha enviada al servidor: ", formattedDate);  // Verifica la fecha que estás enviando
    try {
      const response = await fetchGetWorkerSchedulesByDate(formattedDate);
      setSchedules(response);
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'No se pudo obtener los horarios');
      }
    }
  };

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <Text style={styles.scheduleText}>Fecha: {fecha.toDateString()}</Text>
      <Text style={styles.scheduleText}>Hora de Inicio: {item.horaDeInicio}</Text>
      <Text style={styles.scheduleText}>Hora de Fin: {item.horaDeFin}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.label}>Seleccionar Fecha</Text>
        <View style={styles.row}>
          <Text style={styles.selectedDate}>{fecha.toDateString()}</Text>
          <Button title="Seleccionar fecha" onPress={() => setShowFechaPicker(true)} />
        </View>
        {showFechaPicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={handleFechaChange}
            minimumDate={new Date()} // Permitir solo fechas futuras
          />
        )}

        <Button title="Buscar" onPress={handleBuscar} />

        <FlatList
          data={schedules}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderScheduleItem}
          contentContainerStyle={styles.list}
        />
      </View>
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
    top: 120, // Ajusta este valor para posicionar el botón de "Atrás"
    left: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    marginTop: -150, // Ajusta este valor para mover el contenido hacia abajo
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedDate: {
    fontSize: 16,
    color: 'grey',
    marginTop: 10, // Añadir espacio superior para centrar verticalmente
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

export default WorkerSchedules;