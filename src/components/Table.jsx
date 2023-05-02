import { useContext } from 'react';
import { ResidentsContext } from '../context/residentsContext';

function Table() {
  const { data } = useContext(ResidentsContext);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div>
      {data.length === 0 ? <span>carregando...</span> : (
        <div>
          <thead>
            <th>name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface water</th>
            <th>population</th>
            <th>residents</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </thead>
          <tbody>
            { data.results
              .map((planet) => (
                <tr key={ planet.name }>
                  <tr>{planet.name}</tr>
                  <tr>{planet.rotation_period}</tr>
                  <tr>{planet.orbital_period}</tr>
                  <tr>{planet.diameter}</tr>
                  <tr>{planet.climate}</tr>
                  <tr>{planet.gravity}</tr>
                  <tr>{planet.terrain}</tr>
                  <tr>{planet.surface_water}</tr>
                  <tr>{planet.population}</tr>
                  <tr>{planet.residents}</tr>
                  <tr>{planet.films}</tr>
                  <tr>{planet.created}</tr>
                  <tr>{planet.edited}</tr>
                  <tr>{planet.url}</tr>
                </tr>
              ))}
          </tbody>
        </div>
      )}
    </div>
  );
}

export default Table;
