import * as React from 'react';
import { title } from './data.fixture';
import './style.scss';

export const Quote: React.FC<{ heading?: string }> = ({ heading = title }): JSX.Element => {
  return (
    <>
      <h1 className="quote-title">{heading}</h1>
    </>
  );
};

export default Quote;
