import { Component, Input } from '@angular/core';

type Lancamento = {
  tipo: string;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date | null;
  valor: number;
  pessoa: string;
};

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos: Lancamento[] = [];
}
