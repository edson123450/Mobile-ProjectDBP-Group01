import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { fetchGetClientAppointmentsByStatus } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const getCurrentDate = () => {
  const now = new Date();
  return format(now, 'yyyy-MM-dd');
};

const ClientAppointmentsSide = () => {
  const [requestedAppointments, setRequestedAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const currentDate = getCurrentDate();
  const navigation = useNavigation();

  const fetchAppointments = async () => {
    try {
      const requested = await fetchGetClientAppointmentsByStatus('REQUESTED', currentDate);
      const accepted = await fetchGetClientAppointmentsByStatus('ACCEPTED', currentDate);

      setRequestedAppointments(requested);
      setAcceptedAppointments(accepted);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Image 
        source={item.client.profileImage ? { uri: item.client.profileImage } : require('../images/NoPhotoImage.jpeg')}
        style={styles.profileImage} 
      />
      <View style={styles.appointmentInfo}>
        <Text style={styles.appointmentText}>{`Cliente: ${item.client.firstname} ${item.client.lastname}`}</Text>
        <Text style={styles.appointmentText}>{`Fecha: ${item.date}`}</Text>
        <Text style={styles.appointmentText}>{`Hora: ${item.horaDeInicio} - ${item.horaDeFin}`}</Text>
        <Text style={styles.appointmentText}>{`Servicio: ${item.servicio.name} - ${item.servicio.price}`}</Text>
        <Text style={styles.appointmentText}>{`Dirección: ${item.cliente_direccion}`}</Text>
        <Text style={styles.appointmentText}>{`Distrito: ${item.district.name}`}</Text>
        <Text style={styles.appointmentText}>{`Estado: ${item.status}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>

      <View style={styles.column}>
        <Text style={styles.columnTitle}>Solicitudes Pendientes</Text>
        <FlatList
          data={requestedAppointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAppointmentItem}
          contentContainerStyle={styles.list}
        />
      </View>

      <View style={styles.column}>
        <Text style={styles.columnTitle}>Solicitudes Aceptadas</Text>
        <FlatList
          data={acceptedAppointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAppointmentItem}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    paddingTop: 80, // Ajuste para mover todo hacia abajo
  },
  backButton: {
    position: 'absolute',
    top: 40,
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
  column: {
    flex: 1,
    padding: 10,
  },
  columnTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  list: {
    marginTop: 10,
  },
  appointmentItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  appointmentInfo: {
    flex: 1,
    marginBottom: 10,
  },
  appointmentText: {
    fontSize: 16,
  },
});

export default ClientAppointmentsSide;