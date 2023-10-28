import App from '@/app/app';
import { render } from '@testing-library/react';

test('App renders without crashing', () => {
    render(<App />);
});