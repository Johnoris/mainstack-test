import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBarNavigator from '@/components/buttons/sideBarNavigator';

describe('SideBarNavigator Component', () => {
  it('renders the button with the provided icon', () => {
    // sample test iccon
    const testIcon = <div>Test Icon</div>;

    render(<SideBarNavigator icon={testIcon} />);

    // check if buttons are in DOM
    const button = screen.getByRole('button');
    const icon = screen.getByText('Test Icon');

    // Assertions
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});