import { Action, createReducer, on } from '@ngrx/store';
import { Post } from '../../../../../../shared/models/post.model';
import { createPostSuccess, loadPostsSuccess } from '../../actions/post/post.actions';


export const postFeatureKey = 'post';

export interface State {

  posts: Post[];
}

export const initialState: State = {

  posts:[]
};


export const reducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, action): State => {
    return {...state,posts:action.data}
  }),
  on(createPostSuccess, (state, action) => {
    const posts = [...state.posts];
    posts.push(action.data);
    return {...state, posts}
  }),

);

