import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AppState } from 'src/app/store';
import { loginUser } from 'src/app/store/actions/user/user.actions';
import { selectedUserSelector, usersSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';
import { RegisterComponent } from '../register/register.component';

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

  constructor(private fb: FormBuilder, 
              private store: Store<AppState>,
              private router:Router,
              private matDialog: MatDialog,
              private apiService: ApiService,
              public dialogRef: MatDialogRef<RegisterComponent>)
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
      this.loginForm.reset();
      // this.router.navigate(['users'])
    }

    // openRegister() {
    //    this.router.navigate(['register']);
    // }

    openRegister(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      const dialogRef = this.matDialog.open(RegisterComponent, 
       dialogConfig);

      
    }
  }
