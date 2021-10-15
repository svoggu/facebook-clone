// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map, tap } from 'rxjs/operators';
// import { ApiService } from '../services/api.service';
// import { UserService } from '../services/user.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class FbguardGuard implements CanActivate {
//   constructor(private router: Router,
//               private apiService: ApiService,
//               ){

//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.apiService.users
//     .pipe(
//       map(user => user ! == null),
//       tap(value => {
//         if(!value) {
//           this.router.navigate(['login']).then();
//           return value;
//         } else {
//           return value;
//         }
//       })
//     );
//   }
  
// }
