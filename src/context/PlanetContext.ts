import { createContext } from 'react';
import { Planets } from '../type';

type PlanetContextType = {
  planets: Planets[],
  nameFilter: string,
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

const PlanetContext = createContext({} as PlanetContextType);

export default PlanetContext;
