import { createContext } from 'react';
import { Planets } from '../type';

const PlanetContext = createContext({} as Planets[]);

export default PlanetContext;
