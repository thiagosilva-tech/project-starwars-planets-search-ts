import {vi} from 'vitest';
import { MockPlanets } from '../helper/MockPlanets';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

describe.only('Testa se os filters e sort',()=>{
    beforeEach(() => {
    //   global.fetch = vi.fn(() => {
    //     return Promise.resolve({
    //       status: 200,
    //       ok: true,
    //       json: () => Promise.resolve(MockPlanets)
    //     })
    //   });
        vi.spyOn(global, 'fetch')
        .mockResolvedValue({json: () => Promise.resolve(MockPlanets)} as Response);
    });
  
    afterEach(() => {
      vi.clearAllMocks();
    });
    test('Testa se o name-filter filtra os planetas pelo nome', async ()=> {
      render(<App/>);

      const inputNameFilter = screen.getByTestId('name-filter');
      const firstNameFilter = 'o';
      const secondNameFilter = 'oo';
  
      screen.debug();
      await userEvent.type(inputNameFilter, firstNameFilter);
      const firstPlanetsFilter = await screen.findAllByTestId('planet-name')
      expect(firstPlanetsFilter).toHaveLength(7);
      await userEvent.clear(inputNameFilter);
      await userEvent.type(inputNameFilter, secondNameFilter);
      const secondPlanetsFilter = screen.getAllByTestId('planet-name')
      expect(secondPlanetsFilter).toHaveLength(2);
    });
  });