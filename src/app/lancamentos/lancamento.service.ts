import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao!: string;
  dataVencimentoInicio!: Date;
  dataVencimentoFim!: Date;
  page: number = 0;
  itemsPerPage: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', filtro.page);
    params = params.set('size', filtro.itemsPerPage);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set(
        'dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD')
      );
    }

    if (filtro.dataVencimentoFim) {
      params = params.set(
        'dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD')
      );
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params });
  }

  buscarPorId(id: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${id}`);
  }

  adicionar(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento);
  }

  atualizar(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.id}`, lancamento);
  }

  excluir(id: number): Observable<Lancamento> {
    return this.http.delete<Lancamento>(`${this.lancamentosUrl}/${id}`);
  }
}
