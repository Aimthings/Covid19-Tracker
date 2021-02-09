import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IndianFormat } from '../../../utils/Helpers/FormatNumber';

import './Cards.css';

const Cards = ({ heading, numbers, color, fontawicon }) => {

  const indianformat = IndianFormat(numbers);

  return (
    <div className={`cc801CardContainer cc802card${color}`}>
      <div className="cc811heading">{heading}</div>
      <div className="cc812content">
        {indianformat}
      </div>
      <div>
        <FontAwesomeIcon icon={fontawicon} size="2x" />
      </div>
    </div>
  );
}

export default Cards;
