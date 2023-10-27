import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<any> {
    return this.http.get(this.categoriasUrl);
  }
}
