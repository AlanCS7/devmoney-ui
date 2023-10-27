import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha).subscribe(
      (res) => {
        this.router.navigate(['/lancamentos']);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  private handleError(error: any): void {
    if (error.status === 400 && error.error.error === 'invalid_grant') {
      this.errorHandler.handle('Usuário ou senha inválida!');
    } else {
      this.errorHandler.handle(error);
    }
  }
}
