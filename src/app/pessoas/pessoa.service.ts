import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class PessoaFiltro {
  nome!: string;
  page: number = 0;
  itemsPerPage: number = 5;
}

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    params = params.set('page', filtro.page);
    params = params.set('size', filtro.itemsPerPage);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(this.pessoasUrl, { headers, params });
  }

  listarTodos(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http.get(`${this.pessoasUrl}/all`, { headers });
  }
}
