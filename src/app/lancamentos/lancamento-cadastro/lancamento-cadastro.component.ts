import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento, MessageType } from 'src/app/core/model';

import { PessoaService } from '../../pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Novo lançamento');

    const idLancamento = this.route.snapshot.params['id'];

    if (idLancamento) {
      this.carregarLancamento(idLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id).subscribe(
      (res) => {
        this.converterStringsParaDatas([res]);
        this.lancamento = res;
        this.atualizarTituloEdicao();
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento).subscribe(
      (res) => {
        this.showMessage(
          MessageType.SUCCESS,
          'Lançamento adicionado com sucesso!'
        );

        this.router.navigate(['/lancamentos', res.id]);
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento).subscribe(
      (res) => {
        this.converterStringsParaDatas([res]);
        this.lancamento = res;
        this.showMessage(
          MessageType.SUCCESS,
          'Lançamento alterado com sucesso!'
        );
        this.atualizarTituloEdicao();
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  carregarCategorias() {
    this.categoriaService.listarTodos().subscribe(
      (res) => {
        this.categorias = res.map((c: any) => ({ label: c.nome, value: c.id }));
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  carregarPessoas() {
    this.pessoaService.listarTodos().subscribe(
      (res) => {
        this.pessoas = res.map((c: any) => ({ label: c.nome, value: c.id }));
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  novo(form: NgForm) {
    form.reset({ tipo: 'RECEITA' });
    this.lancamento = new Lancamento();

    this.router.navigate(['/lancamentos/novo']);
  }

  private showMessage(severity: string, message: string) {
    this.messageService.add({ severity, detail: message });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(
        lancamento.dataVencimento,
        'YYYY-MM-DD'
      ).toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(
          lancamento.dataPagamento,
          'YYYY-MM-DD'
        ).toDate();
      }
    }
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }
}
