import React from 'react';
import { render, screen } from '@testing-library/react';
import EventForm from './index';
import { Provider } from 'react-redux';

test('render Event form component', () => {
  render(<EventForm />);
  const labelElement = screen.getByText(/Event Name/i);
  expect(labelElement).toBeInTheDocument();
});
