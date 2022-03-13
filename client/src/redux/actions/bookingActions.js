import axios from 'axios';
import { message } from 'antd';


export const bookBike = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/booking/bookcar')

        dispatch({ type: 'LOADING', payload: false })
        message.success('Your Bike Booked Successfully')
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
        message.error('Somethig went wrong, Please try later')
    }

}