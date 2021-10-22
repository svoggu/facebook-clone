import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromUser from './store/reducers/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user/user.effects';
import { PageUsersComponent } from './pages/page-users/page-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
// import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './models/material.module';
// import { MatIconModule } from '@angular/material/icon';
import { HomeModule } from './components/home/home.module';
// import { PostsComponent } from './components/posts/posts.component';
import * as fromPost from './store/reducers/post/post.reducer';
import { PostEffects } from './store/effects/post/post.effects';


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserInputComponent,
    PageUsersComponent,
    RegisterComponent,
    LoginComponent,
    
   
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forRoot([UserEffects, PostEffects]),
    HomeModule,
    StoreModule.forFeature(fromPost.postFeatureKey, fromPost.reducer),
        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
