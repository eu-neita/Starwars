import { useContext, useState } from 'react';
import { ResidentsContext } from '../context/residentsContext';

function Table() {
  const { planetsData } = useContext(ResidentsContext);
  const [handleInputs, setHandle] = useState({
    search: '',
  });
  const inputChange = ({ target }) => {
    const { value, name } = target;

    setHandle((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            { planetsData.results
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
