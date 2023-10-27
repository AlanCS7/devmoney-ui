import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageType } from 'src/app/core/model';

import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('dt') dt: any;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de pessoas');
  }

  pesquisar(page = 0) {
    this.filtro.page = page;

    this.pessoaService.pesquisar(this.filtro).subscribe((res) => {
      this.totalRegistros = res.totalElements;
      this.pessoas = res.content;
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id).subscribe(
      () => {
        this.showMessage(MessageType.SUCCESS, 'Pessoa excluída com sucesso!');

        this.dt.first = 0;
        this.pesquisar();
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  updateStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.updateStatus(pessoa.id, novoStatus).subscribe(
      () => {
        const acao = novoStatus ? 'ativada' : 'desativada';
        pessoa.ativo = novoStatus;

        this.showMessage(MessageType.SUCCESS, `Pessoa ${acao} com sucesso!`);
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  confirm(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      header: 'Confirmação',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.excluir(pessoa);
      },
    });
  }

  private showMessage(severity: string, message: string) {
    this.messageService.add({ severity, detail: message });
  }

  onPageChange(event: any) {
    const page = event.first / event.rows;
    this.pesquisar(page);
  }
}
