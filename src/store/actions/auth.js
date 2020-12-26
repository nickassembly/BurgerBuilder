import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDIC_AAhb5jBHHb-v23Ce3M_v3ZXk8H8oo';
		if (!isSignup) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDIC_AAhb5jBHHb-v23Ce3M_v3ZXk8H8oo';
		}
		axios
			.post(url, authData)
			.then((response) => {
				console.log(response);
				dispatch(authSuccess(response.data));
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFail(err));
			});
	};
};
