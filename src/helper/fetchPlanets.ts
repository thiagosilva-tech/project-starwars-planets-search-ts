async function fetchPlanets() {
  try {
    const result = await fetch('https://swapi.dev/api/planets');
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }
    const planets = await result.json();
    return planets;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default fetchPlanets;
