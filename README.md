# Projeto StarWars Planets Search

Este projeto consiste em uma aplicação web que consome a API de Star Wars para exibir informações sobre os planetas da saga. Abaixo estão listados os requisitos necessários para o desenvolvimento deste projeto:

## Tecnologias Utilizadas

- **React:** Utilizado para construir a interface de usuário da aplicação.
- **React Router:** Utilizado para lidar com a navegação entre diferentes páginas da aplicação.
- **Redux:** Utilizado para gerenciar o estado global da aplicação.
- **Axios:** Utilizado para realizar requisições HTTP à API de Star Wars.
- **React Testing Library:** Utilizado para escrever e executar testes unitários na aplicação.

## Requisitos do Projeto

### 1. Requisição à API de Star Wars e Preenchimento da Tabela
Faça uma requisição para o endpoint `/planets` da API de Star Wars e preencha uma tabela com os dados retornados, com exceção dos dados da coluna residents.

- A tabela deve ser renderizada por um componente chamado `Table`.

### 2. Filtro de Texto para a Tabela
Crie um filtro de texto para a tabela que atualize os planetas exibidos à medida que o nome é digitado, sem a necessidade de apertar um botão para efetuar a filtragem.

### 3. Filtro para Valores Numéricos
Implemente um filtro para valores numéricos com três seletores que, ao serem combinados e clicar no botão, devem filtrar os dados da tabela de acordo com a coluna correspondente e os valores escolhidos.

### 4. Múltiplos Filtros Numéricos
Deverá ser possível adicionar múltiplos filtros numéricos que funcionem de forma conjunta.

### 5. Testes Unitários
Desenvolva testes para atingir uma cobertura total de 30% da aplicação utilizando a biblioteca React Testing Library.

### 6. Evitar Filtros Repetidos
Não utilize filtros repetidos. Caso um filtro seja totalmente preenchido, um novo filtro de valores numéricos deve ser carregado.

### 7. Remoção de Filtros Numéricos
Permita apagar um filtro de valor numérico ao clicar no ícone X de um dos filtros e apague todas as filtragens numéricas simultaneamente ao clicar em outro botão "Remover todas filtragens".

### 8. Testes para Cobertura de 60%
Desenvolva testes para atingir uma cobertura total de 60% da aplicação.

### 9. Ordenação de Colunas
Ordene as colunas de forma ascendente ou descendente através de um filtro. Um dropdown selecionará a coluna para basear a ordenação e um par de radio buttons determinará se a coluna é ascendente ou descendente. As informações sobre a ordenação das colunas devem ser armazenadas em um novo campo `{ order: { column: 'population', sort: 'ASC'} }`.

## Conclusão

O Star Wars Planets Search é um projeto desafiador que demonstra a integração de diversas tecnologias e conceitos de desenvolvimento web, como consumo de API, gerenciamento de estado, testes unitários e filtragem de dados. Este projeto oferece uma experiência prática na construção de aplicações web modernas e funcionais, além de proporcionar um mergulho no universo da saga Star Wars.
