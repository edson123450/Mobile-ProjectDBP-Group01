import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { fetchGetWorkerServices } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const WorkerServicios = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchGetWorkerServices();
        setServices(response);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceText}>Nombre del Servicio: {item.name}</Text>
      <Text style={styles.serviceText}>Precio: {item.price}</Text>
      <Text style={styles.serviceText}>Distritos:</Text>
      <FlatList
        data={item.distritos_atiende}
        keyExtractor={(district, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.districtText}>{item.name}</Text>}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>

      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderServiceItem}
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
    marginTop: 60, // Ajusta el margen superior para bajar el contenido
  },
  backButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start', // Asegura que el botón esté alineado a la izquierda
    marginBottom: 10, // Añade un margen inferior para separar del contenido
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    marginTop: 10, // Ajusta este valor para empujar la lista hacia abajo
  },
  serviceItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 16,
  },
  districtText: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default WorkerServicios;