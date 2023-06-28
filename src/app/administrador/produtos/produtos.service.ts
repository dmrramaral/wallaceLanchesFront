import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Ingredientes } from 'src/app/model/ingredientes';
import { Produto } from 'src/app/model/produto';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
 

  constructor(private httpClient : HttpClient) { }

  listar() : Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${environment.administrador_api}/produto`).pipe(take(1));
    
  }

  adicionar(produto: Produto): Observable<Produto[]> {
    return this.httpClient.post<Produto[]>(`${environment.administrador_api}/produto`, produto);
  }

  remover(produto: Produto): Observable<Produto[]> {
    return this.httpClient.delete<Produto[]>(`${environment.administrador_api}/produto/${produto.id}`).pipe(take(1));
  }

  listarIngredientes(): Observable<Ingredientes[]> {
    return this.httpClient.get<Ingredientes[]>(`${environment.administrador_api}/ingredientes`).pipe(take(1));
  }

}
