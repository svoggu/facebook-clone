import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../..';
import * as fromUser from '../../reducers/user/user.reducer';

const userFeatureSelector = createFeatureSelector<AppState, fromUser.State>(fromUser.userFeatureKey);

export const usersSelector = createSelector(
  userFeatureSelector,
  (state) => state.users
);

export const selectedUserSelector = createSelector(
  userFeatureSelector,
  (state) => state.selectedUser
);

export const loggedUserSelector = createSelector(
  userFeatureSelector,
  (state) => state.loginUser
);

export const loginFailureSelector = createSelector(
  userFeatureSelector,
  (state) => state.loginFailMessage
);



