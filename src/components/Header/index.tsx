import { useContext, useEffect, useState } from 'react';
import PlanetContext from '../../context/PlanetContext';

import './Header.css';
import { Filters } from '../../type';

const INITIAL_KEYS_FILTER = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const INITIAL_FILTERS = {
  columnFilter: INITIAL_KEYS_FILTER[0],
  comparisonFilter: 'maior que',
  valueFilter: 0,
};

function findFilters(filters: Filters[]) {
  const filterSet = new Set(filters.map((f) => f.columnFilter));
  return INITIAL_KEYS_FILTER.filter((filter) => !filterSet.has(filter));
}

function Header() {
  const {
    planets,
    handleFilterChange,
    nameFilter,
    filters,
    handleFilters,
    handleDelete,
  } = useContext(PlanetContext);
  const [keysFilter, setKeysFilter] = useState(INITIAL_KEYS_FILTER);
  const [keysOrder, setKeysOrder] = useState(Object.keys(planets[0]));
  const [newFilter, setNewFilter] = useState(INITIAL_FILTERS);

  useEffect(() => {
    const newKeysFilter = findFilters(filters);
    setKeysFilter(newKeysFilter);
    setNewFilter({ ...INITIAL_FILTERS, columnFilter: newKeysFilter[0] });
  }, [filters]);

  const handleSubmit = () => {
    setKeysOrder(keysOrder);
    handleFilters(newFilter);
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
        {filters.map(({ columnFilter, comparisonFilter, valueFilter }) => {
          return (
            <div key={ columnFilter } data-testid="filter">
              <p>
                {columnFilter}
              </p>
              <p>{comparisonFilter}</p>
              <p>{valueFilter}</p>
              <button
                onClick={ () => handleDelete(columnFilter) }
              >
                X
              </button>
            </div>
          );
        })}
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
      <button
        className="btn"
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => handleDelete('all') }
      >
        Remover Filtros
      </button>
    </header>
  );
}

export default Header;
