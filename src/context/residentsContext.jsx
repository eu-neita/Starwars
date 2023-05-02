import { createContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ResidentsContext = createContext();

export default function ResidentsProvider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);

  useEffect(() => {
    const dataPanets = async () => {
      const URL = 'https://swapi.dev/api/planets';
      const fetchData = await fetch(URL);
      const data = await fetchData.json();
      setPlanetsData(data);
      return data;
    };
    dataPanets();
  }, []);

  const context = useMemo(() => ({
    planetsData,

  }), [planetsData]);

  return (
    <ResidentsContext.Provider value={ context }>
      {children}
    </ResidentsContext.Provider>
  );
}

ResidentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
