import { Component, OnInit } from '@angular/core';
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

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
  }

  pesquisar(page = 0) {
    this.filtro.page = page;

    this.pessoaService.pesquisar(this.filtro).subscribe((res) => {
      console.log(res);
      console.log(res.content);

      this.totalRegistros = res.totalElements;
      this.pessoas = res.content;
    })
  }

  onPageChange(event: any) {
    const page = event.first / event.rows;
    this.pesquisar(page)
  }
}
