import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchSetWorkerSchedule } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const WorkerSetHorarioDeTrabajo = () => {
  const [fecha, setFecha] = useState(new Date());
  const [horaDeInicio, setHoraDeInicio] = useState(new Date());
  const [horaDeFin, setHoraDeFin] = useState(new Date());
  const [showFechaPicker, setShowFechaPicker] = useState(false);
  const [showHoraDeInicioPicker, setShowHoraDeInicioPicker] = useState(false);
  const [showHoraDeFinPicker, setShowHoraDeFinPicker] = useState(false);
  const navigation = useNavigation();
  
  const inicioTimerRef = useRef(null);
  const finTimerRef = useRef(null);

  const handleFechaChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowFechaPicker(false);
    setFecha(currentDate);
  };

  const handleHoraDeInicioChange = (event, selectedTime) => {
    const currentTime = selectedTime || horaDeInicio;
    setHoraDeInicio(currentTime);
    clearTimeout(inicioTimerRef.current);
    inicioTimerRef.current = setTimeout(() => {
      setShowHoraDeInicioPicker(false);
    }, 3000); // Mantener el selector abierto por 3 segundos después del último cambio
  };

  const handleHoraDeFinChange = (event, selectedTime) => {
    const currentTime = selectedTime || horaDeFin;
    setHoraDeFin(currentTime);
    clearTimeout(finTimerRef.current);
    finTimerRef.current = setTimeout(() => {
      setShowHoraDeFinPicker(false);
    }, 3000); // Mantener el selector abierto por 3 segundos después del último cambio
  };

  const handleSubmit = async () => {
    const scheduleData = {
      fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
      hora_de_inicio: horaDeInicio.toTimeString().split(' ')[0], // Formato HH:MM:SS
      hora_de_fin: horaDeFin.toTimeString().split(' ')[0], // Formato HH:MM:SS
    };

    // Validación de la hora de inicio y fin
    if (horaDeInicio >= horaDeFin) {
      Alert.alert('Error', 'La hora de inicio debe ser antes de la hora de fin');
      return;
    }

    const oneHour = 60 * 60 * 1000; // Milisegundos en una hora
    if (horaDeFin - horaDeInicio !== oneHour) {
      Alert.alert('Error', 'La duración del horario debe ser exactamente de una hora');
      return;
    }

    try {
      const status = await fetchSetWorkerSchedule(scheduleData);
      if (status === 201) {
        Alert.alert('Horario creado correctamente');
        setFecha(new Date());
        setHoraDeInicio(new Date());
        setHoraDeFin(new Date());
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'No se pudo crear el horario');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Fecha</Text>
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

      <Text style={styles.label}>Hora de Inicio</Text>
      <View style={styles.row}>
        <Text style={styles.selectedTime}>{horaDeInicio.toLocaleTimeString()}</Text>
        <Button title="Seleccionar hora de inicio" onPress={() => setShowHoraDeInicioPicker(true)} />
      </View>
      {showHoraDeInicioPicker && (
        <DateTimePicker
          value={horaDeInicio}
          mode="time"
          display="default"
          onChange={handleHoraDeInicioChange}
          minuteInterval={60} // Permitir solo horas exactas
        />
      )}

      <Text style={styles.label}>Hora de Fin</Text>
      <View style={styles.row}>
        <Text style={styles.selectedTime}>{horaDeFin.toLocaleTimeString()}</Text>
        <Button title="Seleccionar hora de fin" onPress={() => setShowHoraDeFinPicker(true)} />
      </View>
      {showHoraDeFinPicker && (
        <DateTimePicker
          value={horaDeFin}
          mode="time"
          display="default"
          onChange={handleHoraDeFinChange}
          minuteInterval={60} // Permitir solo horas exactas
        />
      )}

      <Button title="Crear horario" onPress={handleSubmit} />
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
    top: 165, // Ajusta este valor para mover el botón hacia abajo
    left: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  selectedTime: {
    fontSize: 16,
    color: 'grey',
    marginTop: 10, // Añadir espacio superior para centrar verticalmente
  },
});

export default WorkerSetHorarioDeTrabajo;