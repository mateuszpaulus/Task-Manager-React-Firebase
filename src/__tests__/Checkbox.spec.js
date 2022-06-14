/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';

beforeEach(cleanup);

jest.mock('../firebase', () => ({
  firebase: {
    firebase: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn()
        }))
      }))
    }))
  }
}));

describe('<Checkbox />', () => {
  describe('Success', () => {
    it('renders checkbox', () => {
      const { queryByTestId } = render(<Checkbox id="1" />);
      expect(queryByTestId('checkbox-archived-test')).toBeTruthy();
    });
    it('renders checkbox and accepts a onClick', () => {
      const { queryByTestId } = render(<Checkbox id="1" />);
      expect(queryByTestId('checkbox-archived-test')).toBeTruthy();
      fireEvent.click(queryByTestId('checkbox-archived-test'));
    });
  });
  it('renders checkbox and accepts a onKeyDown', () => {
    const { queryByTestId } = render(<Checkbox id="1" />);
    expect(queryByTestId('checkbox-archived-test')).toBeTruthy();
    fireEvent.keyDown(queryByTestId('checkbox-archived-test'), {
      key: 'Enter',
      code: 13
    });
  });
});
