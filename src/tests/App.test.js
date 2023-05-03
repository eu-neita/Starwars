import React, { useContext } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

});

