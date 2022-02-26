const initialData = {
    bikes : []
};

export const bikesReducer = (state=initialData, action) => {
    switch(action.type)
    {
        case 'GET_ALL_BIKES' : {
            return{
                ...state,
                bikes : action.payload
            }
        }
        default: return state
    }
}