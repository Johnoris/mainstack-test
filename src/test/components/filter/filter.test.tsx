import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Filter from '@/components/filter/filter';

describe('Filter Component', () => {
  it('renders the filter modal when active', () => {
    render(
      <Filter
        filterActive={true}
        setFilterActive={() => {}}
        reference={null}
        startDate={null}
        setStartDate={() => {}}
        endDate={null}
        setEndDate={() => {}}
        selectedTransactionTypes={[]}
        setSelectedTransactionTypes={() => {}}
        selectedTransactionStatus={[]}
        setSelectedTransactionStatus={() => {}}
        clearFilters={() => {}}
        setDateFilterInfo={() => {}}
        setStatusFilterInfo={() => {}}
        setTypeFilterInfo={() => {}}
      />
    );

    const filterModal = screen.getByTestId('filter-modal');
    expect(filterModal).toBeInTheDocument();
  });

  it('does not render the filter modal when not active', () => {
    render(
      <Filter
        filterActive={false}
        setFilterActive={() => {}}
        reference={null}
        startDate={null}
        setStartDate={() => {}}
        endDate={null}
        setEndDate={() => {}}
        selectedTransactionTypes={[]}
        setSelectedTransactionTypes={() => {}}
        selectedTransactionStatus={[]}
        setSelectedTransactionStatus={() => {}}
        clearFilters={() => {}}
        setDateFilterInfo={() => {}}
        setStatusFilterInfo={() => {}}
        setTypeFilterInfo={() => {}}
      />
    );

    const filterModal = screen.queryByTestId('filter-modal');
    expect(filterModal).toHaveClass('!left-[100vw]')
  });

  it('applies filters on apply button click', () => {
    const mockSetDateFilterInfo = jest.fn();
    const mockSetTypeFilterInfo = jest.fn();
    const mockSetStatusFilterInfo = jest.fn();
    const mockSetFilterActive = jest.fn();

    render(
      <Filter
        filterActive={true}
        setFilterActive={mockSetFilterActive}
        reference={null}
        startDate={null}
        setStartDate={() => {}}
        endDate={null}
        setEndDate={() => {}}
        selectedTransactionTypes={['Store Transactions']}
        setSelectedTransactionTypes={() => {}}
        selectedTransactionStatus={['Successful']}
        setSelectedTransactionStatus={() => {}}
        clearFilters={() => {}}
        setDateFilterInfo={mockSetDateFilterInfo}
        setStatusFilterInfo={mockSetStatusFilterInfo}
        setTypeFilterInfo={mockSetTypeFilterInfo}
      />
    );

    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

    expect(mockSetDateFilterInfo).toHaveBeenCalledWith({
      dateActive: false,
      dateLowerLimit: null,
      dateUpperLimit: null,
    });
    expect(mockSetTypeFilterInfo).toHaveBeenCalledWith({
      typeActive: true,
      typeArray: ['Store Transactions'],
    });
    expect(mockSetStatusFilterInfo).toHaveBeenCalledWith({
      statusActive: true,
      statusArray: ['Successful'],
    });

    expect(mockSetFilterActive).toHaveBeenCalledWith(false);
  });

  it('clears filters on clear button click', () => {
    const mockClearFilters = jest.fn();
    const mockSetFilterActive = jest.fn();

    render(
      <Filter
        filterActive={true}
        setFilterActive={mockSetFilterActive}
        reference={null}
        startDate={null}
        setStartDate={() => {}}
        endDate={null}
        setEndDate={() => {}}
        selectedTransactionTypes={['Store Transactions']}
        setSelectedTransactionTypes={() => {}}
        selectedTransactionStatus={['Successful']}
        setSelectedTransactionStatus={() => {}}
        clearFilters={mockClearFilters}
        setDateFilterInfo={() => {}}
        setStatusFilterInfo={() => {}}
        setTypeFilterInfo={() => {}}
      />
    );

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(mockClearFilters).toHaveBeenCalledTimes(1);
    expect(mockSetFilterActive).toHaveBeenCalledWith(false);
  });

  it('applies date filter when there is start and end date', () => {
    const mockSetDateFilterInfo = jest.fn();

    render(
      <Filter
        filterActive={true}
        setFilterActive={() => {}}
        reference={null}
        startDate="2023-10-01"
        setStartDate={() => {}}
        endDate="2023-10-31"
        setEndDate={() => {}}
        selectedTransactionTypes={[]}
        setSelectedTransactionTypes={() => {}}
        selectedTransactionStatus={[]}
        setSelectedTransactionStatus={() => {}}
        clearFilters={() => {}}
        setDateFilterInfo={mockSetDateFilterInfo}
        setStatusFilterInfo={() => {}}
        setTypeFilterInfo={() => {}}
      />
    );

    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

    expect(mockSetDateFilterInfo).toHaveBeenCalledWith({
      dateActive: true,
      dateLowerLimit: "2023-10-01",
      dateUpperLimit: "2023-10-31",
    });
  });

  it('clears date filter when there is no start date or end date', () => {
    const mockSetDateFilterInfo = jest.fn();

    render(
      <Filter
        filterActive={true}
        setFilterActive={() => {}}
        reference={null}
        startDate="2023-10-01"
        setStartDate={() => {}}
        endDate={null}
        setEndDate={() => {}}
        selectedTransactionTypes={[]}
        setSelectedTransactionTypes={() => {}}
        selectedTransactionStatus={[]}
        setSelectedTransactionStatus={() => {}}
        clearFilters={() => {}}
        setDateFilterInfo={mockSetDateFilterInfo}
        setStatusFilterInfo={() => {}}
        setTypeFilterInfo={() => {}}
      />
    );

    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

    expect(mockSetDateFilterInfo).toHaveBeenCalledWith({
      dateActive: false,
      dateLowerLimit: null,
      dateUpperLimit: null,
    });
  });
});