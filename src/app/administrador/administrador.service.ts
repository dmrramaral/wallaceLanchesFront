import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sanduiche } from '../model/sanduiche';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  

  constructor(private http: HttpClient) { }

  listar(): Observable<Sanduiche[]> {
    return this.http.get<Sanduiche[]>(`${environment.administrador_api}/sanduiche`);
  }
}
