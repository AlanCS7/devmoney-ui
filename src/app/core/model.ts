export class Lancamento {
  id!: number;
  descricao: string = '';
  dataVencimento!: Date;
  dataPagamento!: Date;
  valor: number = 0;
  observacao: string = '';
  tipo: string = 'RECEITA';
  categoria: Categoria = new Categoria();
  pessoa: Pessoa = new Pessoa();
}

export class Categoria {
  id!: number;
  nome: string = '';
}

export class Pessoa {
  id!: number;
  nome: string = '';
  ativo: boolean = true;
  endereco = new Endereco();
}

export class Endereco {
  logradouro: string = '';
  numero: string = '';
  complemento: string = '';
  bairro: string = '';
  cep: string = '';
  cidade: string = '';
  estado: string = '';
}

export enum MessageType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning'
}
