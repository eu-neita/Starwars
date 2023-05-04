import React, { useContext } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import ResidentsProvider, { ResidentsContext } from '../context/residentsContext';
import Table from '../components/Table';

describe('ResidentsProvider', () => {
  test('should render children', () => {
    const { getByText } = render(
      <ResidentsProvider>
        <div>Test Children</div>
      </ResidentsProvider>
    );
    expect(getByText('Test Children')).toBeInTheDocument();
  });
  test('should table filter by pesquisar', () => {
    const { getByText } = render(
      <ResidentsProvider>
        <Table/>
      </ResidentsProvider>
    );
    waitFor(() => {
      const allPanets = screen.findAllByTestId('planet-name');
      expect(allPanets.length).toBe(10)
    })

  });
  waitFor(() => {
    const inputPesquisar = screen.getByLabelText('Pesquisar:');
    fireEvent.change(inputPesquisar, { target: { value: 's' } });
    const allPanets = screen.findAllByTestId('planet-name');
    expect(allPanets.length).toBe(2)
    fireEvent.change(inputPesquisar, { target: { value: '' } });
    expect(allPanets.length).toBe(10)
  })
  const mockPlanetsData = [
    {
      name: 'Alderaan',
      population: '2000000000',
      diameter: '12500',
      rotation_period: '24',
      orbital_period: '364',
      surface_water: '40',
    },
    {
      name: 'Tatooine',
      population: '200000',
      diameter: '10465',
      rotation_period: '23',
      orbital_period: '304',
      surface_water: '1',
    },
  ];
  const mockOptionsOnSelected = ['population', 'diameter'];
  const mockSetOptionsOnSelected = jest.fn();
  const mockContextValue = {
    planetsData: mockPlanetsData,
    optionsOnSelected: mockOptionsOnSelected,
    setOptionsOnSelected: mockSetOptionsOnSelected,
  };

  it('testa se adiciona filtro', () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );

    const searchInput = screen.getByLabelText('Pesquisar:');
    expect(searchInput).toBeInTheDocument();
    const inputColum = screen.getByLabelText('Column:');
    fireEvent.change(inputColum, { target: { value: 'population' } });
    const inputValue = screen.getByLabelText('Valor:');
    fireEvent.change(inputValue, { target: { value: '20000000' } });
    const inputOperator = screen.getByLabelText('Operador:');
    fireEvent.change(inputOperator, { target: { value: 'maior que' } });
    const aplicarBtn = screen.getByTestId('button-filter');
    fireEvent.click(aplicarBtn)
    const allPanets = screen.getAllByTestId('planet-name');
    expect(allPanets.length).toBe(1)
  });

  it('testa se remove todos os filtros', () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );
    const searchInput = screen.getByLabelText('Pesquisar:');
    expect(searchInput).toBeInTheDocument();
    const inputColum = screen.getByLabelText('Column:');
    fireEvent.change(inputColum, { target: { value: 'population' } });
    const inputValue = screen.getByLabelText('Valor:');
    fireEvent.change(inputValue, { target: { value: '20000000' } });
    const inputOperator = screen.getByLabelText('Operador:');
    fireEvent.change(inputOperator, { target: { value: 'maior que' } });
    const aplicarBtn = screen.getByTestId('button-filter');
    fireEvent.click(aplicarBtn)
    const removeBtn = screen.getByTestId('button-remove-filters');
    fireEvent.click(removeBtn)
    const allPanets = screen.getAllByTestId('planet-name');
    expect(allPanets.length).toBe(2)
  });


});

describe('Testa a página principal', () => {
  test('testa se todos os campos de filtro e botoes aparecem', () => {
    render(<App />);
    expect(screen.getByLabelText('Pesquisar:')).toBeInTheDocument();
    expect(screen.getByLabelText('Column:')).toBeInTheDocument();
    expect(screen.getByLabelText('Valor:')).toBeInTheDocument();
    expect(screen.getByLabelText('Operador:')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
    expect(screen.getByLabelText('ASC')).toBeInTheDocument();
    expect(screen.getByLabelText('DESC')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument();
  });

  test('testa se é renderizado corretamente a lista', async () => {
    render(<App />);
    waitFor(() => {
    const allPanets = screen.findAllByTestId('planet-name');
    expect(allPanets.length).toBe(10)
  })
  });
  
});

