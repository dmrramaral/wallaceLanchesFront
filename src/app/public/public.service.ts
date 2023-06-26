import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Produto } from '../model/produto';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
  
})
export class PublicService {

  

  constructor(private httpClient : HttpClient) { }
  

  listar() : Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${environment.public_api}/produto`).pipe(take(1));;
    
  }

}
