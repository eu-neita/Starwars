import { useContext, useEffect, useState } from 'react';
import { ResidentsContext } from '../context/residentsContext';

function Table() {
  const { planetsData, dataFiltredParam,
    setdataFiltredParam } = useContext(ResidentsContext);
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
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
  useEffect(() => {
    setPlanetsFiltered([...planetsData]);
  }, [planetsData]);

  const funcFilter = (filterCompare, columSelect, filterValue) => {
    const filteredData = planetsFiltered.filter((plan) => {
      switch (filterCompare) {
      case 'maior que':
        return Number(plan[columSelect]) > Number(filterValue);
      case 'menor que':
        return Number(plan[columSelect]) < Number(filterValue);
      case 'igual a':
        return Number(plan[columSelect]) === Number(filterValue);
      default:
        return 0;
      }
    });
    setPlanetsFiltered(filteredData.length === 0 ? [...planetsData] : [...filteredData]);
  };

  const handleOparatorFilter = () => {
    const { filterCompare, columSelect, filterValue } = handleInputs;
    setdataFiltredParam((prev) => [
      ...prev,
      {
        filterCompare,
        columSelect,
        filterValue,
      },
    ]);
    funcFilter(filterCompare, columSelect, filterValue);
  };
  useEffect(() => {
    console.log(dataFiltredParam);
  }, [dataFiltredParam]);
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
        {!dataFiltredParam.some((it) => it.columSelect === 'population')
           && <option value="population">population</option>}
        {!dataFiltredParam.some((it) => it.columSelect === 'orbital_period')
           && <option value="orbital_period">orbital_period</option>}
        {!dataFiltredParam.some((it) => it.columSelect === 'diameter')
           && <option value="diameter">diameter</option>}
        {!dataFiltredParam.some((it) => it.columSelect === 'rotation_period')
           && <option value="rotation_period">rotation_period</option>}
        {!dataFiltredParam.some((it) => it.columSelect === 'surface_water')
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
      {dataFiltredParam && dataFiltredParam.map((e) => (
        <div key={ e.filterCompare }>
          <span>{`${e.columSelect} ${e.filterCompare} ${e.filterValue}`}</span>
          <button
            onClick={ () => {
              setdataFiltredParam(dataFiltredParam.filter((d) => e
                .columSelect !== d.columSelect));
            } }
          >
            Remove
          </button>
        </div>
      ))}
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
            { planetsFiltered
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
