/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { fetchGetServiciosByName } from '../services/api'; // Este es el fetch actualizado
import { useNavigation, useRoute } from '@react-navigation/native';

const ServiceDetails = () => {
  const [workers, setWorkers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { serviceName } = route.params;

  useEffect(() => {
    fetchWorkers();
  }, [serviceName, page]);

  const fetchWorkers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetchGetServiciosByName(serviceName, page, 5);
      setWorkers(prevWorkers => [...prevWorkers, ...response.content]);
      setHasMore(!response.last);
    } catch (error) {
      console.error('Failed to fetch workers:', error);
    }
    setLoading(false);
  };

  const renderWorkerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.workerButton}
      onPress={() => navigation.navigate('ContractWorker', { worker: item.worker })}
    >
      <View style={styles.workerInfo}>
        <Image 
          source={item.worker.profileImage ? { uri: item.worker.profileImage } : require('../images/NoPhotoImage.jpeg')} 
          style={styles.profileImage} 
        />
        <View>
          <Text style={styles.workerButtonText}>{`${item.worker.firstname} ${item.worker.lastname}`}</Text>
          <Text style={styles.workerDetails}>{`Precio: ${item.price}`}</Text>
          <Text style={styles.workerDetails}>{`Calificación: ${item.worker.averageRating}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{serviceName}</Text>
        <FlatList
          data={workers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderWorkerItem}
          contentContainerStyle={styles.list}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
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
  content: {
    marginTop: 80, // Ajusta este valor para mover el contenido hacia abajo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    marginTop: 20,
  },
  workerButton: {
    backgroundColor: '#2196F3',
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
  workerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workerDetails: {
    color: 'white',
    fontSize: 16,
  },
});

export default ServiceDetails;*/

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { fetchGetServiciosByName } from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';

const ServiceDetails = () => {
  const [workers, setWorkers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { serviceName } = route.params;

  useEffect(() => {
    fetchWorkers();
  }, [serviceName, page]);

  const fetchWorkers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetchGetServiciosByName(serviceName, page, 5);
      setWorkers(prevWorkers => [...prevWorkers, ...response.content]);
      setHasMore(!response.last);
    } catch (error) {
      console.error('Failed to fetch workers:', error);
    }
    setLoading(false);
  };

  const renderWorkerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.workerButton}
      onPress={() => navigation.navigate('ContractWorker', { workerId: item.worker.id, serviceName: serviceName })}
    >
      <View style={styles.workerInfo}>
        <Image 
          source={item.worker.profileImage ? { uri: item.worker.profileImage } : require('../images/NoPhotoImage.jpeg')} 
          style={styles.profileImage} 
        />
        <View>
          <Text style={styles.workerButtonText}>{`${item.worker.firstname} ${item.worker.lastname}`}</Text>
          <Text style={styles.workerDetails}>{`Precio: ${item.price}`}</Text>
          <Text style={styles.workerDetails}>{`Calificación: ${item.worker.averageRating}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{serviceName}</Text>
        <FlatList
          data={workers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderWorkerItem}
          contentContainerStyle={styles.list}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
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
  content: {
    marginTop: 80, // Ajusta este valor para mover el contenido hacia abajo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    marginTop: 20,
  },
  workerButton: {
    backgroundColor: '#2196F3',
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
  workerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workerDetails: {
    color: 'white',
    fontSize: 16,
  },
});

export default ServiceDetails;