import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IndianFormat } from '../../utils/Helpers/FormatNumber';

import Cards from './Cards';

import './frontCards.css';

const FrontCards = ({ Tested, totalCases, activeCase, recovered, deceased, vaccine }) => {

  const vaccinedose = vaccine ? `${IndianFormat(vaccine)}  vaccine doses administered` : "Not Available";

  return (
    <div className="cf902CardsndFooter">
      <div className="cf912FrontCards">
        <Cards heading="Tested" numbers={Tested} color="darkgreen" fontawicon="check-square" />
        <Cards heading="Confirmed" numbers={totalCases} color="red" fontawicon="bolt" />
        <Cards heading="Active" numbers={activeCase} color="dodgerblue" fontawicon="virus" />
        <Cards heading="Recovered" numbers={recovered} color="green" fontawicon="shield-virus" />
        <Cards heading="Deceased" numbers={deceased} color="raven" fontawicon="book-dead" />
      </div>
      <div className="cf913vaccine">
        <div className="cf921icon">
          <FontAwesomeIcon icon="check-circle" size="2x" />
        </div>
        <div className="cf922vaccinetext">
          {vaccinedose}
        </div>
      </div>
    </div>
  );
}

export default FrontCards;
