import React from 'react';
import { render } from '@testing-library/react';
import SideBar from '@/components/navigation/sideBar';

describe('SideBar', () => {
  it('renders SideBarNavigator with icons', () => {
    const { getByTestId } = render(<SideBar />);

    // Check if the SideBarNavigator components are rendered with correct icons
    const linkIcon = getByTestId('link-icon');
    const storeIcon = getByTestId('store-icon');
    const mediaKitIcon = getByTestId('media-kit-icon');
    const invoicingIcon = getByTestId('invoicing-icon');

    expect(linkIcon).toBeInTheDocument();
    expect(storeIcon).toBeInTheDocument();
    expect(mediaKitIcon).toBeInTheDocument();
    expect(invoicingIcon).toBeInTheDocument();
  });
});