/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TouchableOpacity, Alert, Button } from 'react-native';
import { fetchGetClientAppointmentsNotReviewed } from '../services/api';
import ReviewWorker from './ReviewWorker';
import { useNavigation } from '@react-navigation/native';

const ClientAppointmentsNotReviewed = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await fetchGetClientAppointmentsNotReviewed();
                setAppointments(data);
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const handleReview = (appointment) => {
        setCurrentAppointment(appointment);
        setModalVisible(true);
    };

    const renderAppointmentItem = ({ item }) => (
        <View style={styles.appointmentItem}>
            <Image
                source={item.worker.profileImage ? { uri: item.worker.profileImage } : require('../images/NoPhotoImage.jpeg')}
                style={styles.profileImage}
            />
            <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentText}>{`Worker: ${item.worker.firstname} ${item.worker.lastname}`}</Text>
                <Text style={styles.appointmentText}>{`Service: ${item.servicio.name} - ${item.servicio.price}`}</Text>
                <Text style={styles.appointmentText}>{`Date: ${item.date}`}</Text>
                <Text style={styles.appointmentText}>{`Time: ${item.horaDeInicio} - ${item.horaDeFin}`}</Text>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleReview(item)}>
                <Text style={styles.buttonText}>Calificar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Atrás</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Citas aún por calificar</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderAppointmentItem}
                contentContainerStyle={styles.list}
            />

            {currentAppointment && (
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <ReviewWorker
                        worker={currentAppointment.worker}
                        serviceName={currentAppointment.servicio.name}
                        onClose={() => { setModalVisible(false); fetchAppointments(); }}
                    />
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        marginTop: 10,
    },
    appointmentItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    appointmentInfo: {
        flex: 1,
    },
    appointmentText: {
        fontSize: 16,
    },
    actionButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ClientAppointmentsNotReviewed;*/

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TouchableOpacity, Alert, Button } from 'react-native';
import { fetchGetClientAppointmentsNotReviewed } from '../services/api';
import ReviewWorker from './ReviewWorker';
import { useNavigation } from '@react-navigation/native';

const ClientAppointmentsNotReviewed = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const fetchAppointments = async () => {
        try {
            const data = await fetchGetClientAppointmentsNotReviewed();
            setAppointments(data);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleReview = (appointment) => {
        setCurrentAppointment(appointment);
        setModalVisible(true);
    };

    const handleReviewSubmit = () => {
        fetchAppointments();
        setModalVisible(false);
    };

    const renderAppointmentItem = ({ item }) => (
        <View style={styles.appointmentItem}>
            <Image
                source={item.worker.profileImage ? { uri: item.worker.profileImage } : require('../images/NoPhotoImage.jpeg')}
                style={styles.profileImage}
            />
            <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentText}>{`Worker: ${item.worker.firstname} ${item.worker.lastname}`}</Text>
                <Text style={styles.appointmentText}>{`Service: ${item.servicio.name} - ${item.servicio.price}`}</Text>
                <Text style={styles.appointmentText}>{`Date: ${item.date}`}</Text>
                <Text style={styles.appointmentText}>{`Time: ${item.horaDeInicio} - ${item.horaDeFin}`}</Text>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleReview(item)}>
                <Text style={styles.buttonText}>Calificar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Atrás</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Citas aún por calificar</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderAppointmentItem}
                contentContainerStyle={styles.list}
            />

            {currentAppointment && (
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <ReviewWorker
                        appointmentId={currentAppointment.id}
                        worker={currentAppointment.worker}
                        serviceName={currentAppointment.servicio.name}
                        onClose={() => setModalVisible(false)}
                        onSubmit={handleReviewSubmit}
                    />
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        marginTop: 10,
    },
    appointmentItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    appointmentInfo: {
        flex: 1,
    },
    appointmentText: {
        fontSize: 16,
    },
    actionButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ClientAppointmentsNotReviewed;