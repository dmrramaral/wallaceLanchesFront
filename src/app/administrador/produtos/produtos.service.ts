import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, map } from 'rxjs';
import { Ingredientes } from 'src/app/model/ingredientes';
import { Produto } from 'src/app/model/produto';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
 

  constructor(private httpClient : HttpClient) { }

  listar(page: number = 1, limit: number = 100) : Observable<Produto[]> {
    return this.httpClient.get<any>(`${environment.public_api}/product/products?page=${page}&limit=${limit}`)
      .pipe(
        take(1),
        map(response => {
          // Backend returns { products: [...], totalPages, currentPage, totalProducts }
          return response.products || response;
        })
      );
  }

  adicionar(produto: Produto): Observable<Produto> {
    // Transform frontend model to backend model
    const backendProduct = {
      name: produto.nome || produto.name,
      description: produto.descricao || produto.description,
      price: produto.valor || produto.price,
      category: produto.category || produto.categoria,
      imageUrl: produto.imageUrl,
      ingredients: produto.ingredients || [],
      isAvailable: produto.isAvailable !== undefined ? produto.isAvailable : true,
      discount: produto.discount || 0
    };
    
    return this.httpClient.post<any>(`${environment.public_api}/product/products`, backendProduct)
      .pipe(
        take(1),
        map(response => response.product || response)
      );
  }

  remover(produto: Produto): Observable<any> {
    const id = produto._id || produto.id;
    return this.httpClient.delete(`${environment.public_api}/product/products/${id}`).pipe(take(1));
  }

  atualizar(produto: Produto): Observable<Produto> {
    const id = produto._id || produto.id;
    
    // Transform frontend model to backend model
    const backendProduct = {
      name: produto.nome || produto.name,
      description: produto.descricao || produto.description,
      price: produto.valor || produto.price,
      category: produto.category || produto.categoria,
      imageUrl: produto.imageUrl,
      ingredients: produto.ingredients || [],
      isAvailable: produto.isAvailable !== undefined ? produto.isAvailable : true,
      discount: produto.discount || 0
    };
    
    return this.httpClient.put<any>(`${environment.public_api}/product/products/${id}`, backendProduct)
      .pipe(
        take(1),
        map(response => response.product || response)
      );
  }

  buscarPorId(id: string | number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${environment.public_api}/product/products/${id}`).pipe(take(1));
  }

  listarIngredientes(): Observable<Ingredientes[]> {
    // This endpoint doesn't exist in the backend documentation
    // For now, keep the old endpoint or return empty array
    return this.httpClient.get<Ingredientes[]>(`${environment.administrador_api}/ingredientes`).pipe(take(1));
  }

}
