import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, Alert } from 'react-native';
import { fetchGetClientMe } from '../services/api';
import NoPhotoImage from '../images/NoPhotoImage.jpeg';
import { useNavigation } from '@react-navigation/native';

const ClientProfile = () => {
    const [client, setClient] = useState(null);
    const [editing, setEditing] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const navigation = useNavigation();
    
    useEffect(() => {
        const loadClientData = async () => {
        try {
            const data = await fetchGetClientMe();
            setClient(data);
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setAge(data.age.toString());
        } catch (error) {
            console.error('Failed to load client data: ', error);
        }
        };
        loadClientData();
    }, []);
    
    const handleSave = async () => {
        // Aquí deberías implementar la lógica para guardar los cambios en el perfil
        Alert.alert('Perfil guardado');
        setEditing(false);
    };
    
    if (!client) {
        return (
        <View style={styles.container}>
            <Text>Cargando...</Text>
        </View>
        );
    }
    
    return (
        <View style={styles.container}>
        <Image source={NoPhotoImage} style={styles.image} />
        {editing ? (
            <>
            <TextInput
                style={styles.input}
                value={firstname}
                onChangeText={setFirstname}
                placeholder="First Name"
            />
            <TextInput
                style={styles.input}
                value={lastname}
                onChangeText={setLastname}
                placeholder="Last Name"
            />
            <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Age"
                keyboardType="numeric"
            />
            <Button title="Guardar" onPress={handleSave} />
            </>
        ) : (
            <>
            <Text style={styles.text}>Nombre: {client.firstname}</Text>
            <Text style={styles.text}>Apellido: {client.lastname}</Text>
            <Text style={styles.text}>Edad: {client.age}</Text>
            <Text style={styles.text}>Rol: {client.role === 'ROLE_CLIENT' ? 'CLIENTE' : 'TRABAJADOR'}</Text>
            <Button title="Editar Perfil" onPress={() => setEditing(true)} />
            </>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        margin: 10,
    },
});

export default ClientProfile;
