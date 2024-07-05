import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, Alert } from 'react-native';
import { fetchGetWorkerMe } from '../services/api';
import NoPhotoImage from '../images/NoPhotoImage.jpeg';
import { useNavigation } from '@react-navigation/native';

const WorkerProfile = () => {
  const [worker, setWorker] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadWorkerData = async () => {
      try {
        const data = await fetchGetWorkerMe();
        setWorker(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setAge(data.age.toString());
      } catch (error) {
        console.error('Failed to load worker data: ', error);
      }
    };
    loadWorkerData();
  }, []);

  const handleSave = async () => {
    // Aquí deberías implementar la lógica para guardar los cambios en el perfil
    Alert.alert('Perfil guardado');
    setEditing(false);
  };

  if (!worker) {
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
          <Text style={styles.text}>Nombre: {worker.firstname}</Text>
          <Text style={styles.text}>Apellido: {worker.lastname}</Text>
          <Text style={styles.text}>Edad: {worker.age}</Text>
          <Text style={styles.text}>Rol: {worker.role === 'ROLE_WORKER' ? 'TRABAJADOR' : 'CLIENTE'}</Text>
          <Text style={styles.text}>Calificación Promedio: {worker.AverageRating}</Text>
          <Button title="Editar Perfil" onPress={() => setEditing(true)} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default WorkerProfile;