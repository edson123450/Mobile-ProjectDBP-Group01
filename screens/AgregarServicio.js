import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPostService } from '../services/api';

const AgregarServicio = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [distritos, setDistritos] = useState(['']);
  const [successMessage, setSuccessMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));  // Initial value for opacity: 0

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
    const createServicioDTO = {
      name: name,
      price: parseInt(price, 10),
      distritos_atiende: distritos
        .filter(distrito => distrito !== '')
        .map(distrito => ({ name: distrito }))
    };
    console.log(createServicioDTO);
    try {
      const status = await fetchPostService(createServicioDTO);
      if (status === 201) {
        setSuccessMessage('Servicio creado satisfactoriamente');
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => setSuccessMessage(''));
          }, 3000);
        });
        // Limpiar el formulario si es necesario
        setName('');
        setPrice('');
        setDistritos(['']);
        navigation.goBack();
      }
    } catch (error) {
      console.error('No se pudo crear el servicio, failed: ', error, createServicioDTO);
      Alert.alert('Error', 'No se pudo crear el servicio');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('WorkerHomeScreen')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Nombre del Servicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Servicio"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Distritos donde desea brindar el servicio</Text>
      {distritos.map((distrito, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Distrito ${index + 1}`}
          value={distrito}
          onChangeText={text => handleDistritoChange(text, index)}
        />
      ))}
      {distritos.length < 15 && (
        <Button title="Agregar otro distrito" onPress={handleAddDistrito} />
      )}
      {distritos.length > 1 && (
        <Button title="Quitar último distrito" onPress={handleRemoveLastDistrito} />
      )}
      <Button title="Enviar" onPress={handleSubmit} />
      {successMessage !== '' && (
        <Animated.View style={{ ...styles.successMessage, opacity: fadeAnim }}>
          <Text>{successMessage}</Text>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 8,
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    marginVertical: 8,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 16,
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default AgregarServicio;