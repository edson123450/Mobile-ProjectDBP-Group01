import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import {jwtDecode} from 'jwt-decode'

//const BACKEND_URL='http://3.95.187.149:8080'
const BACKEND_URL = 'http://192.168.1.35:8080';

const dummyData = true;

export const getRoleBasedOnToken=async ()=>{
    if (dummyData){
        return 'ROLE_WORKER';
    } else {
        const token=await SecureStore.getItemAsync('token');
        const decodedToken=jwtDecode(token);
        return decodedToken.role;
    }
}

export const fetchLogin=async(body)=>{
    try{
        if (dummyData){
            return 'ROLE_WORKER';
        } else {
            const response=await axios.post(`${BACKEND_URL}/auth/login`,body, {
                headers:{
                    'Content-Type':'application/json',
                },
            });
            if(response.status===200){
                await SecureStore.setItemAsync('token',response.data.token);
                return getRoleBasedOnToken();
            }
        }
    }catch(error){
        console.error('Login axios failed: ',error);
        throw error;
    }

}

export const fetchRegister=async(body)=>{
    try{
        if (dummyData){
            return 'ROLE_WORKER';
        } else {
            const response=await axios.post(`${BACKEND_URL}/auth/register`,body,{
                headers:{
                    'Content-Type':'application/json',
                },
            });
            if(response.status===201){
                await SecureStore.setItemAsync('token',response.data.token);
                return getRoleBasedOnToken();
            }
        }
    } catch(error){
        console.error('Register axios failed: ',error,body);
        throw error;
    }
}

export const fetchPostService=async (body)=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        if (dummyData){
            return 201;
        } else {
            const response=await axios.post(`${BACKEND_URL}/servicio`,body,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json',
                },
            });
            if (response.status===201){
                return response.status;
            }
        }
    } catch(error) {
        console.error('fetchPostService failed: ',error);
        throw error;
    }
}

export const fetchGetWorkerMe=async()=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        if (dummyData){
            return {
                id: 1,
                firstname: 'Juan',
                lastname: 'Perez',
                age: 25,
                role: 'ROLE_WORKER',
                AverageRating: 4.5,
            };
        } else {
            const response=await axios.get(`${BACKEND_URL}/worker/me`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                },
            });
            if(response.status===200){
                return response.data;
            }
        }
    }catch(error){
        console.error('fetchGetWorkerMe axios failed: ',error);
        throw error;
    }
}

export const fetchGetClientMe=async()=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        if (dummyData){
            return {
                id: 1,
                firstname: 'Juan',
                lastname: 'Perez',
                age: 25,
                role: 'ROLE_CLIENT',
            };
        } else {
            const response=await axios.get(`${BACKEND_URL}/client/me`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                },
            });
            if(response.status===200){
                return response.data;
            }
        }
    }catch(error){
        console.error('fetchGetClientMe axios failed: ',error);
        throw error;
    }
}

export const fetchGetServices=async()=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        if (dummyData){
            return [
                {
                    id: 1,
                    name: 'Pintura de casa',
                    price: 100,
                    status: 'DISPONIBLE',
                },
                {
                    id: 2,
                    name: 'Corte de cabello',
                    price: 10,
                    status: 'DISPONIBLE',
                },
                {
                    id: 3,
                    name: 'Reparación de computadoras',
                    price: 50,
                    status: 'DISPONIBLE',
                },
            ];
        } else {
            const response=await axios.get(`${BACKEND_URL}/servicio`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                },
            });
            if(response.status===200){
                return response.data;
            }
        }
    }catch(error){
        console.error('fetchGetServices axios failed: ',error);
        throw error;
    }
}

export const fetchGetServiceById=async(id)=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        if (dummyData){
            return {
                id: 1,
                name: 'Pintura de casa',
                description: 'Pintura de casa de 2 pisos con 3 habitaciones',
                price: 100,
                status: 'DISPONIBLE',
                distritos_atiende: [
                    {
                        id: 1,
                        name: 'San Miguel',
                    },
                    {
                        id: 2,
                        name: 'Magdalena',
                    },
                ],
            };
        } else {
            const response=await axios.get(`${BACKEND_URL}/servicio/${id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                },
            });
            if(response.status===200){
                return response.data;
            }
        }
    }
    catch(error){
        console.error('fetchGetServiceById axios failed: ',error);
        throw error;
    }
}

export const fetchRequestService=async(id)=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        if (dummyData){
            return 200;
        } else {
            const response=await axios.post(`${BACKEND_URL}/servicio/${id}/solicitar`,null,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                },
            });
            return response.status;
        }
    }
    catch(error){
        console.error('fetchRequestService axios failed: ',error);
        throw error;
    }
}

export const fetchGetWorkerServices=async()=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        if (dummyData){
            return [
                {
                    id: 1,
                    name: 'Pintura de casa',
                    description: 'Pintura de casa de 2 pisos con 3 habitaciones',
                    price: 100,
                    status: 'DISPONIBLE',
                    distritos_atiende: [
                        {
                            id: 1,
                            name: 'San Miguel',
                        },
                        {
                            id: 2,
                            name: 'Magdalena',
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Corte de cabello',
                    description: 'Corte de cabello de hombre',
                    price: 10,
                    status: 'DISPONIBLE',
                    distritos_atiende: [
                        {
                            id: 1,
                            name: 'San Miguel',
                        },
                        {
                            id: 2,
                            name: 'Magdalena',
                        },
                    ],
                },
                {
                    id: 3,
                    name: 'Reparación de computadoras',
                    description: 'Reparación de computadoras de escritorio',
                    price: 50,
                    status: 'DISPONIBLE',
                    distritos_atiende: [
                        {
                            id: 1,
                            name: 'San Miguel',
                        },
                        {
                            id: 2,
                            name: 'Magdalena',
                        },
                    ],
                },
            ];
        } else {
            const response=await axios.get(`${BACKEND_URL}/worker/servicio`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                },
            });
            if(response.status===200){
                return response.data;
            }
        }
    }
    catch(error){
        console.error('fetchGetWorkerServices axios failed: ',error);
        throw error;
    }
}

export const fetchUpdateService=async(id,body)=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        if (dummyData){
            return 200;
        } else {
            const response=await axios.put(`${BACKEND_URL}/servicio/${id}`,body,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json',
                },
            });
            return response.status;
        }
    }
    catch(error){
        console.error('fetchUpdateService axios failed: ',error);
        throw error;
    }
}

export const fetchDeleteService=async(id)=>{
    const token=await SecureStore.getItemAsync('token');
    try{
        if (dummyData){
            return 204;
        } else {
            const response=await axios.delete(`${BACKEND_URL}/servicio/${id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`,
                },
            });
            return response.status;
        }
    }
    catch(error){
        console.error('fetchDeleteService axios failed: ',error);
        throw error;
    }
}
