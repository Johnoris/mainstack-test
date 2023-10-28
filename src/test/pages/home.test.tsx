/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TestLayout from '../testLayout';
import Home from '@/pages/home';
const useFetchAllTransactions = require('@/hooks/api/useFetchAllTransactions').default;
const useFetchWalletDetails = require('@/hooks/api/useFetchWalletDetails').default;

jest.mock('@/hooks/api/useFetchWalletDetails');
jest.mock('@/hooks/api/useFetchAllTransactions');
useFetchWalletDetails.mockImplementation(() => {
    return [
        false,
        {
          balance: 1000.0,
          ledger_balance: 800.0,
          total_payout: 1200.0,
          total_revenue: 1300.0,
          pending_payout: 150.0,
        },
    ];
});

useFetchAllTransactions.mockImplementation(() => {
    return[
        false,
        [
            {
              amount: 100.0,
              date: '2023-10-01',
              metadata: { product_name: 'Product A', type: 'Type A', name: 'Recipient A' },
              type: 'withdrawal',
            },
            {
              amount: 200.0,
              date: '2023-10-02',
              metadata: { product_name: 'Product B', type: 'Type B', name: 'Recipient B' },
              type: 'deposit',
            },
        ],
    ]
})

describe('Home', () => {
  it('renders the Home page', () => {
    render(<TestLayout><Home/></TestLayout>);
  });

  it('displays balance information', () => {
    // Render Home component with mock walletDetails
    render(
      <Home/>
    );

    const availableBalance = screen.getByText('Available Balance');
    const ledgerBalance = screen.getByText('Ledger Balance');
    const totalPayout = screen.getByText('Total Payout');
    const totalRevenue = screen.getByText('Total Revenue');
    const pendingPayout = screen.getByText('Pending Payout');

    expect(availableBalance).toBeInTheDocument();
    expect(ledgerBalance).toBeInTheDocument();
    expect(totalPayout).toBeInTheDocument();
    expect(totalRevenue).toBeInTheDocument();
    expect(pendingPayout).toBeInTheDocument();

    // Verify that the balance values are displayed correctly
    expect(screen.getByText('USD 1,000')).toBeInTheDocument();
    expect(screen.getByText('USD 800')).toBeInTheDocument();
    expect(screen.getByText('USD 1,200')).toBeInTheDocument();
    expect(screen.getByText('USD 1,300')).toBeInTheDocument();
    expect(screen.getByText('USD 150')).toBeInTheDocument();
  });

  it('applies filters when the "Filter" button is clicked', () => {
    render(<TestLayout><Home/></TestLayout>);

    const filterButton = screen.getByTestId('filter-button');
    fireEvent.click(filterButton);

    const filterModal = screen.getByTestId('filter-modal');
    expect(filterModal).toHaveClass('!left-[100vw]')
  });

  it('clears filters closes modal when clicked', () => {
    render(<TestLayout><Home/></TestLayout>);

    const filterButton = screen.getByTestId('filter-button');
    fireEvent.click(filterButton);

    const clearFilterButton = screen.getByTestId('clear-filter-button');
    fireEvent.click(clearFilterButton);

    const filterModal = screen.queryByTestId('filter-modal');
    expect(filterModal).toHaveClass('!left-[100vw]')
  });

  it('renders transaction cards', () => {
    // Render Home component with mock transactions
    render(
      <Home/>
    );

    const transactionCards = screen.getAllByTestId('transaction-card');
    expect(transactionCards).toHaveLength(2);
  });
});