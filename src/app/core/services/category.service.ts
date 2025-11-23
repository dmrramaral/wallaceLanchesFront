import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Category } from '../model/category';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Lista todas as categorias
   */
  listar(page: number = 1, limit: number = 100): Observable<Category[]> {
    return this.httpClient.get<any>(`${environment.public_api}/category/categories?page=${page}&limit=${limit}`)
      .pipe(
        take(1),
        map(response => {
          // Backend returns { categories: [...], totalPages, currentPage, totalCategories }
          return response.categories || response;
        })
      );
  }

  /**
   * Busca uma categoria por ID
   */
  buscarPorId(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`${environment.public_api}/category/categories/${id}`)
      .pipe(take(1));
  }

  /**
   * Cria uma nova categoria (requer autenticação de admin)
   */
  criar(category: { name: string; description?: string }): Observable<Category> {
    return this.httpClient.post<any>(`${environment.public_api}/category/categories`, category)
      .pipe(
        take(1),
        map(response => response.category || response)
      );
  }

  /**
   * Atualiza uma categoria existente (requer autenticação de admin)
   */
  atualizar(id: string, category: { name: string; description?: string }): Observable<Category> {
    return this.httpClient.put<any>(`${environment.public_api}/category/categories/${id}`, category)
      .pipe(
        take(1),
        map(response => response.category || response)
      );
  }

  /**
   * Deleta uma categoria (requer autenticação de admin)
   */
  deletar(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.public_api}/category/categories/${id}`)
      .pipe(take(1));
  }
}
