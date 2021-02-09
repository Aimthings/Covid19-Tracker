export const IndianFormat = (number) => {                                 //Indian comma format thousands like 53,654
  return Intl.NumberFormat('en-IN').format(number);
}

export const datenumeric = (timestamp) => {                                //NumericDate into 2 digit format 
  return Intl.DateTimeFormat('en', { day: '2-digit' }).format(timestamp);
}

export const month = (timestamp) => {                                      //Month into Name format short like january->jan
  return Intl.DateTimeFormat('en', { month: 'short' }).format(timestamp);
}

export const TimeDiffNotifi = (curr, prev) => {                          //convert into about format time in notification content box

  const minutes = 60 * 1000;
  const hours = minutes * 60;
  const days = hours * 24;

  const difference = curr - prev;

  if (difference < minutes)
    return "About " + Math.round(difference / 1000) + ' seconds ago';

  else if (difference < hours)
    return "About " + Math.round(difference / minutes) + ' minutes ago';

  else if (difference < days)
    return "About " + Math.round(difference / hours) + ' hours ago';

}

export const CroreLakh = number => {
  if (number >= 1000000) {
    number = (number / 10000000).toFixed(2) + ' Cr';
  }
  else if (number >= 100000)
    number = (number / 100000).toFixed(2) + ' L';
  else
    number = IndianFormat(number);                                     //Number smaller than lakh convert into indiancomma format
  return number;
}
