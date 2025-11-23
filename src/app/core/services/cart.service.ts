import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { 
  Cart, 
  AddToCartRequest, 
  UpdateCartQuantityRequest, 
  RemoveFromCartRequest,
  PayCartRequest 
} from '../../model/cart';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Busca o carrinho do usuário autenticado
   */
  buscarCarrinho(): Observable<Cart> {
    return this.httpClient.get<Cart>(`${environment.public_api}/cart/cart`)
      .pipe(take(1));
  }

  /**
   * Lista todos os carrinhos (apenas para admin)
   */
  listarTodos(page: number = 1, limit: number = 100): Observable<Cart[]> {
    return this.httpClient.get<any>(`${environment.public_api}/cart/carts?page=${page}&limit=${limit}`)
      .pipe(
        take(1),
        map(response => response.carts || response)
      );
  }

  /**
   * Adiciona produtos ao carrinho
   */
  adicionarProdutos(request: AddToCartRequest): Observable<Cart> {
    return this.httpClient.post<any>(`${environment.public_api}/cart/carts/products`, request)
      .pipe(
        take(1),
        map(response => response.cart || response)
      );
  }

  /**
   * Remove produto do carrinho
   */
  removerProduto(request: RemoveFromCartRequest): Observable<Cart | null> {
    return this.httpClient.request<any>('delete', `${environment.public_api}/cart/carts/products`, {
      body: request
    })
      .pipe(
        take(1),
        map(response => {
          // Pode retornar 204 se o carrinho foi deletado
          if (!response) return null;
          return response.cart || response;
        })
      );
  }

  /**
   * Atualiza a quantidade de um produto no carrinho
   */
  atualizarQuantidade(request: UpdateCartQuantityRequest): Observable<Cart> {
    return this.httpClient.put<any>(`${environment.public_api}/cart/carts/products`, request)
      .pipe(
        take(1),
        map(response => response.cart || response)
      );
  }

  /**
   * Realiza o pagamento do carrinho
   */
  realizarPagamento(request: PayCartRequest): Observable<Cart> {
    return this.httpClient.post<any>(`${environment.public_api}/cart/pay`, request)
      .pipe(
        take(1),
        map(response => response.cart || response)
      );
  }
}
