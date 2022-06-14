/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Content } from '../components/layout/Content';

beforeEach(cleanup);

jest.mock('../components/layout', () => ({
  useProjectsContext: jest.fn(() => ({ darkMode: 1 }))
}));

describe('<Content />', () => {
  it('renders the Content', () => {
    const { queryByTestId } = render(<Content />);
    expect(queryByTestId('content-test')).toBeTruthy();
    expect(queryByTestId('content-test').classList.contains('darkmode')).toBeFalsy();
  });

  it('renders the application using dark mode', () => {
    const { queryByTestId } = render(<Content />);
    expect(queryByTestId('content-test')).toBeTruthy();
    expect(queryByTestId('content-test').classList.contains('darkmode')).toBeTruthy();
  });
});
