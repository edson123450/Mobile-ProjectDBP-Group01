import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { fetchGetServices, fetchRequestService } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const Servicios = () => {
    const navigation = useNavigation();
    const [services, setServices] = useState(null);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchGetServices();
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
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={async () => {
                    const status = await fetchRequestService(id);
                    if (status === 201) {
                        const role=await getRoleBasedOnToken();
                        if(role=='ROLE_CLIENT'){
                            navigation.navigate('ClientHome');
                        } else {
                            navigation.navigate('WorkerHome');
                        }
                    }
                }} style={styles.backButton}>
                <Text style={styles.backButtonText}>Atrás</Text>
            </TouchableOpacity>
            {services.map(service => (
                <TouchableOpacity
                    key={service.id}
                    style={styles.button}
                    onPress={() => navigation.navigate('Servicio')}
                >
                    <Text style={styles.buttonText}>{service.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '80%',
    },
    button: {
        width: '45%',
        backgroundColor: '#4CAF50',
        padding: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    backButton: {
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 16,
    },
});

export default Servicios;