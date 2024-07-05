import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchUpdateService, fetchGetServiceById } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const EditarServicio = () => {
    const { id } = route.params;
    const navigation = useNavigation();
    const [service, setService] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [distritos, setDistritos] = useState(['']);

    useEffect(() => {
        const loadService = async () => {
            try {
                const data = await fetchGetServiceById(id);
                setService(data);
                setName(data.name);
                setPrice(data.price.toString());
                setDistritos(data.distritos_atiende.map(distrito => distrito.name));
            } catch (error) {
                console.error('Failed to load service: ', error);
            }
        };
        loadService();
    }, [id]);

    const handleAddDistrito = () => {
        if (distritos.length < 15) {
            setDistritos([...distritos, '']);
        }
    };

    const handleRemoveLastDistrito = () => {
        if (distritos.length > 1) {
            setDistritos(distritos.slice(0, -1));
        }
    };

    const handleDistritoChange = (text, index) => {
        const newDistritos = [...distritos];
        newDistritos[index] = text;
        setDistritos(newDistritos);
    };

    const handleSubmit = async () => {
        const updateServicioDTO = {
            name: name,
            price: parseInt(price, 10),
            distritos_atiende: distritos
                .filter(distrito => distrito !== '')
                .map(distrito => ({ name: distrito }))
        };
        console.log(updateServicioDTO);
        try {
            const status = await fetchUpdateService(id, updateServicioDTO);
            if (status === 200) {
                Alert.alert('Servicio actualizado');
                navigation.navigate('MisServicios');
            }
        } catch (error) {
            console.error('Failed to update service: ', error);
        }
    };

    if (!service) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar servicio</Text>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nombre del servicio"
            />
            <Text style={styles.label}>Precio</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Precio"
            />
            <Text style={styles.label}>Distritos</Text>
            {distritos.map((distrito, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    value={distrito}
                    onChangeText={text => handleDistritoChange(text, index)}
                    placeholder="Distrito"
                />
            ))}
            <TouchableOpacity onPress={handleAddDistrito} style={styles.button}>
                <Text style={styles.buttonText}>Agregar distrito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRemoveLastDistrito} style={styles.button}>
                <Text style={styles.buttonText}>Eliminar último distrito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default EditarServicio;