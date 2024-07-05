import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, Alert } from 'react-native';
import { fetchGetWorkerServices } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const MisServicios = () => {
    const [services, setServices] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchGetWorkerServices();
                setServices(data);
            } catch (error) {
                console.error('Failed to load services: ', error);
            }
        };
        loadServices();
    }, []);

    if (!services) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {services.map(service => (
                <View key={service.id} style={styles.service}>
                    <Text style={styles.title}>{service.name}</Text>
                    <Text style={styles.description}>{service.description}</Text>
                    <Text style={styles.price}>Precio: {service.price}</Text>
                    <Text style={styles.distritos}>Distritos: {service.distritos_atiende.map(distrito => distrito.name).join(', ')}</Text>
                </View>
            ))}
        </View>
    );
};