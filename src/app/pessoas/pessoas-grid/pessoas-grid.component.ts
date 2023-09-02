import { Component, Input } from '@angular/core';

type Pessoa = {
  nome: string;
  cidade: string;
  estado: string;
  status: boolean;
};

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas: Pessoa[] = [];
}
