import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import {View, StyleSheet, TouchableOpacity } from 'react-native'
import {Text, TextInput, Button} from 'react-native-paper'
import { fetchRegister } from '../services/api';




const Register = () => {
    const navigation=useNavigation();
    const [data,setData]=useState({
        firstname:'',
        lastname:'',
        age:0,
        email:'',
        password:'',
        district:{
            name:''
        },
        direccion:'',
        isWorker:'false'

    });

    const [error,setError]=useState('');

    const handleInputChange=(field,value)=>{
        setData({
            ...data,
            [field]:value
        });
    };

    const handleCheckboxChange = () => {
        setData({
          ...data,
          isWorker: data.isWorker === 'true' ? 'false' : 'true'
        });
      };
    
    const handleRegister=async()=>{
        setError('');
        try{
            const role=await fetchRegister(data);
            if(role==='ROLE_CLIENT'){
                navigation.navigate('ClientHomeScreen');
            }else if(role==='ROLE_WORKER'){
                navigation.navigate('WorkerHomeScreen');
            }else{
                setError('Theres some data that is wrong');
            }
        }catch(error){
            console.log('Regsiter failed: ',error);
            setError('Something went wrong');
        }
    }


    return (
        <View style={styles.container}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            value={data.firstname}
            onChangeText={(value) => handleInputChange('firstname', value)}
            placeholder='First Name'
          />
          <Text>Last Name</Text>
          <TextInput
            style={styles.input}
            value={data.lastname}
            onChangeText={(value) => handleInputChange('lastname', value)}
            placeholder='Last Name'
          />
          <Text>Age</Text>
          <TextInput
            style={styles.input}
            value={data.age}
            onChangeText={(value) => handleInputChange('age', value)}
            placeholder='Age'
            keyboardType='numeric'
          />
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            value={data.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder='Email'
            keyboardType='email-address'
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            value={data.password}
            onChangeText={(value) => handleInputChange('password', value)}
            placeholder='Password'
            secureTextEntry
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={handleCheckboxChange} style={styles.checkbox}>
              {data.isWorker === 'true' && <View style={styles.checked} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Register as Worker</Text>
          </View>
          {data.isWorker === 'false' && (
            <>
              <Text>District</Text>
              <TextInput
                style={styles.input}
                value={data.district.name}
                onChangeText={(value) => handleInputChange('district', { name: value })}
                placeholder='District'
              />
              <Text>Direccion</Text>
              <TextInput
                style={styles.input}
                value={data.direccion}
                onChangeText={(value) => handleInputChange('direccion', value)}
                placeholder='Direccion'
              />
            </>
          )}
          <Button
            mode='contained'
            onPress={handleRegister}
          >
            Register
          </Button>
          <Button
            mode='text'
            onPress={() => navigation.navigate('Login')}
          >
            Already have an account? Login
          </Button>
        </View>
      );


  /*return (
    <View style={styles.container}>
        {error ? <Text style={styles.errorText}>{error}</Text>: null}
        <Text>First Name</Text>
        <TextInput
        style={styles.input}
        value={data.firstname}
        onChangeText={(value)=>handleInputChange('firstname',value)}
        placeholder='First Name'
        />
        <Text>Last Name</Text>
        <TextInput
        style={styles.input}
        value={data.lastname}
        onChangeText={(value)=>handleInputChange('lastname',value)}
        placeholder='Last Name'
        />
        <Text>Age</Text>
        <TextInput
        style={styles.input}
        value={data.age}
        onChangeText={(value)=>handleInputChange('age',value)}
        placeholder='Age'
        />
        <Text>Email</Text>
        <TextInput
        style={styles.input}
        value={data.email}
        onChangeText={(value)=>handleInputChange('email',value)}
        placeholder='Email'
        />
        <Text>Passowrd</Text>
        <TextInput
        style={styles.input}
        value={data.password}
        onChangeText={(value)=>handleInputChange('password',value)}
        placeholder='Password'
        secureTextEntry
        />
        <Button
        mode='contained'
        onPress={handleRegister}
        >
            Register
        </Button>
        <Button
        mode='text'
        onPress={()=>navigation.navigate('Login')}
        >
            Already have an accout? Login
        </Button>
    </View>
  )*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: 'blue',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default Register