import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Sanduiche } from 'src/app/model/sanduiche';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SanduicheService {

  constructor(private httpClient : HttpClient ) { }

  listar(): Observable<Sanduiche[]>{
    return this.httpClient.get<Sanduiche[]>(`${environment.public_api}/sanduiche`).pipe(take(1));

  }

}
