import React from 'react';

import { headers } from '../../utils/config/headers';

import TabularData from './TabularData';

import './tabular.css';

const Tabular = ({ fullData, isState }) => {
  return (
    <div>
      <div className="hc301HeaderContainer">
        {headers.map(header => (
          < div className="hc311headers" key={header.id}>{`${!isState && header.id === 'st' ? 'District' : header.name}`}</div>
        ))}
      </div>
      {
        fullData.map((state, id) => {
          return <TabularData key={id} StateDistData={state} isState={isState} />
        })
      }
    </div >
  );
}

export default Tabular;
