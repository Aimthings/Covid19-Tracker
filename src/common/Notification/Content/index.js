import React from 'react';

import { TimeDiffNotifi } from '../../../utils/Helpers/FormatNumber';

import './content.css';

const Content = ({ NotiData }) => {
  return (
    <div>
      {NotiData.map(({ data, timestamp }, id) => {

        const SepDataLine = data[ 'update' ].split('\n');
        const currentTime = new Date();

        return (
          <div key={id} className="nc501NotifiSlotContainer">
            <div className="nc512TimeDiff">
              {TimeDiffNotifi(currentTime, timestamp)}
            </div>
            <div>
              {SepDataLine.map((data, id) => {
                return <div key={id} className="nc513TimeDiffContents">{data}</div>;
              })}
            </div>
          </div>
        );
      })
      }
    </div>
  );
}

export default Content;
