import { MockPlanets } from './helper/MockPlanets';

export type Planets = {
  climate: string,
  created: string,
  diameter: string,
  edited: string
  films: string[],
  gravity: string,
  name: string,
  orbital_period: string,
  population: string,
  rotation_period: string,
  surface_water: string,
  terrain: string,
  url: string,
  residents?: string,
};

export type Filters = {
  columnFilter: string,
  comparisonFilter: string,
  valueFilter: number,
};

export type Order = {
  column: string,
  sort: string,
};

export type OrderObj = {
  order: Order,
};
