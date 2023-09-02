import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent {
  pessoas = [
    {
      nome: 'Alan Carlos',
      cidade: 'São Paulo',
      estado: 'SP',
      status: true,
    },
    {
      nome: 'Maria Silva',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      status: false,
    },
    {
      nome: 'José Oliveira',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      status: true,
    },
    {
      nome: 'Ana Souza',
      cidade: 'Porto Alegre',
      estado: 'RS',
      status: true,
    },
    {
      nome: 'Lucas Pereira',
      cidade: 'Curitiba',
      estado: 'PR',
      status: false,
    },
    {
      nome: 'Carla Santos',
      cidade: 'Salvador',
      estado: 'BA',
      status: true,
    },
    {
      nome: 'Rafaela Lima',
      cidade: 'Fortaleza',
      estado: 'CE',
      status: true,
    },
    {
      nome: 'Fernando Almeida',
      cidade: 'Recife',
      estado: 'PE',
      status: false,
    },
    {
      nome: 'Patrícia Gonçalves',
      cidade: 'Brasília',
      estado: 'DF',
      status: true,
    },
    {
      nome: 'Ricardo Costa',
      cidade: 'Manaus',
      estado: 'AM',
      status: true,
    },
    {
      nome: 'Camila Ferreira',
      cidade: 'Vitória',
      estado: 'ES',
      status: false,
    },
    {
      nome: 'Gabriel Santos',
      cidade: 'Goiânia',
      estado: 'GO',
      status: true,
    },
    {
      nome: 'Aline Rodrigues',
      cidade: 'Natal',
      estado: 'RN',
      status: true,
    },
    {
      nome: 'Marcelo Alves',
      cidade: 'Florianópolis',
      estado: 'SC',
      status: false,
    },
    {
      nome: 'Patricia Fernandes',
      cidade: 'Porto',
      estado: 'PT',
      status: true,
    },
    {
      nome: 'Luisa Oliveira',
      cidade: 'Lisboa',
      estado: 'PT',
      status: true,
    },
    {
      nome: 'Pedro Santos',
      cidade: 'Coimbra',
      estado: 'PT',
      status: false,
    },
    {
      nome: 'Sofia Fernandes',
      cidade: 'Braga',
      estado: 'PT',
      status: true,
    },
    {
      nome: 'Diego Menezes',
      cidade: 'Porto Alegre',
      estado: 'RS',
      status: true,
    },
    {
      nome: 'Isabela Costa',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      status: false,
    },
  ];
}
