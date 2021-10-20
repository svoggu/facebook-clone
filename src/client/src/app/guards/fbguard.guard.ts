import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
// import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class FbGuardGuard implements CanActivate {
  constructor(private router: Router,
              private apiService: ApiService,
              ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.apiService.get<{message: string}>
    ('check-login').pipe( map((data) => 
    data.message === 'yes')).pipe(catchError(err => of(false)))
    }

}
    