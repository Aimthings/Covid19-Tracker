import React from 'react';
// import FlipMove from 'react-flip-move';

import { headers } from '../../utils/config/headers';

import CovidTable from './CovidTable';
import TableHeader from './TableHeader';

import './tabular.css';

const Tabular = ({ fullData, isState, sortData, isSorted }) => {

  return (
    <div className="t01tableContainer">
      <div className="t21table" >
        <div onClick={sortData} className="hc301Row Heading">
          {headers.map(({ name, id }, i) => {

            const headerName = !isState && id === 'st' ? 'District' : name;

            return <TableHeader key={i} headerName={headerName} id={id} isSorted={isSorted} />;
          })}
        </div>
        {fullData.map((state) => <CovidTable key={state[ 'id' ]} StateDistData={state} isState={isState} />)}
      </div>
    </div>
  );
}

export default Tabular;
