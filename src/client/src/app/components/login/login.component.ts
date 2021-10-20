import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loginUser } from 'src/app/store/actions/user/user.actions';
import { selectedUserSelector, usersSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  users$: Observable<User[]>;
  selectedUser$: Observable<User | null>;
  loginForm: FormGroup;
  @Input() selectedUser: User | null = null;

  constructor(private fb: FormBuilder, private store: Store<AppState>,private router:Router)
   { 
    this.users$ = this.store.select(usersSelector);
    this.selectedUser$ = this.store.select(selectedUserSelector);
    this.loginForm = this.fb.group({
      
      email: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  

  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.selectedUser?.currentValue) {
      const user = changes?.selectedUser?.currentValue;
      
      this.loginForm.get('email')?.setValue(user.email);
      
      this.loginForm.updateValueAndValidity();
    }
    }

    login() {
      this.store.dispatch(loginUser({ data: this.loginForm.value }));
      // this.router.navigate(['users'])
    }

    openRegister() {
       this.router.navigate(['register']);
    }
}
