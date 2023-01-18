import * as React from 'react';
import { title } from './data.fixture';
import './style.scss';

export const approot: React.FC<{ heading?: string }> = ({ heading = title }): JSX.Element => {
  return (
    <>
      <h1 className="app-title">{heading}</h1>
    </>
  );
};

export default approot;
