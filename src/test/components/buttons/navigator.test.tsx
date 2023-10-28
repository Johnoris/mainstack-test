/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navigator from '@/components/buttons/navigator';
import TestLayout from '@/test/testLayout';

const mockedNavigator = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/home',
  }),
}));

describe('Navigator', () => {
  it('renders the button with the provided name', () => {
    const { getByText } = render(
        <TestLayout>
            <Navigator icon={<span>Icon</span>} name="Home" route="/home" />
        </TestLayout>
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('applies the active class when the route matches the current location', () => {
    mockedNavigator('/home')

    const { getByText } = render(
        <TestLayout>
            <Navigator icon={<span>Icon</span>} name="Home" route="/home" />
        </TestLayout>
    );

    expect(getByText('Home')).toHaveClass('!bg-black300 !text-white');
  });

  it('calls the router function when the button is clicked', () => {
    const { getByText } = render(
        <TestLayout>
            <Navigator icon={<span>Icon</span>} name="Home" route="/home" />
        </TestLayout>
    );

    const button = getByText('Home');
    fireEvent.click(button);

    expect(mockedNavigator).toHaveBeenCalledWith('/home');
  });
});