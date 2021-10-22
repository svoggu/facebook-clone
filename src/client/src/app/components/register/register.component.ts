import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { createUser, updateUser } from 'src/app/store/actions/user/user.actions';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  addUser: FormGroup;
  selectedUser: User | null = null;
constructor(private fb: FormBuilder, private store: Store<AppState>,private router:Router,
  public dialogRef: MatDialogRef<RegisterComponent>){
  this.addUser = this.fb.group({
    firstname: ['', Validators.required],
    email: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    lastname: [
      '',
      Validators.compose([Validators.required, Validators.minLength(1)]),
    ],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(5)]),
    ],
  });

}

  ngOnInit(): void {}

  postUser(selectedUser: User | null) {
    !selectedUser
      ? this.store.dispatch(createUser({ data: this.addUser.value }))
      : this.store.dispatch(
          updateUser({ data: { ...selectedUser, ...this.addUser.value } })
        );
    this.addUser.reset();
    // this.router.navigate(['login']);
  }

}
