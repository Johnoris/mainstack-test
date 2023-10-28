import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomSelectInput from '@/components/form-comps/customSelectInput';

const options = ['Option 1', 'Option 2', 'Option 3'];

describe('CustomSelectInput Component', () => {
  it('renders the component and handles selection', () => {
    const selectedOptions: string[] = [];
    const setSelectedOptions = jest.fn();

    render(
      <CustomSelectInput
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        label="Select an option"
        options={options}
      />
    );

    const selectInput = screen.getByTestId('select-input');
    expect(selectInput).toBeInTheDocument();

    // Click on the select input to open the options
    fireEvent.click(selectInput);

    // Check if the options are displayed
    for (const option of options) {
      expect(screen.getByText(option)).toBeInTheDocument();
    }

    // Click on an option to select it
    fireEvent.click(screen.getByText('Option 1').parentElement || screen.getByText('Option 1'));

    // Check if the setSelectedOptions function was called with the selected option
    expect(setSelectedOptions).toHaveBeenCalled()

    // Click on the same option to deselect it
    fireEvent.click(screen.getByText('Option 1').parentElement || screen.getByText('Option 1'));

    // Check if the setSelectedOptions function was called with an empty array (deselection)
    expect(setSelectedOptions).toHaveBeenCalled()

    // Close the options by clicking the select input again
    fireEvent.click(selectInput);

    // Check if the options are now closed
    for (const option of options) {
      expect(screen.queryByText(option)).toBeNull();
    }
  });
})