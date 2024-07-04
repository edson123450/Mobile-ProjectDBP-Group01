import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import {jwtDecode} from 'jwt-decode'

//const BACKEND_URL='http://3.95.187.149:8080'
const BACKEND_URL = 'http://192.168.1.35:8080';


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

export const fetchPostService=async (body)=>{
    const token=await SecureStore.getItemAsync('token');
    try{

        const response=await axios.post(`${BACKEND_URL}/servicio`,body,{
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json',
            },
        });
        if (response.status===201){
            return response.status;
        }
    }catch(error){
        console.error('fetchPostService failed: ',error);
        throw error;
    }
}

export const fetchGetWorkerMe=async()=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        const response=await axios.get(`${BACKEND_URL}/worker/me`,{
            headers:{
                'Authorization':`Bearer ${token}`,
            },
        });
        if(response.status===200){
            return response.data;
        }
    }catch(error){
        console.error('fetchGetWorkerMe axios failed: ',error);
        throw error;
    }
}

export const fetchGetClientMe=async()=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        const response=await axios.get(`${BACKEND_URL}/client/me`,{
            headers:{
                'Authorization':`Bearer ${token}`,
            },
        });
        if(response.status===200){
            return response.data;
        }
    }
    catch(error){
        console.error('fetchGetClientMe axios failed: ',error);
        throw error;
    }
}