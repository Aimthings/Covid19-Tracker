import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IndianFormat } from '../../../utils/Helpers/FormatNumber';

import './Cards.css';

const Cards = ({ heading, numbers, color, fontawicon }) => {

  const indianFormat = IndianFormat(numbers);

  return (
    <div className={`cc801CardContainer cc802card${color}`}>
      <div className="cc811heading">{heading}</div>
      <div className="cc812content">
        {indianFormat}
      </div>
      <div>
        <FontAwesomeIcon icon={fontawicon} size="2x" className="i13font" />
      </div>
    </div>
  );
}

export default Cards;
