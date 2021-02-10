import React from 'react';

import { datenumeric } from '../../utils/Helpers/FormatNumber';
import { month } from '../../utils/Helpers/FormatNumber';

import Content from './Content';

import './notification.css'

const Notification = ({ notifiData, OpenNote }) => {

  let dateToData = new Map();

  const RearrangedData = notifiData.map(Data => {                     //Separting timestamp and data and making array of all these objects
    const EachObj = {
      data: Data,
      timestamp: new Date(Data[ 'timestamp' ] * 1000)
    }
    return EachObj;
  })


  for (const obj of RearrangedData) {

    const date = obj[ 'timestamp' ];
    const key = date.getDate() + "" + (date.getMonth() + 1) + "" + date.getFullYear();

    if (!dateToData.has(key)) {                                     //Create map with keys (each new date)->object data

      const value = [];

      value.push(obj);
      const Object = {
        data: value,
        timestamp: date
      }
      dateToData.set(key, Object);
    }
    else {
      dateToData.get(key)[ 'data' ].push(obj);
    }
  }

  const Toarray = Array.from(dateToData);                             //Array [[key,value]]
  const RemovedKey = [];

  for (let obj of Toarray)                                            //removing the key
    RemovedKey.push(obj[ 1 ]);


  if (OpenNote) {
    return (
      <div className="nb601NotificationBox">
        {RemovedKey.map((obj, id) => {

          const datenum = datenumeric(obj.timestamp);
          const monthname = month(obj.timestamp);
          const date = datenum < 10 ? (0 - -datenum) : datenum;                      //For removing leading zero from number

          return (
            <React.Fragment key={id}>
              <div className="nd602NotificationDate">
                {`${date} ${monthname}`}
              </div>
              <Content NotiData={obj.data} />
            </React.Fragment>
          );
        })}
      </div>
    );
  }
  else
    return null;
}

export default Notification;
