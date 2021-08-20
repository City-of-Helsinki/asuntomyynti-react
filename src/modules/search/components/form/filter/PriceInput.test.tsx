import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PriceInput from './PriceInput';

test('renders PriceInput with correct label', () => {
  render(
    <BrowserRouter>
      <PriceInput name={'testName'} label={'testLabel'} />
    </BrowserRouter>
  );

  expect(screen.getByLabelText('testLabel')).toBeDefined();
});
