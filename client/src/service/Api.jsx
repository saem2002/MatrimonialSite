import axios from 'axios';


export const url = 'http://localhost:9000';



export const register = async (data) => {
    try {
        
        let response = await axios.post(`${url}/register`, data);
        return response;
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}
export const signin = async (data) => {
    try {
        
        let response = await axios.post(`${url}/signin`, data);
        localStorage.setItem('matrimonialLoginToken', JSON.stringify(response.data.token))
        return response.status;
    } catch (error) {
        return error.response.status
    }
}




export const getUsers = async () => {
    try {
        let response = await axios.get(`${url}/users`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const noofusers = async () => {
    try {
        let response = await axios.get(`${url}/noofusers`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const sendRequestTouser = async () => {
    try {
        let response = await axios.post(`${url}/send`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}


export const getsubcategory = async (age,gender,religion,currGender) => {
    try {
        let response = await axios.get(`${url}/getsubcategory/${age}/${gender}/${religion}/${currGender}`);
        console.log(response)
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const finduser = async (token) => {
    try {
        let response = await axios.get(`${url}/${token}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const updateuser = async (data,id) => {
    try {
        let response = await axios.patch(`${url}/updateuser/${id}`,data);
        return response
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const blockthisuser = async (email) => {
    try {
        let response = await axios.patch(`${url}/blockuser/${email}`);
        return response
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}


