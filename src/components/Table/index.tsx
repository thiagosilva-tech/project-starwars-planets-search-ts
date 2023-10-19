import { useContext, useEffect, useState } from 'react';
import PlanetContext from '../../context/PlanetContext';
import Planet from '../Planet';
import { Filters, Planets } from '../../type';

function filterByName(planets: Planets[], nameFilter: string) {
  return nameFilter === ''
    ? planets
    : planets.filter((planet) => planet.name.toLowerCase().includes(nameFilter));
}

function filterByFilters(planets: Planets[], arrayFilters: Filters[]) {
  // Caso não haja filtros, retorne todos os planetas
  if (arrayFilters.length === 0) {
    return planets;
  }
  console.log(arrayFilters);

  return planets.filter((planet) => {
    return arrayFilters.reduce((isValid, filter) => {
      if (!isValid) {
        return false;
      }

      const { columnFilter, comparisonFilter, valueFilter } = filter;
      const planetKey = columnFilter as keyof Planets;

      switch (comparisonFilter) {
        case 'maior que':
          return Number(planet[planetKey]) > Number(valueFilter);
        case 'menor que':
          return Number(planet[planetKey]) < Number(valueFilter);
        case 'igual a':
          return Number(planet[planetKey]) === Number(valueFilter);
        default:
          return false;
      }
    }, true);
  });
}

function Table() {
  const { planets, nameFilter, filters } = useContext(PlanetContext);
  const [filteredPlanets, setFilteredPlanets] = useState(
    filterByFilters(filterByName(planets, nameFilter), filters),
  );

  useEffect(() => {
    setFilteredPlanets(filterByFilters(filterByName(planets, nameFilter), filters));
  }, [filters, nameFilter, planets]);

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => {
            return (
              <Planet key={ planet.name } planet={ planet } />
            );
          })}
        </tbody>
      </table>

    </main>
  );
}

export default Table;
