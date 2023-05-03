import { useContext, useEffect, useState } from 'react';
import { ResidentsContext } from '../context/residentsContext';

function Table() {
  const { planetsData } = useContext(ResidentsContext);
  const [handleInputs, setHandle] = useState({
    search: '',
    filterValue: 0,
    filterCompare: 'maior que',
    columSelect: 'population',
  });
  const inputChange = ({ target }) => {
    const { value, name } = target;
    setHandle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [dataFilter, setDataFilter] = useState([]);
  const [dataObject, setDataObject] = useState([]);
  useEffect(() => {
    if (planetsData.length !== 0) {
      setDataFilter(planetsData.results);
    }

    dataObject.forEach((obj) => {
      let filteredData;
      switch (obj.filterCompare) {
      case 'maior que':
        filteredData = dataFilter.filter(
          (plan) => Number(plan[obj.columSelect]) > Number(obj.filterValue),
        );
        break;
      case 'menor que':
        filteredData = dataFilter.filter(
          (plan) => Number(plan[obj.columSelect]) < Number(obj.filterValue),
        );
        break;
      case 'igual a':
        filteredData = dataFilter.filter(
          (plan) => Number(plan[obj.columSelect]) === Number(obj.filterValue),
        );
        break;
      default:
        break;
      }
      setDataFilter(filteredData);
    });
  }, [dataFilter, dataObject, planetsData.length, planetsData.results]);
  const [columIsTrue, setColumIsTrue] = useState({
    population: false,
    orbital_period: false,
    diameter: false,
    rotation_period: false,
    surface_water: false,
  });
  console.log(dataObject);
  const handleOparatorFilter = () => {
    const { filterCompare, columSelect, filterValue } = handleInputs;
    setColumIsTrue((prev) => ({
      ...prev,
      [columSelect]: true,
    }));
    setDataObject((prev) => {
      const magicNumber = -1;
      const index = prev.findIndex((obj) => obj.columSelect === columSelect);
      if (index !== magicNumber) {
        prev[index] = { filterCompare, columSelect, filterValue };
        return [...prev];
      }
      return [...prev, { filterCompare, columSelect, filterValue }];
    });
  };

  return (
    <div>
      <label htmlFor="search">Pesquisar:</label>
      <input
        data-testid="name-filter"
        type="text"
        name="search"
        id="search"
        value={ handleInputs.search }
        onChange={ inputChange }
        placeholder="Pesquisar"
      />
      <label htmlFor="columSelect">Column:</label>
      <select
        name="columSelect"
        data-testid="column-filter"
        id="columSelect"
        value={ handleInputs.columSelect }
        onClick={ inputChange }
      >
        {!columIsTrue.population && <option value="population">population</option>}
        {!columIsTrue.orbital_period
        && <option value="orbital_period">orbital_period</option>}
        {!columIsTrue.diameter
        && <option value="diameter">diameter</option>}
        {!columIsTrue.rotation_period
        && <option value="rotation_period">rotation_period</option>}
        {!columIsTrue.surface_water
        && <option value="surface_water">surface_water</option>}
      </select>

      <label htmlFor="valueFilter">Valor:</label>
      <input
        type="number"
        id="valueFilter"
        data-testid="value-filter"
        value={ handleInputs.filterValue }
        onChange={ inputChange }
        name="filterValue"
        placeholder="0"
      />
      <label htmlFor="comparisonFilter">Operador:</label>
      <select
        name="filterCompare"
        id="comparisonFilter"
        data-testid="comparison-filter"
        value={ handleInputs.filterCompare }
        onChange={ inputChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleOparatorFilter }
      >
        Aplicar
      </button>
      {dataObject.length !== 0 && dataObject.map((filters, i) => (
        <div key={ i } data-testid="filter">
          <span>
            {filters.columSelect}
            {' '}
            {filters.filterCompare}
            {' '}
            {filters.filterValue}
          </span>
          <button
            onClick={ () => {
              setDataObject(dataObject.filter((f) => filters
                .columSelect !== f.columSelect));
              setColumIsTrue((prev) => ({
                ...prev,
                [filters.columSelect]: false,
              }));
            } }
          >
            Remover

          </button>
        </div>
      )) }
      {planetsData.length === 0 ? <span>carregando...</span> : (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>climate</th>
              <th>gravity</th>
              <th>terrain</th>
              <th>surface water</th>
              <th>population</th>
              <th>films</th>
              <th>created</th>
              <th>edited</th>
              <th>url</th>
            </tr>
          </thead>
          <tbody>
            { dataFilter
              .filter((item) => item.name.toLowerCase().includes(handleInputs.search))
              .map((planet) => (
                <tr key={ planet.name }>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
