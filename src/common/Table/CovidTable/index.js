import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { STATECODES } from '../../../utils/config/States';
import { CroreLakh } from '../../../utils/Helpers/FormatNumber';

import './tabularData.css';

const TabularData = forwardRef((props, ref) => {

  const { isState } = props;
  const { id, Data } = props.StateDistData;
  const { total, meta } = Data;
  const { tested, confirmed, deceased, recovered } = total;
  const population = meta?.population;
  const chkconfirmed = isNaN(confirmed) ? 0 : confirmed;
  const chkdeceased = isNaN(deceased) ? 0 : deceased;
  const chkrecovered = isNaN(recovered) ? 0 : recovered;
  const chkother = isNaN(total.other) ? 0 : total.other;
  const active = chkconfirmed - (chkrecovered + chkdeceased + chkother);
  const StatePath = id.length === 2 ? `/state/${id}` : "/";           //When particular state is selected then id will be district name 
  const StateDistrict = id.length === 2 ? STATECODES[ id ] : id;

  return (
    <Link to={StatePath} className={`hc301Row ${isState ? "tds201TabularDataState" : "tdd201TabularDataDistrict"}`}>
      <div className="td211cell td211stateutContent">{StateDistrict}</div>
      <div className="td211cell td212tested">{isNaN(tested) ? "NA" : CroreLakh(tested)}</div>
      <div className="td211cell td212confirmed">{CroreLakh(chkconfirmed)}</div>
      <div className="td211cell td212active">{CroreLakh(active)}</div>
      <div className="td211cell td212recovered">{CroreLakh(chkrecovered)}</div>
      <div className="td211cell td212deceased">{CroreLakh(chkdeceased)} </div>
      <div className="td211cell td212population">{isNaN(population) ? "NA" : CroreLakh(population)}</div>
    </Link>
  );
})

export default TabularData;
