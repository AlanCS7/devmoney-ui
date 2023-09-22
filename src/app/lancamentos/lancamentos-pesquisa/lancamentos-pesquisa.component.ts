import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('dt') dt: any;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  pesquisar(page = 0) {
    this.filtro.page = page;

    this.lancamentoService.pesquisar(this.filtro).subscribe((res) => {
      this.totalRegistros = res.totalElements;
      this.lancamentos = res.content;
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: '',
        detail: 'Lançamento excluído com sucesso!',
      });

      this.dt.first = 0;
      this.pesquisar();
    });
  }

  confirm(lancamento: any) {
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
}
