import axios from "axios"
import {message} from 'antd'



//For Login
export const userLogin=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING', payload:true})

    try {
        const response = await axios.post('/api/users/login', reqObj)
        // storing data into the local storage
        localStorage.setItem('user', JSON.stringify(response.data))  
        //Success Message
        message.success('Login Successfull')
        dispatch({type: 'LOADING', payload:false})
        setTimeout(() => {
            window.location.href='/'
        }, 500);
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
        const response = await axios.post('/api/users/register', reqObj)
        message.success('Registration Successfull')
        setTimeout(() => {
            window.location.href='/login'
        }, 500);
        dispatch({type: 'LOADING', payload:false})

    } catch (error) {
        console.log(error)
        //Failure Message
        message.error('Something went wrong')
        dispatch({type: 'LOADING', payload:false})
    }

}