import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sanduiche } from '../model/sanduiche';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private readonly API = '/api';

  constructor(private httpClient : HttpClient) { }

  listar() : Observable<Sanduiche[]> {
    return this.httpClient.get<Sanduiche[]>(this.API+"/sanduiche");
    
  }

}
