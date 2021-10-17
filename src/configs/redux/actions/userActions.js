import backendApi from "../../api/backendApi";
import { actionTypes } from "../constants/actionTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const login = (data, history) => (dispatch) => {
  backendApi.post(`auth/login`, data)
    .then((res) => {
      const resultLogin = res.data.user
      dispatch({ type: actionTypes.LOGIN_USER, payload: resultLogin })
      localStorage.setItem('token', resultLogin.token)
      history.push('/')
    })
    .catch((err) => {
      dispatch({ type: actionTypes.LOGIN_ERROR, payload: err.response.data.message })
      toast.error(err.response.data.message, { position: toast.POSITION.TOP_RIGHT })
    })
}

export const getUser = () => (dispatch) => {
  backendApi.get('users/user', {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((res) => {
      const user = res.data.user[0]
      console.log(res.data.user)
      dispatch({ type: actionTypes.GET_USER, payload: user })
    })
}

export const register = (data, history) => (dispatch) => {
  backendApi.post(`auth/register`, data)
    .then((res) => {
      toast.success('Register success, verify your email now!', { position: toast.POSITION.TOP_RIGHT })
      setTimeout(() => {
        history.push('/login')
      }, 4500);
    })
    .catch((err) => {
      toast.error(err.response.data.message, { position: toast.POSITION.TOP_RIGHT })
    })
}