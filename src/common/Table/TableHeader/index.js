import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './tableHeader.css';

const TableHeader = ({ headerName, id, isSorted }) => {

  const { isAsc, curId } = isSorted;

  return (
    <div className="td211cell heading" id={id}>
      {headerName}
      <span className="hc321iconascdsc">
        {curId === id ?
          isAsc ? <FontAwesomeIcon icon="angle-up" size="1x" /> : <FontAwesomeIcon icon="angle-down" size="1x" /> : <FontAwesomeIcon icon="angle-up" size="1x" />
        }
      </span>
    </div>
  )

}

export default TableHeader;
