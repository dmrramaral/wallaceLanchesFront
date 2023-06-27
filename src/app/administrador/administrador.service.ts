import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Produto } from '../model/produto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  

  constructor(private httpClient: HttpClient) { }

  listar() : Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${environment.public_api}/produto`).pipe(take(1));
    
  }

  adicionar(): Observable<Produto[]> {
    return this.httpClient.post<Produto[]>(`${environment.administrador_api}/produto`, {});
  }

  remover(id: Number): Observable<Produto[]> {
    return this.httpClient.delete<Produto[]>(`${environment.administrador_api}/produto/${id}`).pipe(take(1));
  }
}
