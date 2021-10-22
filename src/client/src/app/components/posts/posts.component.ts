import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { AppState } from 'src/app/store';
import { createPost, loadPosts, updatePost } from 'src/app/store/actions/post/post.actions';
import { postsSelector } from 'src/app/store/selectors/post/post.selectors';

import { Post } from '../../../../../shared/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{

  addPost: FormGroup;
  posts$: Observable<Post[]>;

  
  @Input() public posts: Post[] = [];
  @Input() public selectedPost: Post | null = null;


  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private postService: PostService,
             private router: Router,
             ) { 
    
    this.posts$ = this.store.select(postsSelector);

    this.addPost = this.fb.group({

      // title: ['', Validators.required],
      message: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
   }

  // ngOnChanges(changes: SimpleChanges) {

  //   if (changes?.selectedUser?.currentValue) {
  //     const post = changes?.selectedPost?.currentValue;
      // this.addPost.get('title')?.setValue(post.title);
      // this.addPost.get('message')?.setValue(post.message);
      
      // this.addPost.updateValueAndValidity();
    // }
  // }

  // postPost(selectedPost: Post | null) {
    // !selectedPost
  //     ? this.store.dispatch(createPost({ data: this.addPost.value }))
  //     : this.store.dispatch(
  //         updatePost({ data: { ...selectedPost, ...this.addPost.value } })
  //       );
  //   this.addPost.reset();
  // }
  AddPost(){
    this.store.dispatch(createPost({ data: this.addPost.value }));
    this.addPost.reset();
  }


}
