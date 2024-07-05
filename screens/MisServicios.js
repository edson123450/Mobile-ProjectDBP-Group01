import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { fetchGetWorkerServices, fetchDeleteService } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const MisServicios = () => {
    const [services, setServices] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const loadMyServices = async () => {
            try {
                const data = await fetchGetWorkerServices();
                setServices(data);
            } catch (error) {
                console.error('Failed to load my services: ', error);
            }
        };
        loadMyServices();
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
                    <Button title="Editar" onPress={() => navigation.navigate('EditarServicio', { id: service.id })} />
                    <Button title="Eliminar" onPress={() => {
                        Alert.alert(
                            "Confirmar eliminación",
                            "¿Estás seguro de que quieres eliminar este servicio?",
                            [
                                {
                                    text: "Cancelar",
                                    onPress: () => console.log("Cancelado"),
                                    style: "cancel"
                                },
                                {
                                    text: "Eliminar",
                                    onPress: async () => {
                                        const status = await fetchDeleteService(service.id);
                                        if (status === 204) {
                                            Alert.alert('Servicio eliminado');
                                            setServices(services.filter(s => s.id !== service.id));
                                        }
                                    },
                                    style: "destructive"
                                }
                            ]
                        );
                    }} />
                </View>
            ))}
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    service: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
    },
    distritos: {
        fontSize: 16,
    },
};

export default MisServicios;