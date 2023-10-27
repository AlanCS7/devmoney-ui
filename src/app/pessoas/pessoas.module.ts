import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

@NgModule({
  declarations: [
    PessoasPesquisaComponent,
    PessoaCadastroComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: []
})
export class PessoasModule { }
