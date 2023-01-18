import * as React from 'react';
import { render } from '@testing-library/react';
import { title } from './data.fixture';
import Component from '.';

it('renders page title', () => {
  const { container }: { container: HTMLElement } = render(<Component />);
  const heading: string | null = container.textContent;
  expect(heading).toMatch(title);
});
