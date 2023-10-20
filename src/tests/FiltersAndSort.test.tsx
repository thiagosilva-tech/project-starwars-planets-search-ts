import { vi } from 'vitest';
import { MockPlanets } from '../helper/MockPlanets';
import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa se os filters e sort',()=>{ 
  beforeEach(() => {
    vi.spyOn(global, 'fetch')
    .mockResolvedValue({ok: true, json: async () => MockPlanets} as Response);

   render(<App/>);
  }) 
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Testa se o name-filter filtra os planetas pelo nome', async ()=> {
       const loading = screen.getByText('Loading...');
     await waitForElementToBeRemoved(loading);

     expect(global.fetch).toBeCalledTimes(1);
     
     const inputNameFilter = screen.getByTestId('name-filter');
    
    act(async () => {
      await userEvent.type(inputNameFilter, 'o');
      const firstPlanetsFilter = screen.getAllByTestId('planet-name');
      expect(firstPlanetsFilter).toHaveLength(7);
      await userEvent.clear(inputNameFilter);
      await userEvent.type(inputNameFilter, "oo");
      const secondPlanetsFilter = screen.getAllByTestId('planet-name');
      expect(secondPlanetsFilter).toHaveLength(2);
    })
  });

  test('Testa se o column filter funciona', async ()=> {   
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading);
   
    const valueFilter = screen.getByTestId('column-filter');

    await userEvent.type(valueFilter, '1000');
    const planetsFilter = screen.getAllByTestId('planet-name');
    expect(planetsFilter).toHaveLength(7);
    const btnRemoveFilters = screen.getByTestId('button-remove-filters');
    await userEvent.click(btnRemoveFilters);
    const planetsWithoutFilters = screen.getAllByTestId('planet-name');
    expect(planetsWithoutFilters).toHaveLength(10);

 });

 test('Testa se o btnSort funciona', async ()=> {   
  const loading = screen.getByText('Loading...');
  await waitForElementToBeRemoved(loading);
 
  const btnSort = screen.getByTestId('column-sort-button');

  await userEvent.click(btnSort);
  const planetsFilter = screen.getAllByTestId('planet-name');
  
  expect(planetsFilter[0].innerHTML).toBe('Yavin IV');
  expect(planetsFilter[9].innerHTML).toBe('Hoth');
});
});