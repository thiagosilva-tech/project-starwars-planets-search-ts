import { useContext } from 'react';
import PlanetContext from '../../context/PlanetContext';
import Planet from '../Planet';

function Table() {
  const planets = useContext(PlanetContext);
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
          {planets.map((planet) => {
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
