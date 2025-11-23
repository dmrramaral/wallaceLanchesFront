import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Order, UpdateOrderStatusRequest } from '../model/order';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Cria um pedido a partir do carrinho atual
   */
  criarPedidoDoCarrinho(): Observable<Order> {
    return this.httpClient.post<any>(`${environment.public_api}/order/from-cart`, {})
      .pipe(
        take(1),
        map(response => response.order || response)
      );
  }

  /**
   * Lista os pedidos do usuário autenticado
   */
  listarMeusPedidos(page: number = 1, limit: number = 100): Observable<Order[]> {
    return this.httpClient.get<any>(`${environment.public_api}/order/my?page=${page}&limit=${limit}`)
      .pipe(
        take(1),
        map(response => response.orders || response)
      );
  }

  /**
   * Busca um pedido específico por ID
   */
  buscarPorId(id: string): Observable<Order> {
    return this.httpClient.get<Order>(`${environment.public_api}/order/my/${id}`)
      .pipe(take(1));
  }

  /**
   * Lista todos os pedidos (apenas para admin)
   */
  listarTodos(page: number = 1, limit: number = 100): Observable<Order[]> {
    return this.httpClient.get<any>(`${environment.public_api}/order/all?page=${page}&limit=${limit}`)
      .pipe(
        take(1),
        map(response => response.orders || response)
      );
  }

  /**
   * Atualiza o status de um pedido (apenas para admin)
   */
  atualizarStatus(id: string, request: UpdateOrderStatusRequest): Observable<Order> {
    return this.httpClient.put<any>(`${environment.public_api}/order/${id}/status`, request)
      .pipe(
        take(1),
        map(response => response.order || response)
      );
  }

  /**
   * Deleta um pedido (apenas para admin)
   */
  deletar(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.public_api}/order/${id}`)
      .pipe(take(1));
  }
}
