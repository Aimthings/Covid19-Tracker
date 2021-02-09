import React from 'react';
import { Link } from 'react-router-dom';

import { STATECODES } from '../../../utils/config/States';
import { CroreLakh } from '../../../utils/Helpers/FormatNumber';

import './tabularData.css';

const TabularData = props => {

  const { isState } = props;
  const { id, Data } = props.StateDistData;
  const { total, meta } = Data;
  const { tested, confirmed, deceased, recovered } = total;
  const population = meta?.population;
  const other = total.other ? total.other : 0;
  const active = confirmed - (recovered + deceased + other);
  const StatePath = id.length === 2 ? `/state/${id}` : "/";                   //When particular state is selected then id will be district name 
  const StateDistrict = id.length === 2 ? STATECODES[ id ] : id;

  return (
    <div className="Table">
      <Link to={StatePath} className={`${isState ? "tds201TabularDataState" : "tdd201TabularDataDistrict"}`}>
        <div className="td211stateutContent">{StateDistrict}</div>
        <div className="td212NumericalContent">{isNaN(tested) ? "Not Available" : CroreLakh(tested)}   </div>
        <div className="td212NumericalContent">{isNaN(confirmed) ? "Not Available" : CroreLakh(confirmed)}</div>
        <div className="td212NumericalContent">{isNaN(active) ? "Not Available" : CroreLakh(active)}   </div>
        <div className="td212NumericalContent">{isNaN(recovered) ? "Not Available" : CroreLakh(recovered)}</div>
        <div className="td212NumericalContent">{isNaN(deceased) ? "Not Available" : CroreLakh(deceased)} </div>
        <div className="td212NumericalContent">{isNaN(population) ? "Not Available" : CroreLakh(population)}</div>
      </Link>
    </div>
  );
}

export default TabularData;
