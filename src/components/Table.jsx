import { useContext, useEffect, useState } from 'react';
import { ResidentsContext } from '../context/residentsContext';

function Table() {
  const { planetsData, optionsOnSelected,
    setOptionsOnSelected } = useContext(ResidentsContext);
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
  const [filtersParam, setFiltersParam] = useState([]);

  useEffect(() => {
    setDataFilter([...planetsData]);
  }, [planetsData]);

  useEffect(() => {
    setHandle((prev) => ({
      ...prev,
      columSelect: optionsOnSelected[0],
    }));
  }, [optionsOnSelected]);

  const handleOparatorFilter = () => {
    const { filterCompare, columSelect, filterValue } = handleInputs;
    setOptionsOnSelected(optionsOnSelected.filter((option) => option !== columSelect));
    switch (filterCompare) {
    case 'maior que':
      return (setFiltersParam(
        [...filtersParam, { columSelect, filterCompare, filterValue }],
      ),
      setDataFilter(dataFilter
        .filter((plan) => Number(plan[columSelect]) > Number(filterValue))));
    case 'menor que':
      return (setFiltersParam(
        [...filtersParam, { columSelect, filterCompare, filterValue }],
      ),
      setDataFilter(dataFilter
        .filter((plan) => Number(plan[columSelect]) < Number(filterValue))));
    case 'igual a':
      return (setFiltersParam(
        [...filtersParam, { columSelect, filterCompare, filterValue }],
      ),
      setDataFilter(dataFilter
        .filter((plan) => Number(plan[columSelect]) === Number(filterValue))));
    default:
      break;
    }
  };

  const handleRemoveFilter = (column) => {
    const removeFilter = filtersParam.filter((item) => item.columSelect !== column);
    setFiltersParam([...removeFilter]);
    optionsOnSelected.push(column);
    let newDataFilter = [...planetsData];
    removeFilter.forEach((filter) => {
      if (filter.filterCompare === 'maior que') {
        newDataFilter = newDataFilter
          .filter((item) => Number(item[filter.columSelect])
           > Number(filter.filterValue));
      }
      if (filter.filterCompare === 'menor que') {
        newDataFilter = newDataFilter
          .filter((item) => Number(item[filter.columSelect])
           < Number(filter.filterValue));
      }
      if (filter.filterCompare === 'igual a') {
        newDataFilter = newDataFilter
          .filter((item) => Number(item[filter.columSelect])
           === Number(filter.filterValue));
      }
    });
    setDataFilter([...newDataFilter]);
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
        {optionsOnSelected.map((option) => (
          <option key={ option } value={ option }>{ option }</option>
        ))}
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

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => {
          setFiltersParam([]);
          setDataFilter([...planetsData]);
          setOptionsOnSelected(['population', 'orbital_period',
            'diameter', 'rotation_period', 'surface_water']);
        } }
      >
        Remover Filtros
      </button>

      {filtersParam.length > 0 && (
        filtersParam.map((item) => (
          <section key={ item.columSelect } data-testid="filter">
            <p>{`${item.columSelect} ${item.filterCompare} ${item.filterValue}`}</p>
            <button
              onClick={ () => handleRemoveFilter(item.columSelect) }
            >
              <span>&times;</span>
            </button>
          </section>
        ))
      )}

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
