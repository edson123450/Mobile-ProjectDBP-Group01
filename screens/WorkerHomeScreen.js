/*import React from 'react'

const WorkerHomeScreen = () => {
  return (
    <div>WorkerHomeScreen</div>
  )
}

export default WorkerHomeScreen*/

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkerHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Worker Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WorkerHomeScreen;