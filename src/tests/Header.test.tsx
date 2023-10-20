import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import App from '../App';
import {vi} from 'vitest'
import { MockPlanets } from '../helper/MockPlanets';

describe('Testa o Componente Header', () => { 
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
  test('Testa se existe o Titulo na pagina',async () => {
    render(<App />);
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading, {timeout: 10000});
    const title = screen.getByText(/Projeto Star Wars - Trybe/i);
    expect(title).toBeInTheDocument();
  }, 10000);
  test('Testa se existe Input de Name pagina', async () => {
    render(<App />);
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading, {timeout: 10000});
    const inputName =  screen.getByTestId("name-filter");
    expect(inputName).toBeInTheDocument();
  }, 10000);
  test("Testa se existe um form com elementos de filter", async () => {
    render(<App/>);
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading, {timeout: 10000});
    const selectColumnFilter = screen.getByTestId('column-filter');
    const selectComparisonFilter = screen.getByTestId('comparison-filter');
    const btnFilter = screen.getByTestId('button-filter');
    expect(selectColumnFilter).toBeInTheDocument();
    expect(selectComparisonFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
  }, 10000)
  test("Testa se existe um form com elementos de sort", async () => {
    render(<App></App>);
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading, {timeout: 10000});
    const selectColumnSort = screen.getByTestId('column-sort');
    const radioASC = screen.getByTestId('column-sort-input-asc');
    const radioDESC = screen.getByTestId('column-sort-input-desc');
    const btnSort = screen.getByTestId('column-sort-button');
    expect(selectColumnSort).toBeInTheDocument();
    expect(radioASC).toBeInTheDocument();
    expect(radioDESC).toBeInTheDocument();
    expect(btnSort).toBeInTheDocument();
  }, 10000)
  test("Testa se existe um button Remover Filtros", async () => {
    render(<App></App>);
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(loading, {timeout: 10000});
    const btnRemoveFilters = screen.getByTestId('button-remove-filters');
    expect(btnRemoveFilters).toBeInTheDocument();
  }, 10000)
})



