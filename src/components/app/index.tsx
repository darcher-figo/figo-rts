import * as React from 'react';
import './style.scss';

export const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <h1 className="app-title">
        Figo<span className="title-abbr">RTS</span>
      </h1>
    </>
  );
};

export default App;
