import { message } from 'antd';
import axios from 'axios';


export const getAllBikes = () => async dispatch =>{

    dispatch({type: 'LOADING', payload:true})

    try {
        const response = await axios.get('/api/bikes/getallbikes')
        dispatch({type: 'GET_ALL_BIKES', payload:response.data})
        dispatch({type: 'LOADING', payload:false})
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }

}

export const addBike = (reqObj) => async dispatch => {

    dispatch({type: 'LOADING', payload:true})

    try {
        await axios.post('/api/bikes/addbike', reqObj)
        
        dispatch({type: 'LOADING', payload:false})
        message.success('New Bike Added Successfully')
        setTimeout(() => {
            window.location.href='/'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }


}