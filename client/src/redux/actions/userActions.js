import axios from "axios"
import {message} from 'antd'



//For Login
export const userLogin=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING', payload:true})

    try {
        const response = await axios.post('/api/user/login', reqObj)
        // storing data into the local storage
        localStorage.setItem('user', JSON.stringify(response.data))  
        //Success Message
        message.success('Login Successfull')
        dispatch({type: 'LOADING', payload:false})
    } catch (error) {
        console.log(error)
        //Failure Message
        message.error('Something went wrong')
        dispatch({type: 'LOADING', payload:false})
    }

}



//For Register
export const userRegister=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING', payload:true})

    try {
        const response = await axios.post('/api/user/login', reqObj)
        dispatch({type: 'LOADING', payload:false})
        //Success Message
        message.success('Registration Successfull')
    } catch (error) {
        console.log(error)
        //Failure Message
        message.error('Something went wrong')
        dispatch({type: 'LOADING', payload:false})
    }

}