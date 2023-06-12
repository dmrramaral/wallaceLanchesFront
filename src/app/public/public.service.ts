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

  private readonly API = `http://ec2-18-231-74-81.sa-east-1.compute.amazonaws.com:8080/api/sanduiche`;

  listar() : Observable<Sanduiche[]> {
    return this.httpClient.get<Sanduiche[]>(this.API).pipe(take(1));;
    
  }

}
