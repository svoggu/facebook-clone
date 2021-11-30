import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';
import { createUserSuccess, deleteUserSuccess, loadUsers, loadUsersSuccess, loginUserFailure, loginUserSuccess, logoutUserFailure, logoutUserSuccess, selectUserAction, updateUserSuccess } from '../../actions/user/user.actions';


export const userFeatureKey = 'user';

export interface State {
  users: User[];
  selectedUser: User | null;
  loginFailMessage: string;
  loginUser: User | null;

}

export const initialState: State = {
  users: [],
  selectedUser: null,
  loginFailMessage: '',
  // loginUser: null,
  loginUser: JSON.parse(localStorage.getItem('Token') || '{}')
};


export const reducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, action) => {
    return { ...state, users: action.data }
  }),
  on(selectUserAction, (state, action) => {
    return { ...state, selectedUser: action.data }
  }),
  on(updateUserSuccess, (state, action) => {
    return {...state, users: state.users.map(user => user._id === action.data._id ? action.data : user)}
  }),
  on(deleteUserSuccess, (state, action) => {
    return {...state, users: state.users.filter(user => user._id !== action.data._id)}
  }),
  on(createUserSuccess, (state, action) => {
    const users = [...state.users];
    users.push(action.data);
    return {...state, users}
  }),

  on(loginUserSuccess, (state, action) => {
    localStorage.setItem('Token', JSON.stringify(action.data));
    return {...state, loginUser: action.data, loginFailMessage:''}
  
  }),

  on(loginUserFailure, (state, action) => {
    return {...state, loginFailMessage:action.error.message }
  }),

  on(logoutUserSuccess, (state, action) => {
    return {...state, loginUser: null}
  })
  
);

