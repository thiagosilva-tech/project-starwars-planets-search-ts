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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PlanetContext.Provider value={ planets }>
      <Header />
      <Table />
    </PlanetContext.Provider>
  );
}

export default App;
