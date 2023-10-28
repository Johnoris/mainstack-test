/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from '@/components/navigation/nav';
import TestLayout from '@/test/testLayout';
const useFetchUserInfo = require('@/hooks/api/useFetchUserInfo').default


jest.mock('@/hooks/api/useFetchUserInfo'); 
useFetchUserInfo.mockImplementation(() => {
  return [false, 'AB'];
});

describe('Nav', () => {
  // Check if user initials are displayed
  it('renders Nav with user initials', () => {
    render(<TestLayout><Nav/></TestLayout>);

    // Ensure that user initials are displayed
    expect(screen.getByText('AB')).toBeInTheDocument();
    expect(screen.queryByTestId('loading-spinner')).toBeNull();
  });

  // Check if icons and names render correctly
  it('renders Navigator components with correct icons and names', () => {
    render(<TestLayout><Nav/></TestLayout>);

    // Ensure correct navigator names and icons are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('CRM')).toBeInTheDocument();
    expect(screen.getByText('Apps')).toBeInTheDocument();

    // Check if the icons are rendered
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('analytics-icon')).toBeInTheDocument();
    expect(screen.getByTestId('revenue-icon')).toBeInTheDocument();
    expect(screen.getByTestId('crm-icon')).toBeInTheDocument();
    expect(screen.getByTestId('apps-icon')).toBeInTheDocument();
  });

  // notifications and messages buttons are rendered
  it('renders notifications and messages buttons', () => {
    render(<TestLayout><Nav/></TestLayout>);

    // Ensure that the notifications and messages buttons are rendered
    expect(screen.getByTestId('notifications-button')).toBeInTheDocument();
    expect(screen.getByTestId('messages-button')).toBeInTheDocument();
  });

  // Test the hamburger menu and logo
  it('hamburger menu and logo are rendered', () => {
    render(<TestLayout><Nav/></TestLayout>);

    // Ensure that the hamburger menu and logo are rendered
    expect(screen.getByTestId('hamburger-menu')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  // Additional test cases as needed

});