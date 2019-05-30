import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import{
ListColumn
} from '../app/ModelClass';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private httpservice: HttpClient
  ) {}
  
  GetListBlotter(): Observable < ListColumn[] > {
    return this.httpservice
      .get < ListColumn[] > ('https://restsimulator.intuhire.com/orders');
  };
}
