import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, TouchableOpacity } from 'react-native';
import { fetchGetWorkerAppointmentsByStatus, fetchWorkerUpdateCitaStatus } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const getCurrentDate = () => {
  const now = new Date();
  return format(now, 'yyyy-MM-dd');
};

const WorkerAppointmentsSide = () => {
  const [requestedAppointments, setRequestedAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const currentDate = getCurrentDate();
  const navigation = useNavigation();

  const fetchAppointments = async () => {
    try {
      const requested = await fetchGetWorkerAppointmentsByStatus('REQUESTED', currentDate);
      const accepted = await fetchGetWorkerAppointmentsByStatus('ACCEPTED', currentDate);

      setRequestedAppointments(requested);
      setAcceptedAppointments(accepted);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await fetchWorkerUpdateCitaStatus(appointmentId, status);
      Alert.alert('Éxito', `La cita ha sido ${status.toLowerCase()}`);
      // Refresh appointments after update
      fetchAppointments();
    } catch (error) {
      Alert.alert('Error', `No se pudo actualizar la cita a ${status.toLowerCase()}`);
    }
  };

  const handleAccept = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'ACCEPTED');
  };

  const handleReject = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'CANCELLED');
  };

  const handleComplete = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'COMPLETED');
  };

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
      {item.status === 'REQUESTED' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleAccept(item.id)}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.rejectButton]} onPress={() => handleReject(item.id)}>
            <Text style={styles.buttonText}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.status === 'ACCEPTED' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleComplete(item.id)}>
            <Text style={styles.buttonText}>Terminado</Text>
          </TouchableOpacity>
        </View>
      )}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#FF6347', // Color para el botón de rechazar
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WorkerAppointmentsSide;





















/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, TouchableOpacity } from 'react-native';
import { fetchGetWorkerAppointmentsByStatus, fetchWorkerUpdateCitaStatus } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import ReviewWorker from './ReviewWorker'; // Importa el componente de reseña

const getCurrentDate = () => {
  const now = new Date();
  return format(now, 'yyyy-MM-dd');
};

const WorkerAppointmentsSide = () => {
  const [requestedAppointments, setRequestedAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null); // Para almacenar la cita actual que se está completando
  const currentDate = getCurrentDate();
  const navigation = useNavigation();

  const fetchAppointments = async () => {
    try {
      const requested = await fetchGetWorkerAppointmentsByStatus('REQUESTED', currentDate);
      const accepted = await fetchGetWorkerAppointmentsByStatus('ACCEPTED', currentDate);

      setRequestedAppointments(requested);
      setAcceptedAppointments(accepted);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await fetchWorkerUpdateCitaStatus(appointmentId, status);
      Alert.alert('Éxito', `La cita ha sido ${status.toLowerCase()}`);
      fetchAppointments();
    } catch (error) {
      Alert.alert('Error', `No se pudo actualizar la cita a ${status.toLowerCase()}`);
    }
  };

  const handleAccept = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'ACCEPTED');
  };

  const handleReject = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'CANCELLED');
  };

  const handleComplete = (appointment) => {
    setCurrentAppointment(appointment);
  };

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
      {item.status === 'REQUESTED' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleAccept(item.id)}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.rejectButton]} onPress={() => handleReject(item.id)}>
            <Text style={styles.buttonText}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.status === 'ACCEPTED' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleComplete(item)}>
            <Text style={styles.buttonText}>Terminado</Text>
          </TouchableOpacity>
        </View>
      )}
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

      {currentAppointment && (
        <ReviewWorker worker={currentAppointment.worker} onClose={() => setCurrentAppointment(null)} />
      )}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#FF6347', // Color para el botón de rechazar
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WorkerAppointmentsSide;*/

/*import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, TouchableOpacity, Modal } from 'react-native';
import { fetchGetWorkerAppointmentsByStatus, fetchWorkerUpdateCitaStatus } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import ReviewWorker from './ReviewWorker';

const getCurrentDate = () => {
  const now = new Date();
  return format(now, 'yyyy-MM-dd');
};

const WorkerAppointmentsSide = () => {
  const [requestedAppointments, setRequestedAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const currentDate = getCurrentDate();
  const navigation = useNavigation();

  const fetchAppointments = async () => {
    try {
      const requested = await fetchGetWorkerAppointmentsByStatus('REQUESTED', currentDate);
      const accepted = await fetchGetWorkerAppointmentsByStatus('ACCEPTED', currentDate);

      setRequestedAppointments(requested);
      setAcceptedAppointments(accepted);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await fetchWorkerUpdateCitaStatus(appointmentId, status);
      Alert.alert('Éxito', `La cita ha sido ${status.toLowerCase()}`);
      fetchAppointments();
    } catch (error) {
      Alert.alert('Error', `No se pudo actualizar la cita a ${status.toLowerCase()}`);
    }
  };

  const handleComplete = (appointment) => {
    updateAppointmentStatus(appointment.id, 'COMPLETED');
    setCurrentAppointment(appointment);
    setModalVisible(true);
  };

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
      {item.status === 'REQUESTED' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => updateAppointmentStatus(item.id, 'ACCEPTED')}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.rejectButton]} onPress={() => updateAppointmentStatus(item.id, 'CANCELLED')}>
            <Text style={styles.buttonText}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.status === 'ACCEPTED' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleComplete(item)}>
            <Text style={styles.buttonText}>Terminado</Text>
          </TouchableOpacity>
        </View>
      )}
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

      {currentAppointment && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <ReviewWorker
            worker={currentAppointment.worker}
            serviceName={currentAppointment.servicio.name}
            onClose={() => setModalVisible(false)}
          />
        </Modal>
      )}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#FF6347', // Color para el botón de rechazar
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WorkerAppointmentsSide;*/