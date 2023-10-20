import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from '../App';
import {vi} from 'vitest'
import { MockPlanets } from '../helper/MockPlanets';
import fetchPlanets from '../helper/fetchPlanets';

describe('Testa o Componente Header', () => { 
  test('Testa se existe o Titulo na pagina', () => {
    render(<App />);
    const title = screen.getByText(/Projeto Star Wars - Trybe/i);
    expect(title).toBeInTheDocument();
  });
  test('Testa se existe Input de Name pagina',  () => {
    render(<App />);
    const inputName =  screen.getByTestId("name-filter");
    expect(inputName).toBeInTheDocument();
  });
  test("Testa se existe um form com elementos de filter", () => {
    render(<App></App>);
    const selectColumnFilter = screen.getByTestId('column-filter');
    const selectComparisonFilter = screen.getByTestId('comparison-filter');
    const btnFilter = screen.getByTestId('button-filter');
    expect(selectColumnFilter).toBeInTheDocument();
    expect(selectComparisonFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
  })
  test("Testa se existe um form com elementos de sort", () => {
    render(<App></App>);
    const selectColumnSort = screen.getByTestId('column-sort');
    const radioASC = screen.getByTestId('column-sort-input-asc');
    const radioDESC = screen.getByTestId('column-sort-input-desc');
    const btnSort = screen.getByTestId('column-sort-button');
    expect(selectColumnSort).toBeInTheDocument();
    expect(radioASC).toBeInTheDocument();
    expect(radioDESC).toBeInTheDocument();
    expect(btnSort).toBeInTheDocument();
  })
  test("Testa se existe um button Remover Filtros", () => {
    render(<App></App>);
    const btnRemoveFilters = screen.getByTestId('button-remove-filters');
    expect(btnRemoveFilters).toBeInTheDocument();
  })
})



describe('Testa o Componente Table', () => {
  test('Testa se existe um thead na tabela', () => {
    render(<App />);
    const headerCell = screen.getByTestId('column-header');
    const th = within(headerCell).getAllByRole('columnheader');    
    expect(headerCell).toBeInTheDocument();
    expect(th).toHaveLength(13);
  });

  // test('Testa se existe os planetas na tabela', async () => {
  // render(<App />);
  //   // Aguarda os dados serem carregados

  //   const planets = screen.getAllByTestId('planet-name');
  //   expect(planets).toHaveLength(11);
  // });
});

// describe('Testa se os filters e sort',()=>{
//   test('Testa se o name-filter filtra os planetas pelo nome',async()=>{
//     render(<App/>);
//     const inputNameFilter = screen.getByTestId('name-filter');
//     const firstNameFilter = 'o';
//     const secondNameFilter = 'oo';

//     fireEvent.change(inputNameFilter, {target: {value: firstNameFilter}});
//     const firstPlanetsFilter = await screen.findAllByTestId('planet-name', {}, {timeout: 10000})
//     expect(firstPlanetsFilter).toHaveLength(7);
//   })

  
// })