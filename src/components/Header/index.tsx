import { useContext, useState } from 'react';
import PlanetContext from '../../context/PlanetContext';

import './Header.css';

const INITIAL_KEYS_FILTER = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const INITIAL_FILTERS = {
  columnFilter: INITIAL_KEYS_FILTER[0],
  comparisonFilter: 'maior que',
  valueFilter: 0,
};

function Header() {
  const {
    planets,
    handleFilterChange,
    nameFilter,
    // filters,
    handleFilters,
  } = useContext(PlanetContext);
  const [keysFilter, setKeysFilter] = useState(INITIAL_KEYS_FILTER);
  const [keysOrder, setKeysOrder] = useState(Object.keys(planets[0]));
  const [newFilter, setNewFilter] = useState(INITIAL_FILTERS);

  const handleSubmit = () => {
    setKeysFilter(keysFilter.filter((key) => key !== newFilter.columnFilter));
    setKeysOrder(keysOrder);
    handleFilters(newFilter);
    setNewFilter(INITIAL_FILTERS);
  };

  const handleChangeFilters = (
    { target }: React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewFilter({
      ...newFilter,
      [target.name]: target.value });
  };

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
      <form
        className="container_form"
        onSubmit={ (e) => {
          e.preventDefault();
          handleSubmit();
        } }
      >
        <label
          htmlFor="column-filter"
        >
          Coluna
        </label>
        <select
          id="column-filter"
          data-testid="column-filter"
          name="columnFilter"
          value={ newFilter.columnFilter }
          onChange={ handleChangeFilters }
        >
          {keysFilter.map((key) => {
            return <option key={ key } value={ key }>{key}</option>;
          })}
        </select>
        <label htmlFor="comparison-filter">
          Operador
        </label>
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          name="comparisonFilter"
          value={ newFilter.comparisonFilter }
          onChange={ handleChangeFilters }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="value-filter"
          data-testid="value-filter"
          name="valueFilter"
          value={ newFilter.valueFilter }
          onChange={ handleChangeFilters }
        />
        <button
          className="btn"
          data-testid="button-filter"
          type="submit"
        >
          Filtrar
        </button>
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
