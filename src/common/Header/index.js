import React from 'react';

import './header.css';

//hide covid india when state is shown

const Header = ({ header, State }) => {
  return (
    <React.Fragment>
      <div className="h701header">
        <h1 className={State === true ? 'h711Hide' : 'h712show'}>COVID19</h1>
      </div>
      <div className="h702stateheader">
        <h2 className={header === undefined ? 'h711Hide' : 'h714show'}>{header}</h2>
      </div>
    </React.Fragment>
  );
}

export default Header;
