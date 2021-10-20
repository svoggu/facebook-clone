import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { FbGuardGuard } from './guards/fbguard.guard';
import { PostsComponent } from './components/posts/posts.component';


const routes: Routes = [
  {
    path: '', 
    // redirectTo: 'login',
    component: LoginComponent,
  },
  {
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'users', 
    component: PageUsersComponent,
  },
  {
    path: 'register', 
    component: RegisterComponent,
  },
  
  {
    path: 'home', 
    component: HomeComponent,canActivate: [FbGuardGuard]
  },

  {
    path: 'posts', 
    component: PostsComponent,
  },
  
];

@NgModule({
  imports: [
    CommonModule,
  RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
