import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { createPost, createPostFailure, createPostSuccess, loadPosts, loadPostsFailure, loadPostsSuccess } from '../../actions/post/post.actions';



@Injectable()
export class PostEffects {

  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(loadPosts),
    mergeMap(() => this.postService.getPosts()
    .pipe(
    map(data => (loadPostsSuccess({data}))),
    catchError((error: Error) => {
      console.log('error getting posts')
    return of(loadPostsFailure({error}))
  })
    ))
    )
    ); 

    createPostss$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      mergeMap((action) =>
        this.postService.createPost(action.data).pipe(
          map((data) => createPostSuccess({ data })),
          catchError((error) => of(createPostFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions,
              private postService: PostService) {}

}
