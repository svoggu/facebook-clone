import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { AppState } from 'src/app/store';
import { createPost, loadPosts } from 'src/app/store/actions/post/post.actions';
import { logoutUser } from 'src/app/store/actions/user/user.actions';
import { postsSelector } from 'src/app/store/selectors/post/post.selectors';
import { Post } from '../../../../../shared/models/post.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: any[] = [
    'https://images-na.ssl-images-amazon.com/images/I/51DR2KzeGBL._AC_.jpg',
  'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
  'https://torange.biz/photofx/93/8/light-vivid-colors-fragment-love-background-rain-fall-cover-93412.jpg',
  'https://cdn.pixabay.com/photo/2017/07/18/18/24/dove-2516641_960_720.jpg',
  'https://c0.wallpaperflare.com/preview/956/761/225/5be97da101a3f.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9a/Swepac_FB_465%2C_RV70%2C_with_passing_lorry.jpg'
];
  // subs: Subscription[] = [];
  // posts: any[] = [];
//  user: UserData;
addPost: FormGroup;
  posts$: Observable<Post[]>;

  
  @Input() public posts: Post[] = [];
  @Input() public selectedPost: Post | null = null;



  constructor(private router: Router,
              private store: Store<AppState>,
              private fb: FormBuilder,
              private postService: PostService,
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

  goToUsers(){
    this.router.navigate(['/users']);
  }

  logout() {
    
    this.store.dispatch(logoutUser());
    
  }
  AddPost(){
    this.store.dispatch(createPost({ data: this.addPost.value }));
    this.addPost.reset();
  }
  
}
