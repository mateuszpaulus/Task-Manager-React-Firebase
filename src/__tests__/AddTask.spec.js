/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { AddTask } from '../components/AddTask';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useProjectsContext: jest.fn(() => ({ selectedProject: 1 }))
}));

jest.mock('../firebase', () => ({
  firebase: {
    firebase: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('No mock firebase'))
      }))
    }))
  }
}));

describe('<AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Success', () => {
    it('renders the <AddTask />', () => {
      const { queryByTestId } = render(<AddTask />);
      expect(queryByTestId('add-task-confirmation')).toByTruthy();
    });
  });
});
