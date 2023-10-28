import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionCard from '@/components/cards/transactionCard';

describe('TransactionCard Component', () => {
  it('renders correct data', () => {
    const sampleTransaction = {
      description: 'Sample Transaction',
      recipient: 'John Doe',
      amount: 1000,
      date: '2023-10-25',
      outflow: true,
    };

    render(
      <TransactionCard
        description={sampleTransaction.description}
        recipient={sampleTransaction.recipient}
        amount={sampleTransaction.amount}
        date={sampleTransaction.date}
        outflow={sampleTransaction.outflow}
      />
    );

    const description = screen.getByText('Sample Transaction');
    const recipient = screen.getByText('John Doe');
    const amount = screen.getByText('USD 1,000');
    const date = screen.getByText('2023-10-25');
    const arrow = screen.getByTestId('arrow');

    expect(description).toBeInTheDocument();
    expect(recipient).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveClass('!rotate-180 !bg-red100 !fill-red400');
  });
});





