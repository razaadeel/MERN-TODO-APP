import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from '../constant';
import axios from 'axios';

export const getItems = () => dispatch => {
    axios.get('/api')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
}

export const addItem = data => dispatch => {
    axios.post('/api', data)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        
}

export const deleteItem = id => dispatch => {
    console.log(id)
    axios.delete('/api/' + id)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
}

export const editItem = (name, id) => dispatch => {
    axios.put('/api/' + id + "/" + name)
    .then(res => dispatch({
        type: EDIT_ITEM,
        payload: {name,id}
    }))
}
