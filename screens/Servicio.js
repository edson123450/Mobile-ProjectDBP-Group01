import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchGetServiceById, fetchRequestService, getRoleBasedOnToken } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const Servicio = () => {
    const { id } = route.params;
    const navigation = useNavigation();
    const [service, setService] = useState(null);

    useEffect(() => {
        const loadService = async () => {
            try {
                const data = await fetchGetServiceById(id);
                setService(data);
            } catch (error) {
                console.error('Failed to load service: ', error);
            }
        };
        loadService();
    }, [id]);

    if (!service) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Servicios')} style={styles.backButton}>
                <Text style={styles.backButtonText}>Atrás</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{service.name}</Text>
            <Text style={styles.description}>{service.description}</Text>
            <Text style={styles.price}>Precio: {service.price}</Text>
            <Text style={styles.distritos}>Distritos: {service.distritos_atiende.map(distrito => distrito.name).join(', ')}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    const status = await fetchRequestService(id);
                    if (status === 201) {
                        const role=await getRoleBasedOnToken();
                        if(role=='ROLE_CLIENT'){
                            navigation.navigate('ClientHome');
                        } else {
                            navigation.navigate('WorkerHome');
                        }
                    }
                }}
            >
                <Text style={styles.buttonText}>Solicitar servicio</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        marginBottom: 10,
    },
    price: {
        marginBottom: 10,
    },
    distritos: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    backButton: {
        marginBottom: 20,
    },
    backButtonText: {
        color: '#4CAF50',
    },
});

export default Servicio;