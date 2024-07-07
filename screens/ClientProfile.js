/*import React, { useEffect, useState } from 'react';
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

export default ClientProfile;*/

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { fetchGetClientMe, fetchUpdateClientProfile, fetchUpdateClientImage } from '../services/api';
import NoPhotoImage from '../images/NoPhotoImage.jpeg';
import { useNavigation } from '@react-navigation/native';

const ClientProfile = () => {
  const [client, setClient] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [distritoVive, setDistritoVive] = useState('');
  const [direccion, setDireccion] = useState('');
  const [image, setImage] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (!permission) {
      return;
    }

    if (!permission.granted) {
      requestPermission();
    }

    const loadClientData = async () => {
      try {
        const data = await fetchGetClientMe();
        setClient(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setAge(data.age.toString());
        setDistritoVive(data.distrito_vive.name);
        setDireccion(data.direccion);
        setImage(data.profileImage);
      } catch (error) {
        console.error('Failed to load client data: ', error);
      }
    };
    loadClientData();
  }, [permission]);

  const handleSaveProfile = async () => {
    const clientProfileToUpdate = {
      firstname,
      lastname,
      age: parseInt(age, 10),
      distrito_vive: distritoVive,
      direccion,
    };

    try {
      await fetchUpdateClientProfile(clientProfileToUpdate);
      Alert.alert('Perfil guardado');
      setEditing(false);
      // Reload the client data
      const updatedClient = await fetchGetClientMe();
      setClient(updatedClient);
    } catch (error) {
      console.error('El perfil no se pudo guardar: ', error);
      Alert.alert('Error', 'El perfil no se pudo guardar');
    }
  };

  const handleSaveImage = async () => {
    if (image) {
      try {
        await fetchUpdateClientImage(image);
        Alert.alert('Foto de perfil actualizada');
        // Reload the client data
        const updatedClient = await fetchGetClientMe();
        setClient(updatedClient);
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
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
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
        <Text style={{ textAlign: 'center' }}>Necesitamos tu permiso para usar la cámara</Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  if (!client) {
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
                placeholder="Nombre"
              />
              <TextInput
                style={styles.input}
                value={lastname}
                onChangeText={setLastname}
                placeholder="Apellido"
              />
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Edad"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={distritoVive}
                onChangeText={setDistritoVive}
                placeholder="Distrito"
              />
              <TextInput
                style={styles.input}
                value={direccion}
                onChangeText={setDireccion}
                placeholder="Dirección"
              />
              <Button title="Guardar Perfil" onPress={handleSaveProfile} />
            </>
          ) : (
            <>
              <Text style={styles.text}>Nombre: {client.firstname}</Text>
              <Text style={styles.text}>Apellido: {client.lastname}</Text>
              <Text style={styles.text}>Edad: {client.age}</Text>
              <Text style={styles.text}>Distrito: {client.distrito_vive.name}</Text>
              <Text style={styles.text}>Dirección: {client.direccion}</Text>
              <Text style={styles.text}>Rol: {client.role}</Text>
              <Button title="Editar Perfil" onPress={() => setEditing(true)} />
              <Button title="Atrás" onPress={() => navigation.navigate('ClientHomeScreen')} />
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

export default ClientProfile;