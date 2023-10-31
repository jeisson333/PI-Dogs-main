import { GET_TEMPERAMENT,GET_DOGS, PAGINATE, FILTER,ORDER,GET_DOG_NAME} from './action-types';
import axios from 'axios';

export const getTemperament = () => {
    return async (dispatch) =>{
        try {
            const response = await axios.get('http://localhost:3001/temperament');
            dispatch({
                type: GET_TEMPERAMENT,
                payload: response.data
            })
        } catch (error) {
            
        }
    }
}

export const postDog = (state) =>{
    return async (dispatch) =>{
        try {
            await axios.post("http://localhost:3001/dogs", state)
            alert("Raza creada con exito!")
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export const getDogs = () =>{
    return async (dispatch) =>{
        try {
            const response = await axios.get('http://localhost:3001/dogs');
            dispatch({
                type: GET_DOGS,
                payload: response.data
            })
        } catch (error) {
            alert(error)
        }
    }
}
export const paginateDogs = (order) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: PAGINATE,
                payload: order
            })
        } catch (error) {
            alert(error)
        }

    }
}
export const filterTemperamentAction = (t) => {
    
    return async (dispatch) => {
        try {
            dispatch({
                type: FILTER,
                payload: t
            })
        } catch (error) {
            alert(error)
        }

    }
}
export const orderDogsAction = (order ) => {
    return async (dispatch) => {
        
        try {
            dispatch({
                type: ORDER,
                payload: order
            })
        } catch (error) {
            alert(error.response.data.error)
        }

    }
}
export const getDogsName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            dispatch({
                type: GET_DOG_NAME,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data.error)
        }

    }
}