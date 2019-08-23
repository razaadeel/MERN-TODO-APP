import axios from 'axios';
import { returnErrors } from './errorAction'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../constant';

//Check token && Load User

export const loadUser = () => (dispatch, getState) => {
    //User Loading
    dispatch({
        type: USER_LOADING
    });

    axios.get('/api/auth/user', tokenConfig(getState)) //tokenConfig is a function which is created below
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}


export const register = ({ name, email, password }) => dispatch => {
    dispatch({
        type: USER_LOADING
    });

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({ name, email, password })

    axios.post('./api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL,
            })
        })
}

export const login = ({email, password }) => dispatch => {
    dispatch({
        type: USER_LOADING
    });

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({ email, password })

    axios.post('./api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL,
            })
        })
}

//Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}


//Setup configration/headers and token
export const tokenConfig = getState => {
    //get token from loacl storage
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
    }

    return config
}