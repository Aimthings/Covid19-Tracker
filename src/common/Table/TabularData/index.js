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
        <div className="td212NumericalContent">{isNaN(tested) ? "NA" : CroreLakh(tested)}   </div>
        <div className="td212NumericalContent">{isNaN(confirmed) ? "NA" : CroreLakh(confirmed)}</div>
        <div className="td212NumericalContent">{isNaN(active) ? "NA" : CroreLakh(active)}   </div>
        <div className="td212NumericalContent">{isNaN(recovered) ? "NA" : CroreLakh(recovered)}</div>
        <div className="td212NumericalContent">{isNaN(deceased) ? "NA" : CroreLakh(deceased)} </div>
        <div className="td212NumericalContent">{isNaN(population) ? "NA" : CroreLakh(population)}</div>
      </Link>
    </div>
  );
}

export default TabularData;
