import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchLogin } from "../services/api";
import {View, StyleSheet} from 'react-native'
import {Text, TextInput, Button} from 'react-native-paper'

const Login=()=>{
    const navigation=useNavigation();
    const [data,setData]=useState({
        email:'',
        password:''
    });
    const [error,setError]=useState();
    
    const handleInputChange=(field,value)=>{
        setData({
            ...data,
            [field]:value
        });
    };
    const handleLogin=async ()=>{
        setError('');
        if(!data.email || !data.password){
            setError('Email and Password are required');
            return;
        }
        try{
            const role=await fetchLogin(data);
            if(role=='ROLE_CLIENT'){
                navigation.navigate('ClientHomeScreen');
            }else if(role=='ROLE_WORKER'){
                navigation.navigate('WorkerHomeScreen');
            }else{
                setError('Email or Password is incorrect');
            }
        }catch(error){
            console.log('Login failed: ', error);
            setError('Email or Password is incorrect');
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login in DomiService</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
            label="Email"
            style={styles.input}
            value={data.email}
            onChangeText={(value)=>handleInputChange('email',value)}
            placeholder="Enter your email"
            />
            <TextInput
            label="Password"
            style={styles.input}
            value={data.password}
            onChangeText={(value)=>handleInputChange('password',value)}
            placeholder="Enter your password"
            secureTextEntry
            />
            <Button 
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            >
                Log In
            </Button>
            <Button
            mode="text"
            onPress={()=>navigation.navigate('Register')}
            style={styles.buttonText}
            >
                Dont have an account? Register
            </Button>
        </View>
    );



}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#fff',
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'contain',
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      marginBottom: 12,
    },
    button: {
      marginTop: 16,
    },
    buttonText: {
      marginTop: 8,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 16,
    },
  });

  export default Login;


