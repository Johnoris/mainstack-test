import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DateFilter from '@/components/filter/dateFilter';

describe('DateFilter Component', () => {
  // ... Previous test cases

  it('date changes on input', () => {
    render(
      <DateFilter startDate={null} setStartDate={() => {}} endDate={null} setEndDate={() => {}} />
    );

    const startDatePicker = screen.getByTestId('start-date-picker').querySelector('input')
    const endDatePicker = screen.getByTestId('end-date-picker').querySelector('input')

    // fire change events
    if(startDatePicker){
        fireEvent.change(startDatePicker, { target: { value: '2023-01-01' } });
    }
    if(endDatePicker){
        fireEvent.change(endDatePicker, { target: { value: '2023-02-01' } });
    }

    // expect date pickers values to have changed
    expect(startDatePicker).toHaveValue('2023-01-01');
    expect(endDatePicker).toHaveValue('2023-02-01');
  });
});