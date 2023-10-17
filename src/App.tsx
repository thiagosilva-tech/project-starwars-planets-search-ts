import React, { useEffect, useState } from 'react';
import './App.css';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './helper/fetchPlanets';
import Table from './components/Table';
import { Planets } from './type';
import Header from './components/Header';

function App() {
  const [planets, setPlanets] = useState<Planets[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PlanetContext.Provider value={ { planets, nameFilter, handleFilterChange } }>
      <Header />
      <Table />
    </PlanetContext.Provider>
  );
}

export default App;
