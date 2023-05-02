import { createContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ResidentsContext = createContext();

export default function ResidentsProvider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);

  const dataPanets = useMemo(() => async () => {
    const URL = 'https://swapi.dev/api/planets';
    const fetchData = await fetch(URL);
    const data = await fetchData.json();
    setPlanetsData(data);
    return data;
  }, []);

  useEffect(() => {
    dataPanets();
  }, [dataPanets, dataPanets.count]);

  return (
    <ResidentsContext.Provider value={ { data: planetsData } }>
      {children}
    </ResidentsContext.Provider>
  );
}

ResidentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
