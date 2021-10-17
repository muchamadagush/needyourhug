import { actionTypes } from "../constants/actionTypes"

const initialState = {
  profile: {},
  avatar: "https://images.macrumors.com/t/XjzsIpBxeGphVqiWDqCzjDgY4Ck=/800x0/article-new/2019/04/guest-user-250x250.jpg",
  error: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        profile: action.payload
      }
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case actionTypes.GET_USER:
      return {
        ...state,
        profile: action.payload
      }
    default:
      return state
  }
}

export default userReducer