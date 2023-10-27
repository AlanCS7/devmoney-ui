import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Pessoa } from '../core/model';

export class PessoaFiltro {
  nome!: string;
  page: number = 0;
  itemsPerPage: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.page);
    params = params.set('size', filtro.itemsPerPage);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(this.pessoasUrl, { params });
  }

  buscarPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${id}`);
  }

  listarTodos(): Observable<any> {
    return this.http.get(`${this.pessoasUrl}/all`);
  }

  adicionar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa);
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}`, pessoa);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.pessoasUrl}/${id}`);
  }

  updateStatus(id: number, status: boolean): Observable<any> {
    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, status);
  }
}
