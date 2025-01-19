import axios, { AxiosResponse } from "axios"
import { api, API_BASE_URL } from "../../Config/api";
import { FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "./ActionType";
import { loginResponse, userSchema } from "../../Config/types";


export const loginUser = (loginData : {
    email : string;
    password : string;

}) => async(dispatch : any) => {
    try {
        const response : AxiosResponse<loginResponse> = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
        
        if(response.data.jwt){
            localStorage.setItem("jwt", response.data.jwt);
        }

        dispatch({type : LOGIN_USER_SUCCESS, payload:response.data.jwt})
    } catch (error : any){
        console.log(error);
        dispatch({type: LOGIN_USER_FAILURE, payload: error.message})
    }
}

export const registerUser = (registerData : any) => async(dispatch : any) => {
    try {
        const response : AxiosResponse<loginResponse> = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
        console.log("Signup user : ", response.data);

        if(response.data.jwt){
            localStorage.setItem("jwt", response.data.jwt);
        }

        dispatch({type : REGISTER_USER_SUCCESS, payload: response.data.jwt})
    } catch (error : any){
        console.log(error);
        dispatch({type: REGISTER_USER_FAILURE, payload: error.message})
    }
}

export const getUserProfile = (jwt : string) => async(dispatch : any) => {
    try {
        const response : AxiosResponse<userSchema> = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers:{
                "Authorization" : `Bearer ${jwt}`
            }
        });

        console.log(response.data);
        
        dispatch({type : GET_USER_PROFILE_SUCCESS, payload:response.data})
    } catch (error : any){
        console.log(error);
        dispatch({type: GET_USER_PROFILE_FAILURE, payload: error.message})
    }
}

export const findUserById = (userId : string) => async(dispatch : any) => {
    try {
        const {data} = await api.get(`/api/users/${userId}`);
        console.log("Find user by ID", data);
        
        dispatch({type : FIND_USER_BY_ID_SUCCESS, payload:data})
    } catch (error : any){
        console.log(error);
        dispatch({type: FIND_USER_BY_ID_FAILURE, payload: error.message})
    }
}

export const updateUserProfile = (reqData : any) => async(dispatch : any) => {
    try {
        const response : AxiosResponse<userSchema> = await api.put(`/api/users/update`, reqData);
        console.log("Updated user : ", response.data);
        
        dispatch({type : UPDATE_USER_SUCCESS, payload:response.data})
    } catch (error : any){
        console.log(error);
        dispatch({type: UPDATE_USER_FAILURE, payload: error.message})
    }
}

export const followUserAction = (userId : string) => async(dispatch : any) => {
    try {
        const response : AxiosResponse<userSchema> = await api.put(`/api/users/${userId}/follow`);
        console.log("Followed user : ", response.data);
        
        dispatch({type : FOLLOW_USER_SUCCESS, payload:response.data})
    } catch (error : any){
        console.log(error);
        dispatch({type: FOLLOW_USER_FAILURE, payload: error.message})
    }
}

export const logout = () => async(dispatch : any) => {
  
        localStorage.removeItem("jwt");

        dispatch({type : LOGOUT, payload:{}})
  
}