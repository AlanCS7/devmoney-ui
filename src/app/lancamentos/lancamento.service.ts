import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao!: string;
  dataVencimentoInicio!: Date;
  dataVencimentoFim!: Date;
  page: number = 0;
  itemsPerPage: number = 5;
}

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

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

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params });
  }

  excluir(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http.delete(`${this.lancamentosUrl}/${id}`, { headers });
  }
}
