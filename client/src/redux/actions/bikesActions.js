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