import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import App from '../App';
import {vi} from 'vitest'
import { MockPlanets } from '../helper/MockPlanets';

describe('Testa o Componente Table', () => {
    beforeEach(() => {
      // global.fetch = vi.fn(() => {
      //   return Promise.resolve({
      //     status: 200,
      //     ok: true,
      //     json: () => Promise.resolve(MockPlanets)
      //   })
      // });
      vi.spyOn(global, 'fetch')
      .mockResolvedValue({ok: true, json: async () => MockPlanets} as Response);
    });
  
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    test('Testa se existe um thead na tabela', async() => {
      render(<App />);
      const loading = screen.getByText('Loading...');
      await waitForElementToBeRemoved(loading);
      const headerCell = screen.getByTestId('column-header');
      const th = within(headerCell).getAllByRole('columnheader');    
      expect(headerCell).toBeInTheDocument();
      expect(th).toHaveLength(13);
    });
  
    test('Testa se existe os planetas na tabela', async () => {
    render(<App />);
      const planets = await screen.findAllByTestId('planet-name');
      expect(planets).toHaveLength(10);
    });
  });