import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './searchBar.css';


const SearchBar = ({ onChange, suggested, value }) => {
  return (
    <div className="sb401SearchBar">
      <input onChange={onChange} type="text" label="Search State" placeholder="Search the State" value={value} suggested={suggested} />
      {suggested}
      <div className="sb411searchicon">
        <i><FontAwesomeIcon icon="search" size="2x" className="sb411fontawesomeicon" /></i>
      </div>
    </div>
  );
}

export default SearchBar;
