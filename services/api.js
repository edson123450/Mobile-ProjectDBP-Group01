import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import {jwtDecode} from 'jwt-decode'

const BACKEND_URL='http://3.95.187.149:8080'


export const getRoleBasedOnToken=async ()=>{
    const token=await SecureStore.getItemAsync('token');
    const decodedToken=jwtDecode(token);
    return decodedToken.role;
}

export const fetchLogin=async(body)=>{
    try{
        const response=await axios.post(`${BACKEND_URL}/auth/login`,body, {
            headers:{
                'Content-Type':'application/json',
            },
        });
        if(response.status===200){
            await SecureStore.setItemAsync('token',response.data.token);
            return getRoleBasedOnToken();
        }
    }catch(error){
        console.error('Login axios failed: ',error);
        throw error;
    }

}

export const fetchRegister=async(body)=>{
    console.log('Ver body: ',body);
    try{
        const response=await axios.post(`${BACKEND_URL}/auth/register`,body,{
            headers:{
                'Content-Type':'application/json',
            },
        });
        if(response.status===201){
            await SecureStore.setItemAsync('token',response.data.token);
            return getRoleBasedOnToken();
        }


    }catch(error){
        console.error('Register axios failed: ',error,body);
        throw error;
    }

}