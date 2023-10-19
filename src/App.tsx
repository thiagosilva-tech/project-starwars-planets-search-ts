import React, { useEffect, useState } from 'react';
import './App.css';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './helper/fetchPlanets';
import Table from './components/Table';
import { Filters, Planets } from './type';
import Header from './components/Header';

function App() {
  const [planets, setPlanets] = useState<Planets[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [filters, setFilters] = useState<Filters[]>([]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PlanetContext.Provider
      value={ {
        planets,
        nameFilter,
        handleFilterChange,
        handleFilters,
        handleDelete,
        filters,
      } }
    >
      <Header />
      <Table />
    </PlanetContext.Provider>
  );
}

export default App;
