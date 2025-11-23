import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Produto } from '../model/produto';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
  
})
export class PublicService {

  

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

}
