import { document } from "../data/document";

export const fetchAllTemplates = () => {
    return async (dispatch) => {
        // const response = await tours.get('/');
        const response = document;
        console.log(response.data);

        dispatch({ type: 'FETCH_ALL_TEMPLATES', payload: response })
    }
};

export const createTemplate = (data) => {
    return { type: 'CREATE_TEMPLATE', payload: data }
};

/*
import { tours, users, auth } from '../apis/tours';
import cookie from "js-cookie";
import {setCookie, setLocalStorage} from "../auth/helpers";

export const fetchAllTours = () => {
    return async (dispatch) => {
        const response = await tours.get('/');

        dispatch({ type: 'FETCH_ALL_TOURS', payload: response.data })
    }
};

export const fetchTour = (id) => {
    return async (dispatch) => {
        const response = await tours.get(`/${id}`);

        dispatch({ type: 'FETCH_TOUR', payload: response.data })
    }
};

export const createTour = (data) => {
    return async (dispatch, getState) => {
        const response = await tours.post('/', {...data});

        dispatch({ type: 'CREATE_TOUR', payload: response.data });
    }
};

export const editTour = (id, data) => {
    return async (dispatch) => {
        const response = await tours.patch(`/${id}`, data);

        dispatch({ type: 'EDIT_TOUR', payload: response.data });
    }
};

export const deleteTour = (id) => {
    return async (dispatch) => {
        const response = await tours.delete(`/${id}`);

        dispatch({ type: 'DELETE_DEFECT', payload: id })
    }
};

export const fetchAllUsers = () => {
    return async(dispatch) => {
        const response = await users.get('/');

        dispatch({ type: 'FETCH_ALL_USERS', payload: response.data })
    }
};

export const userLogin = (email, password) => {
    return async (dispatch) => {
        const response = await users.post('/login', {"email": email, "password": password});

        // export const authenticate = (response, next) => {
        //     console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
        //     setCookie('token', response.data.token);
        //     setLocalStorage('user', response.data.user);
        //     next();
        // };


        //send the user a cookie with the token
        cookie.set("token", response.data.token, {
            expires: 1
        });

        //set the user data in storage to persist their login
        localStorage.setItem('user', JSON.stringify(response.data.data.user));

        dispatch({ type: 'LOGIN', payload: response.data })
    }
};

export const userUpdateMe = (requestedData) => {
    return async (dispatch) => {

        const formData = new FormData();

        if(requestedData.name) {
            // dataToBeSent["name"] = requestedData.name;
            formData.append("name", requestedData.name);
        }

        if(requestedData.email) {
            formData.append("email", requestedData.email);
        }

        if(requestedData.photo) {
            // dataToBeSent["photo"] = requestedData.photo;
            formData.append("photo", requestedData.photo);
        }


        const response = await auth.patch('/updateMe', formData);

        // if the response was successfull then we need to get user data from localStorage
        // convert it from JSON into a javascript object

        // new user data
        // response.data.data.user

        if(response.data.status === 'success'){
            // Old local storage user object
            const userStorage = JSON.parse(localStorage.getItem('user'));

            // Create new local storage object overriding the old values with the new values
            const newUserStorage = { ...userStorage, ...response.data.data.user };

            // Save the new updated local storage object
            localStorage.setItem('user', JSON.stringify(newUserStorage));
        }


        dispatch({ type: 'EDIT_USER_DATA', payload: response.data })
    }
};
 */