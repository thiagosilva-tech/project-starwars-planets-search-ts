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

  test.only('Testa se o name-filter filtra os planetas pelo nome', async ()=> {
       const loading = screen.getByText('Loading...');
     await waitForElementToBeRemoved(loading);

     expect(global.fetch).toBeCalledTimes(1);
     
     const inputNameFilter = screen.getByTestId('name-filter');
    
    act(async () => {
      await userEvent.type(inputNameFilter, 'o');
      const firstPlanetsFilter = await screen.findAllByTestId('planet-name');
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
    const planetsFilter = await screen.findAllByTestId('planet-name');
    expect(planetsFilter).toHaveLength(7);
 });
});