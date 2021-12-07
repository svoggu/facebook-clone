import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string){
    if (value.length === 0 || filterString === ''){
    return value;
  }

  const users = [];
  for (const user of value) {
    console.log(user);
    if (user.firstname.includes(filterString) ||
        user.email.includes(filterString)){
    
     users.push(user);
    }
  }
return users;
}
}