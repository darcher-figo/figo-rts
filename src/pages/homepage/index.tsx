import * as React from 'react';
import { title } from './data.fixture';
import './style.scss';

export const Homepage: React.FunctionComponent<{ heading?: string }> = ({
  heading = title,
}): JSX.Element => {
  return (
    <>
      <h1 className="home-title">{heading}</h1>
    </>
  );
};

export default Homepage;
