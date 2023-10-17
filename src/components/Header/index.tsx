import { useContext, useState } from 'react';
import PlanetContext from '../../context/PlanetContext';

import './Header.css';

function Header() {
  const { planets, handleFilterChange, nameFilter } = useContext(PlanetContext);
  const [keysFilter, setKeysFilter] = useState(Object.keys(planets[0]));
  const [keysOrder, setKeysOrder] = useState(Object.keys(planets[0]));

  return (
    <header className="conteiner">
      <div className="conteiner_input">
        <h1>Projeto Star Wars - Trybe</h1>
        <input
          value={ nameFilter }
          data-testid="name-filter"
          className="input_filter"
          onChange={ handleFilterChange }
        />
      </div>
      <form className="container_form">
        <label htmlFor="select_genery">
          Coluna
        </label>
        <select name="" id="select_genery">
          {keysFilter.map((key) => {
            return <option key={ key }>{key}</option>;
          })}
        </select>
        <label htmlFor="select_operator">
          Operador
        </label>
        <select name="" id="select_operator">
          <option>maior que </option>
          <option>menor que </option>
        </select>
        <input type="number" />
        <button className="btn">Filtrar</button>
      </form>
      <form className="container_form">
        <label htmlFor="select_order">
          Ordenar
        </label>
        <select name="" id="select_order">
          {keysOrder.map((key) => {
            return <option key={ key }>{key}</option>;
          })}
        </select>
        <input name="orderOfPlanets" type="radio" id="ascendente" value="ascendente" />
        <label htmlFor="ascendente">Ascendente</label>
        <input name="orderOfPlanets" type="radio" id="descendente" value="descendente" />
        <label htmlFor="descendente">Descendente</label>
        <button className="btn">Ordenar</button>
      </form>
      <button className="btn">Remover Filtros</button>
    </header>
  );
}

export default Header;
