import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from '../../../../shared/models/post.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private api: ApiService
  ) { }

  // getAllPosts() {
  //   return this.api.get<Post[]>('posts')
  // }

  getPosts() {
    return this.api.get<{ data: Post[] }>('posts').pipe(map((res) => res.data));
  }
  createPost(post: Post) {
    return this.api
      .post<{ data: Post },Post>('create-post', post)
      .pipe(map((res) => res.data));
  }
}
