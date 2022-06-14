/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup);

describe('<App />', () => {
  it('render the app', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('app-test')).toBeTruthy();
  });
});
