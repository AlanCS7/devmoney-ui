import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento, MessageType } from 'src/app/core/model';

import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: Lancamento[] = [];
  @ViewChild('dt') dt: any;

  constructor(
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos')
  }

  pesquisar(page = 0) {
    this.filtro.page = page;

    this.lancamentoService.pesquisar(this.filtro).subscribe(
      (res) => {
        this.totalRegistros = res.totalElements;
        this.lancamentos = res.content;
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  excluir(lancamento: Lancamento) {
    this.lancamentoService.excluir(lancamento.id).subscribe(
      () => {
        this.showMessage(
          MessageType.SUCCESS,
          'Lançamento excluído com sucesso!'
        );

        this.dt.first = 0;
        this.pesquisar();
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  confirm(lancamento: Lancamento) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      header: 'Confirmação',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.excluir(lancamento);
      },
    });
  }

  onPageChange(event: any) {
    const page = event.first / event.rows;
    this.pesquisar(page);
  }

  private showMessage(severity: string, message: string) {
    this.messageService.add({ severity, detail: message });
  }
}
