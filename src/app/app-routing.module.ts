import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  {
    path: 'lancamentos',
    children: [
      { path: '', component: LancamentosPesquisaComponent },
      { path: 'novo', component: LancamentoCadastroComponent },
      { path: ':id', component: LancamentoCadastroComponent },
    ],
  },
  {
    path: 'pessoas',
    children: [
      { path: '', component: PessoasPesquisaComponent },
      { path: 'nova', component: PessoaCadastroComponent },
      { path: ':id', component: PessoaCadastroComponent },
    ],
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
