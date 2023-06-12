import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Sanduiche } from '../model/sanduiche';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  

  constructor(private httpClient : HttpClient) { }

  listar() : Observable<Sanduiche[]> {
    return this.httpClient.get<Sanduiche[]>(`${environment.public_api}/sanduiche`).pipe(take(1));;
    
  }

}
