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
  const { planets, nameFilter, filters, orderObj } = useContext(PlanetContext);
  const [filteredPlanets, setFilteredPlanets] = useState(
    filterByFilters(filterByName(planets, nameFilter), filters),
  );

  useEffect(() => {
    setFilteredPlanets(filterByFilters(filterByName(planets, nameFilter), filters));

    if (orderObj.order.column !== '') {
      const sortedPlanets = [...filteredPlanets];
      sortedPlanets.sort((a, b) => {
        const planetA = a[orderObj.order.column as keyof Planets];
        const planetB = b[orderObj.order.column as keyof Planets];
        // Tratamento especial para 'unknown'
        if (planetA === 'unknown' && planetB === 'unknown') {
          return a.name.localeCompare(b.name);
        } if (planetA === 'unknown') {
          return 1;
        } if (planetB === 'unknown') {
          return -1;
        }
        const sortOrder = orderObj.order.sort === 'ASC' ? 1 : -1;
        // Lógica de ordenação
        return (Number(planetA) - Number(planetB)) * sortOrder;
      });
      // Atualize o estado com a lista ordenada
      setFilteredPlanets(sortedPlanets);
    }
  }, [filters, nameFilter, planets, orderObj, filteredPlanets]);

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
