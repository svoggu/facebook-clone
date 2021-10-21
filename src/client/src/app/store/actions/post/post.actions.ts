import { createAction, props } from '@ngrx/store';
import { Post } from '../../../../../../shared/models/post.model';

export const createPost = createAction(
  '[Post] Create Post',
  props<{data: Post}>()
);

export const createPostSuccess = createAction(
  '[Post] Create Post Success',
  props<{ data: Post }>()
);

export const createPostFailure = createAction(
  '[Post] Create Post Failure',
  props<{ error: Error }>()
);

export const loadPosts = createAction(
  '[Post] Load Posts'
);

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ data: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Post] Load Posts Failure',
  props<{ error: Error }>()
);

export const updatePost = createAction(
  '[Post] Update Post',
  props<{data: Post}>()
);

export const updatePostSuccess = createAction(
  '[Post] Update Post Success',
  props<{ data: Post }>()
);

export const updatePostFailure = createAction(
  '[Post] Update Post Failure',
  props<{ error: Error }>()
  );