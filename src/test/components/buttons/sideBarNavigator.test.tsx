import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBarNavigator from '@/components/buttons/sideBarNavigator';

describe('SideBarNavigator Component', () => {
  it('renders the button with the provided icon', () => {
    // Define a sample icon for testing (e.g., a div with some text)
    const testIcon = <div>Test Icon</div>;

    // Render the SideBarNavigator with the test icon
    render(<SideBarNavigator icon={testIcon} />);

    // Use screen queries to assert that the button and icon are in the DOM
    const button = screen.getByRole('button');
    const icon = screen.getByText('Test Icon');

    // Assertions
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});