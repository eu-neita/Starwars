import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import ResidentsProvider, { ResidentsContext } from '../context/residentsContext';
import Table from '../components/Table';
import setClickSort from '../hook/useClickSort';

describe('ResidentsProvider', () => {
  test('should render children', () => {
    const { getByText } = render(
      <ResidentsProvider>
        <div>Test Children</div>
      </ResidentsProvider>
    );
    expect(getByText('Test Children')).toBeInTheDocument();
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
    {
      name: 'unknown',
      population: 'unknown',
      diameter: 'unknown',
      rotation_period: 'unknown',
      orbital_period: 'unknown',
      surface_water: 'unknown',
    },
  ];
  const mockOptionsOnSelected = ['population',
  'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];
  const mockSetOptionsOnSelected = jest.fn();
  const mockContextValue = {
    planetsData: mockPlanetsData,
    optionsOnSelected: mockOptionsOnSelected,
    setOptionsOnSelected: mockSetOptionsOnSelected,
  };

  it('testa se adiciona filtro com os todos os casos de options', async () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );
    const optionsOnSort = ['population',
    'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
    const optionsOn = ['menor que', 'maior que', 'igual a'];
    optionsOnSort.map((op) => { 
      const searchInput = screen.getByLabelText('Pesquisar:');
      expect(searchInput).toBeInTheDocument();
      const inputColum = screen.getByLabelText('Column:');
      fireEvent.change(inputColum, { target: { value: op } });
      const inputValue = screen.getByLabelText('Valor:');
      fireEvent.change(inputValue, { target: { value: '0' } });
      const inputOperator = screen.getByLabelText('Operador:');
      fireEvent.change(inputOperator, { target: { value: 'menor que' } });
      waitFor(() => {expect(inputColum.value).toBe(op)})
    })

    optionsOn.map((oed) => {
      const searchInput = screen.getByLabelText('Pesquisar:');
      expect(searchInput).toBeInTheDocument();
      const inputColum = screen.getByLabelText('Column:');
      fireEvent.change(inputColum, { target: { value: 'population' } });
      const inputValue = screen.getByLabelText('Valor:');
      fireEvent.change(inputValue, { target: { value: '104650' } });
      const inputOperator = screen.getByLabelText('Operador:');
      fireEvent.change(inputOperator, { target: { value: oed } });
      waitFor(() => {expect(inputOperator.value).toBe(oed)})
    })

  });

  it('testa se adiciona filtro igual a', async () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );

    const searchInput = screen.getByLabelText('Pesquisar:');
    expect(searchInput).toBeInTheDocument();
    const inputColum = screen.getByLabelText('Column:');
    fireEvent.change(inputColum, { target: { value: 'orbital_period' } });
    const inputValue = screen.getByLabelText('Valor:');
    fireEvent.change(inputValue, { target: { value: '305' } });
    const inputOperator = screen.getByLabelText('Operador:');
    fireEvent.change(inputOperator, { target: { value: 'menor que' } });
    const aplicarBtn = screen.getByTestId('button-filter');
    const optionElement = screen.getAllByRole('option', { name: 'orbital_period' });
    expect(optionElement.length).toBe(2)
    fireEvent.click(aplicarBtn)
    const allPanets = screen.getAllByTestId('planet-name');
    expect(allPanets.length).toBe(1)
    expect(allPanets[0]).toHaveTextContent('Tatooine')
    waitFor(() => {expect(optionElement.length).toBe(1)});
  });

  it('testa se adiciona filtro igual a com rotation_period', async () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );

    const searchInput = screen.getByLabelText('Pesquisar:');
    expect(searchInput).toBeInTheDocument();
    const inputColum = screen.getByLabelText('Column:');
    fireEvent.change(inputColum, { target: { value: 'rotation_period' } });
    const inputValue = screen.getByLabelText('Valor:');
    fireEvent.change(inputValue, { target: { value: '24' } });
    const inputOperator = screen.getByLabelText('Operador:');
    fireEvent.change(inputOperator, { target: { value: 'igual a' } });
    const aplicarBtn = screen.getByTestId('button-filter');
    const optionElement = screen.getAllByRole('option', { name: 'rotation_period' });
    expect(optionElement.length).toBe(2)
    fireEvent.click(aplicarBtn)
    const allPanets = screen.getAllByTestId('planet-name');
    expect(allPanets.length).toBe(1)
    expect(allPanets[0]).toHaveTextContent('Alderaan')
    waitFor(() => {expect(optionElement.length).toBe(1)});
  });

  it('testa se adiciona filtro', async () => {
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
    const optionElement = screen.getAllByRole('option', { name: 'population' });
    expect(optionElement.length).toBe(2)
    fireEvent.click(aplicarBtn)
    const allPanets = screen.getAllByTestId('planet-name');
    expect(allPanets.length).toBe(1)
    waitFor(() => {expect(optionElement.length).toBe(1)});
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
    expect(allPanets.length).toBe(3)
  });

  it('testa se remove um filtro especifico', () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );
    const searchInput = screen.getByLabelText('Pesquisar:');
    expect(searchInput).toBeInTheDocument();
    const inputColum = screen.getByLabelText('Column:');
    fireEvent.change(inputColum, { target: { value: 'rotation_period' } });
    const inputValue = screen.getByLabelText('Valor:');
    fireEvent.change(inputValue, { target: { value: '20000000' } });
    const inputOperator = screen.getByLabelText('Operador:');
    fireEvent.change(inputOperator, { target: { value: 'menor que' } });
    const aplicarBtn = screen.getByTestId('button-filter');
    fireEvent.click(aplicarBtn)
    fireEvent.change(inputColum, { target: { value: 'diameter' } });
    fireEvent.change(inputValue, { target: { value: '0' } });
    fireEvent.change(inputOperator, { target: { value: 'menor que' } });
    fireEvent.click(aplicarBtn)
    
    const allfilter = screen.getAllByTestId('filter');
    const removeFilters = screen.getAllByText('×');
    expect(allfilter.length).toBe(2)
    fireEvent.click(removeFilters[1])
    const allPanets = screen.getAllByTestId('planet-name');
    expect(allPanets.length).toBe(2)
  });

  it('testa se remove um filtro especifico', () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );
    const searchInput = screen.getByLabelText('Pesquisar:');
    expect(searchInput).toBeInTheDocument();
    const inputColum = screen.getByLabelText('Column:');
    fireEvent.change(inputColum, { target: { value: 'rotation_period' } });
    const inputValue = screen.getByLabelText('Valor:');
    fireEvent.change(inputValue, { target: { value: '20000000' } });
    const inputOperator = screen.getByLabelText('Operador:');
    fireEvent.change(inputOperator, { target: { value: 'igual a' } });
    const aplicarBtn = screen.getByTestId('button-filter');
    fireEvent.click(aplicarBtn)
    fireEvent.change(inputColum, { target: { value: 'diameter' } });
    fireEvent.change(inputValue, { target: { value: '0' } });
    fireEvent.change(inputOperator, { target: { value: 'igual a' } });
    fireEvent.click(aplicarBtn)
    
    const allfilter = screen.getAllByTestId('filter');
    const removeFilters = screen.getAllByText('×');
    expect(allfilter.length).toBe(2)
    fireEvent.click(removeFilters[1])
  });


  it('testa se remove um filtro especifico e se adiciona mais de 1 filtro filtros', () => {
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
    fireEvent.change(inputColum, { target: { value: 'diameter' } });
    fireEvent.change(inputValue, { target: { value: '0' } });
    fireEvent.change(inputOperator, { target: { value: 'menor que' } });
    fireEvent.click(aplicarBtn)
    
    const allfilter = screen.getAllByTestId('filter');
    const removeFilters = screen.getAllByText('×');
    expect(allfilter.length).toBe(2)
    fireEvent.click(removeFilters[1])
    const allPanets = screen.getAllByTestId('planet-name');
    expect(allPanets.length).toBe(1)
  });

  it('testa consigo usar o sort ASC e unknown fica sempre em ultimo', () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );
    const desc = screen.getByTestId('column-sort-input-desc');
    fireEvent.click(desc)
    const asc = screen.getByTestId('column-sort-input-asc');
    fireEvent.click(asc)
    const aplicarBtnSort = screen.getByTestId('column-sort-button');
    fireEvent.click(aplicarBtnSort)
    
    const allPanets = screen.getAllByTestId('planet-name');
    const allUnk = screen.getAllByText('unknown');
    expect(allPanets[0]).toHaveTextContent('Tatooine')
    expect(allPanets[2]).toHaveTextContent('unknown')
    expect(allUnk.length).toBe(6);
  });

  it('testa consigo usar o sort DESC  e unknown fica sempre em ultimo', () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );

    const aplicarBtnSort = screen.getByTestId('column-sort-button');
    const desc = screen.getByTestId('column-sort-input-desc');
    fireEvent.click(desc)
    fireEvent.click(aplicarBtnSort)
    const allPanets = screen.getAllByTestId('planet-name');
    expect(allPanets[0]).toHaveTextContent('Alderaan')
    expect(allPanets[2]).toHaveTextContent('unknown')
  });

  it('testa consigo usar o sort DESC com o diamiter e unknown fica sempre em ultimo', () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );

    const aplicarBtnSort = screen.getByTestId('column-sort-button');
    const desc = screen.getByTestId('column-sort-input-desc');
    fireEvent.click(desc)
    fireEvent.click(aplicarBtnSort)
    const inputColum = screen.getByTestId('column-sort');
    fireEvent.change(inputColum, { target: { value: 'diameter' } });
    const allPanets = screen.getAllByTestId('planet-name');
    expect(allPanets[0]).toHaveTextContent('Alderaan')
    expect(allPanets[2]).toHaveTextContent('unknown')
  });

  it('testa consigo usar o sort DESC com o diamiter e unknown fica sempre em ultimo', () => {
    render(
      <ResidentsContext.Provider value={mockContextValue}>
        <Table />
      </ResidentsContext.Provider>
    );

    const optionsOnSort = ['population',
    'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
    optionsOnSort.map((poh) => {
    const aplicarBtnSort = screen.getByTestId('column-sort-button');
    const desc = screen.getByTestId('column-sort-input-desc');
    fireEvent.click(desc);
    fireEvent.click(aplicarBtnSort);
    const inputColum = screen.getByTestId('column-sort');
    fireEvent.change(inputColum, { target: { value: poh} });
    const allPanets = screen.getAllByTestId('planet-name');
    expect(allPanets[2]).toHaveTextContent('unknown')
  });
})
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
    expect(allPanets.length).toBe(10);
  })
  });
  
});

