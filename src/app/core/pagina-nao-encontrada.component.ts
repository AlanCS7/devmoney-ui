import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <div class="container">
      <h1 class="text-center">Página não encontrada</h1>
      <h2 class="text-center">404</h2>
    </div>
  `,
  styles: [],
})
export class PaginaNaoEncontradaComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Página não encontrada');
  }
}
