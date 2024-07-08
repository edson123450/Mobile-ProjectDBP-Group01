/*import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { fetchSubmitReview } from '../services/api'; // Necesitarás definir esta función en tu API

const ReviewWorker = ({ worker, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = async () => {
    try {
      await fetchSubmitReview(worker.id, rating, comment);
      Alert.alert('Éxito', 'Reseña enviada');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la reseña');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={worker.profileImage ? { uri: worker.profileImage } : require('../images/NoPhotoImage.jpeg')} style={styles.profileImage} />
      <Text style={styles.workerName}>{`${worker.firstname} ${worker.lastname}`}</Text>
      <Text style={styles.label}>Calificación:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={styles.star}>{star <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Comentario:</Text>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Escribe un comentario"
        multiline
      />
      <Button title="Enviar" onPress={handleSubmitReview} />
      <Button title="Cerrar" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  workerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
});

export default ReviewWorker;*/

/*import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { fetchCreateReview } from '../services/api'; // Necesitarás definir esta función en tu API

const ReviewWorker = ({ worker, serviceName, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = async () => {
    const createdAt = new Date().toISOString(); // ISO 8601 format
    const reviewData = {
      workerId: worker.id,
      nameServicio: serviceName,
      rating,
      comentario: comment,
      createdAt,
    };

    try {
      await fetchCreateReview(reviewData);
      Alert.alert('Éxito', 'Reseña enviada');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la reseña');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={worker.profileImage ? { uri: worker.profileImage } : require('../images/NoPhotoImage.jpeg')} style={styles.profileImage} />
      <Text style={styles.workerName}>{`${worker.firstname} ${worker.lastname}`}</Text>
      <Text style={styles.label}>Calificación:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={styles.star}>{star <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Comentario:</Text>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Escribe un comentario"
        multiline
      />
      <Button title="Enviar" onPress={handleSubmitReview} />
      <Button title="Cerrar" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  workerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
});

export default ReviewWorker;*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { fetchCreateReview } from '../services/api';

const ReviewWorker = ({ appointmentId, worker, serviceName, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = async () => {
    const createdAt = new Date().toISOString(); // ISO 8601 format
    const reviewData = {
      appointmentId,
      workerId: worker.id,
      nameServicio: serviceName,
      rating,
      comentario: comment,
      createdAt,
    };

    try {
      await fetchCreateReview(reviewData);
      Alert.alert('Éxito', 'Reseña enviada');
      onSubmit();
      onClose();
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la reseña');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={worker.profileImage ? { uri: worker.profileImage } : require('../images/NoPhotoImage.jpeg')} style={styles.profileImage} />
      <Text style={styles.workerName}>{`${worker.firstname} ${worker.lastname}`}</Text>
      <Text style={styles.label}>Calificación:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={styles.star}>{star <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Comentario:</Text>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Escribe un comentario"
        multiline
      />
      <Button title="Enviar" onPress={handleSubmitReview} />
      <Button title="Cerrar" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  workerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
});

export default ReviewWorker;