describe('setClickSort function', () => {
  const planetsData = [    { id: 1, name: 'Mercury', distance: '0.39' },    { id: 2, name: 'Venus', distance: '0.72' },    { id: 3, name: 'Earth', distance: '1' },    { id: 4, name: 'Mars', distance: '1.52' },  ];

  const handleSelectOnSort = 'distance';
  
  it('should return an array sorted in ascending order', () => {
    const sortRadio = 'ASC';
    const expectedData = [      { id: 1, name: 'Mercury', distance: '0.39' },      { id: 2, name: 'Venus', distance: '0.72' },      { id: 3, name: 'Earth', distance: '1' },      { id: 4, name: 'Mars', distance: '1.52' },    ];
    const actualData = setClickSort(planetsData, handleSelectOnSort, sortRadio);
    expect(actualData).toEqual(expectedData);
  });

  it('should return an array sorted in descending order', () => {
    const sortRadio = 'DESC';
    const expectedData = [      { id: 4, name: 'Mars', distance: '1.52' },      { id: 3, name: 'Earth', distance: '1' },      { id: 2, name: 'Venus', distance: '0.72' },      { id: 1, name: 'Mercury', distance: '0.39' },    ];
    const actualData = setClickSort(planetsData, handleSelectOnSort, sortRadio);
    expect(actualData).toEqual(expectedData);
  });

  it('should handle NaN values by placing them last in ascending order', () => {
    const sortRadio = 'ASC';
    const dataWithNaN = [      { id: 1, name: 'Mercury', distance: '0.39' },      { id: 2, name: 'Venus', distance: '0.72' },      { id: 3, name: 'Earth', distance: 'N/A' },      { id: 4, name: 'Mars', distance: '1.52' },    ];
    const expectedData = [      { id: 1, name: 'Mercury', distance: '0.39' },      { id: 2, name: 'Venus', distance: '0.72' },      { id: 4, name: 'Mars', distance: '1.52' },      { id: 3, name: 'Earth', distance: 'N/A' },    ];
    const actualData = setClickSort(dataWithNaN, handleSelectOnSort, sortRadio);
    expect(actualData).toEqual(expectedData);
  });

  it('should handle NaN values by placing them first in descending order', () => {
    const planetsData = [
      { name: 'Earth', population: 1000 },
      { name: 'Mars', population: 'unknown' },
      { name: 'Jupiter', population: 5000 },
      { name: 'Venus', population: 'invalid' },
    ];
    const handleSelectOnSort = 'population';
    const sortRadio = 'DESC';
    const expectedData = [
      { name: 'Mars', population: 'unknown' },
      { name: 'Earth', population: 1000 },
      { name: 'Venus', population: 'invalid' },
      { name: 'Jupiter', population: 5000 },
    ];

  });
});
