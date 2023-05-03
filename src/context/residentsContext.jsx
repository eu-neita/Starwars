import { createContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ResidentsContext = createContext();

export default function ResidentsProvider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);
  const [dataFiltredParam, setdataFiltredParam] = useState([]);
  const [optionsOnSelected, setOptionsOnSelected] = useState(['population',
    'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    const dataPanets = async () => {
      const URL = 'https://swapi.dev/api/planets';
      const fetchData = await fetch(URL);
      const data = await fetchData.json();
      setPlanetsData(data.results);
      return data;
    };
    dataPanets();
  }, []);

  const context = useMemo(() => ({
    planetsData,
    setPlanetsData,
    dataFiltredParam,
    setdataFiltredParam,
    optionsOnSelected,
    setOptionsOnSelected,
  }), [dataFiltredParam, optionsOnSelected, planetsData]);

  return (
    <ResidentsContext.Provider value={ context }>
      {children}
    </ResidentsContext.Provider>
  );
}

ResidentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
