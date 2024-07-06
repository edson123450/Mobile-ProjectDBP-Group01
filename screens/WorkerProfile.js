import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { fetchGetWorkerMe, fetchUpdateWorkerProfile, fetchUpdateWorkerImage } from '../services/api';
import NoPhotoImage from '../images/NoPhotoImage.jpeg';
import { useNavigation } from '@react-navigation/native';

const WorkerProfile = () => {
  const [worker, setWorker] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (!permission) {
      // Camera permissions are still loading.
      return;
    }

    if (!permission.granted) {
      // Camera permissions are not granted yet.
      requestPermission();
    }

    const loadWorkerData = async () => {
      try {
        const data = await fetchGetWorkerMe();
        setWorker(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setAge(data.age.toString());
        setImage(data.profileImage);
      } catch (error) {
        console.error('Failed to load worker data: ', error);
      }
    };
    loadWorkerData();
  }, [permission]);

  const handleSaveProfile = async () => {
    const workerProfileToUpdate = {
      firstname,
      lastname,
      age: parseInt(age, 10),
    };

    try {
      const updatedWorker = await fetchUpdateWorkerProfile(workerProfileToUpdate);
      setWorker(updatedWorker);
      Alert.alert('Perfil guardado');
      setEditing(false);
    } catch (error) {
      console.error('El perfil no se pudo guardar: ', error);
      Alert.alert('Error', 'El perfil no se pudo guardar');
    }
  };

  const handleSaveImage = async () => {
    if (image) {
      try {
        await fetchUpdateWorkerImage(image);
        Alert.alert('Foto de perfil actualizada');
      } catch (error) {
        console.error('No se pudo actualizar la foto de perfil: ', error);
        Alert.alert('Error', 'No se pudo actualizar la foto de perfil');
      }
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      const photo = await cameraRef.current.takePictureAsync();
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 800 } }], // Ajusta el ancho a 800 px, puedes cambiarlo según tus necesidades
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Comprime la imagen al 70%
      );
      setImage(resizedPhoto.uri);
      setCameraVisible(false);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  if (!worker) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cameraVisible ? (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          onCameraReady={() => setCameraReady(true)}
        >
          <View style={styles.cameraOverlay}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Text style={styles.buttonText}>Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={toggleCameraFacing}>
              <Text style={styles.buttonText}>Cambiar Cámara</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <>
          <TouchableOpacity onPress={() => setCameraVisible(true)}>
            <Image source={image ? { uri: image } : NoPhotoImage} style={styles.image} />
          </TouchableOpacity>
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
              <Button title="Guardar Perfil" onPress={handleSaveProfile} />
            </>
          ) : (
            <>
              <Text style={styles.text}>Nombre: {worker.firstname}</Text>
              <Text style={styles.text}>Apellido: {worker.lastname}</Text>
              <Text style={styles.text}>Edad: {worker.age}</Text>
              <Text style={styles.text}>Rol: {worker.role}</Text>
              <Text style={styles.text}>Calificación Promedio: {worker.averageRating}</Text>
              <Button title="Editar Perfil" onPress={() => setEditing(true)} />
              <Button title="Atrás" onPress={() => navigation.navigate('WorkerHomeScreen')} />
            </>
          )}
          <Button title="Guardar Foto de Perfil" onPress={handleSaveImage} />
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
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  captureButton: {
    alignSelf: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
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