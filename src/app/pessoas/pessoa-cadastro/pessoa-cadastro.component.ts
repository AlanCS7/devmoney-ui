import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageType, Pessoa } from 'src/app/core/model';

import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Nova pessoa');

    const idPessoa = this.route.snapshot.params['id'];

    if (idPessoa) {
      this.carregarPessoa(idPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscarPorId(id).subscribe(
      (res) => {
        this.pessoa = res;
        this.atualizarTituloEdicao();
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa).subscribe(
      (res) => {
        this.showMessage(MessageType.SUCCESS, 'Pessoa cadastrada com sucesso!');

        this.router.navigate(['/pessoas', res.id]);
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa).subscribe(
      (res) => {
        this.pessoa = res;
        this.showMessage(MessageType.SUCCESS, 'Pessoa alterada com sucesso!');
        this.atualizarTituloEdicao();
      },
      (error) => {
        this.errorHandler.handle(error);
      }
    );
  }

  novo(form: NgForm) {
    form.reset();
    this.pessoa = new Pessoa();

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  private showMessage(severity: string, message: string) {
    this.messageService.add({ severity, detail: message });
  }
}
