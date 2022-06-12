/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEventm, queryByTestId } from '@testing-library/react';
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
    it('renders the task checkbox', () => {
      const { queryByTestId } = render(<Checkbox id="1" />);
      expect(queryByTestId('checkbox-archived-test')).toBeTruthy();
    });
    it('renders the task checkbox and accepts a click', () => {
      const { queryByTestId } = render(<Checkbox id="1" />);
      expect(queryByTestId('checkbox-archived-test')).toBeTruthy();
    })
  });
  // describe('Failure', () => {
  // });
});
