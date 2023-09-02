import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent {
  lancamentos = [
    {
      tipo: 'DESPESA',
      descricao: 'Compra de Pao',
      dataVencimento: new Date(2023, 4, 30),
      dataPagamento: null,
      valor: 4.55,
      pessoa: 'Padaria Nova Vida',
    },
    {
      tipo: 'RECEITA',
      descricao: 'Salário',
      dataVencimento: new Date(2023, 5, 5),
      dataPagamento: new Date(2023, 5, 22),
      valor: 2500.0,
      pessoa: 'Empresa ABC',
    },
    {
      tipo: 'RECEITA',
      descricao: 'Reembolso de Despesas',
      dataVencimento: new Date(2023, 6, 10),
      dataPagamento: null,
      valor: 150.5,
      pessoa: 'Empresa XYZ',
    },
    {
      tipo: 'RECEITA',
      descricao: 'Renda Extra',
      dataVencimento: new Date(2023, 5, 15),
      dataPagamento: null,
      valor: 300.0,
      pessoa: 'Freelancer ABC',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Compra de Leite',
      dataVencimento: new Date(2023, 5, 15),
      dataPagamento: null,
      valor: 3.25,
      pessoa: 'Supermercado ABC',
    },
    {
      tipo: 'RECEITA',
      descricao: 'Venda de Roupas',
      dataVencimento: new Date(2023, 5, 20),
      dataPagamento: null,
      valor: 500.0,
      pessoa: 'Cliente XYZ',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Pagamento de Internet',
      dataVencimento: new Date(2023, 5, 20),
      dataPagamento: null,
      valor: 85.9,
      pessoa: 'Provedor de Internet XYZ',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Aluguel do Apartamento',
      dataVencimento: new Date(2023, 5, 25),
      dataPagamento: new Date(2023, 5, 28),
      valor: 1200.0,
      pessoa: 'Imobiliária XYZ',
    },
    {
      tipo: 'RECEITA',
      descricao: 'Pagamento de Aluguel',
      dataVencimento: new Date(2023, 6, 25),
      dataPagamento: new Date(2023, 6, 28),
      valor: 800.0,
      pessoa: 'Inquilino ABC',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Conta de Energia',
      dataVencimento: new Date(2023, 6, 10),
      dataPagamento: null,
      valor: 80.45,
      pessoa: 'Concessionária de Energia',
    },
    {
      tipo: 'DESPESA',
      descricao: 'Compra de Gasolina',
      dataVencimento: new Date(2023, 6, 5),
      dataPagamento: null,
      valor: 50.8,
      pessoa: 'Posto de Combustível ABC',
    },
  ];
}
