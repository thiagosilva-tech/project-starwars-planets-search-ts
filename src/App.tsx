import React, { useEffect, useState } from 'react';
import './App.css';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './helper/fetchPlanets';
import Table from './components/Table';
import { Filters, Order, OrderObj, Planets } from './type';
import Header from './components/Header';

const INITIAL_ORDER_OBJ = { order: { column: '', sort: '' } };

function App() {
  const [planets, setPlanets] = useState<Planets[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filters, setFilters] = useState<Filters[]>([]);
  const [orderObj, setOrderObj] = useState<OrderObj>(INITIAL_ORDER_OBJ);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPlanets();
      const planetsResults = data.results;
      const planetsArray = planetsResults
        .map((planet: Planets) => { delete planet.residents; return planet; });
      setPlanets(planetsArray);
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleFilterChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(target.value);
  };

  const handleFilters = (dataFilters: Filters) => {
    setFilters((prevFilters) => [...prevFilters, dataFilters]);
  };

  const handleDelete = (filterDelet?:string) => {
    if (filterDelet === 'all') {
      setFilters([]);
    } else {
      setFilters(filters.filter(({ columnFilter }) => columnFilter !== filterDelet));
    }
  };

  const handleOrder = (orderParam: Order) => {
    setOrderObj({ order: orderParam });
  };

  return (
    <PlanetContext.Provider
      value={ {
        planets,
        nameFilter,
        handleFilterChange,
        handleFilters,
        orderObj,
        handleOrder,
        handleDelete,
        filters,
      } }
    >
      {!loading
        ? (
          <>
            <Header />
            <Table />
          </>
        )
        : <h2>Loading...</h2>}
    </PlanetContext.Provider>
  );
}

export default App;
