import { createContext } from 'react';
import { Filters, Planets } from '../type';

type PlanetContextType = {
  planets: Planets[],
  nameFilter: string,
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleFilters: (dataFilters: Filters) => void,
  filters: Filters[],
  handleDelete: (filterDelet: string) => void,
};

const PlanetContext = createContext({} as PlanetContextType);

export default PlanetContext;
