import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { fetchGetServicios } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const Servicios = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchGetServicios();
        setServices(response);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('ServiceDetails', { serviceName: item })}>
      <Text style={styles.serviceButtonText}>{item}</Text>
    </TouchableOpacity>
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
  },
  backButton: {
    position: 'absolute',
    top: 50, // Ajusta este valor para posicionar el botón de "Atrás"
    left: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Asegúrate de que el botón "Atrás" esté sobre otros elementos
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    marginTop: 100, // Ajusta este valor para empujar la lista hacia abajo
  },
  serviceButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Servicios;