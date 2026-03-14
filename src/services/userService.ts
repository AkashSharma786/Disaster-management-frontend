import axios from "axios";

export async function getAllUsers(){

    try{
        const response = await axios.get("http://localhost:8080/admin/users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        return response.data;
    }
    catch(e){
        console.log("Error occured while fetching users");
    }
}

export async function getResidents(){

    try{
        const response = await axios.get("http://localhost:8080/admin/residents", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        return response.data;
    }
    catch(e){
        console.log("Error occured while fetching Residents");
    }
}

export async function getResponders(){

    try{
        const response = await axios.get("http://localhost:8080/admin/responders", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        return response.data;
    }
    catch(e){
        console.log("Error occured while fetching Responders");
    }
}

export async function getAdmins(){

    try{
        const response = await axios.get("http://localhost:8080/admin/admins", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        return response.data;
    }
    catch(e){
        console.log("Error occured while fetching Responders");
    }
}

