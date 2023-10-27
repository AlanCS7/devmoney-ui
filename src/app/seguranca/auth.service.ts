import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const OAUTH_TOKEN_URL = 'http://localhost:8080/oauth/token';
const AUTHORIZATION_HEADER = 'Basic YW5ndWxhcjpAbmd1bEByMA==';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtPayload: any | null = '';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    headers = headers.append('Authorization', AUTHORIZATION_HEADER);

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http
      .post<any>(OAUTH_TOKEN_URL, body, { headers, withCredentials: true })
      .pipe(
        map((res) => {
          this.armazenarToken(res.access_token);
          return res;
        }),
        catchError((error) => {
          console.error('Ocorreu um erro:', error);
          throw error;
        })
      );
  }

  async obterNovoAccessToken(): Promise<void> {
    localStorage.removeItem('token')
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', AUTHORIZATION_HEADER);

    const body = 'grant_type=refresh_token';

    try {
      const res = await this.http
        .post<any>(OAUTH_TOKEN_URL, body, { headers, withCredentials: true })
        .toPromise();
      this.armazenarToken(res.access_token);
      console.log('Novo access token');

    } catch (error) {
      console.error('Erro ao renovar token:', error);
      throw error;
    }
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return (
      this.jwtPayload.authorities &&
      this.jwtPayload.authorities.includes(permissao)
    );
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    console.log(this.jwtPayload);

    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
