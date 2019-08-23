import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from '../constant';
import axios from 'axios';
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction';

export const getItems = () => dispatch => {
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )

}

export const addItem = data => (dispatch, getState) => {
    axios.post('/api/items', data, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const deleteItem = id => (dispatch, getState) => {
    axios.delete('/api/items/' + id, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const editItem = (name, id) => (dispatch, getState) => {


    const token = getState().auth.token; //it will search token in auth reducer.
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //if token, add to Headers
    if (token) {
        config.headers['x-auth-token'] = token;

        console.log(config)
        axios.put(`/api/items/${id}/${name}`, config)
            .then(res => dispatch({
                type: EDIT_ITEM,
                payload: { name, id }
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
            }
            )
    }
}