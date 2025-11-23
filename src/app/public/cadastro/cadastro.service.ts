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
    // Transform to backend format
    const userData = {
      name: cliente.nome || cliente.name,
      email: cliente.email,
      password: cliente.password,
      phone: cliente.telefone || cliente.phone,
      cpf: cliente.cpf
    };
    
    return this.httpClient.post<any>(`${environment.public_api}/auth/register`, userData).pipe(take(1));
  }
  
}
