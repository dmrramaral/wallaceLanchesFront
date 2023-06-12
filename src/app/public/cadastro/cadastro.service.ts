import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cliente } from 'src/app/model/cliente';
import { environment } from 'src/environments/environments';


@Injectable()
export class CadastroService {

  constructor( private httpClient : HttpClient) { }

  public cadastrar(cliente : Cliente) : Observable<any> {
    return this.httpClient.post<CadastroService>(`${environment.public_api}/cliente`, cliente).pipe(take(1));
}
  
}
