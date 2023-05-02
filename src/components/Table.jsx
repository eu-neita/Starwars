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
  useEffect(() => {
    if (planetsData.length !== 0) {
      setDataFilter(planetsData.results);
    }
  }, [planetsData.length, planetsData.results]);

  const handleOparatorFilter = () => {
    const { filterCompare, columSelect, filterValue } = handleInputs;
    switch (filterCompare) {
    case 'maior que':
      return (setDataFilter(dataFilter
        .filter((plan) => Number(plan[columSelect]) > Number(filterValue))));
    case 'menor que':
      return (setDataFilter(dataFilter
        .filter((plan) => Number(plan[columSelect]) < Number(filterValue))));
    case 'igual a':
      return (setDataFilter(dataFilter
        .filter((plan) => Number(plan[columSelect]) === Number(filterValue))));
    default:
      break;
    }
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
        onChange={ inputChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
