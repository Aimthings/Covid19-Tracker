
import BaseUrl from '../BaseUrl';

const ExpiryTimeApiTable = 59;
const ExpiryTimeApiNotification = 10;
//Fetching Covid Data of Each state

const DatafromApicovid = async () => {
  const fullData = await BaseUrl.get('/v4/min/data.min.json');
  if (localStorage) {
    localStorage.setItem('Data', JSON.stringify(fullData.data));
    const Storagetime = new Date().getMinutes();
    localStorage.setItem(Storagetime, JSON.stringify(Storagetime));
  }
  return fullData.data;
}

export const CheckUpdateStorageCovid = async () => {
  if (localStorage && localStorage.getItem('Data')) {
    const previoustime = JSON.parse(localStorage.getItem('Storagetime'));
    const Datenow = new Date().getMinutes();
    const dateDifference = Math.abs(Datenow - previoustime);
    if (dateDifference > ExpiryTimeApiTable) {
      const collectData = localStorage.getItem('Data');      //if call is before set time use already stored data and return it
      const Data = JSON.parse(collectData);
      return Data;
    }
    if (localStorage) {                                     //if local Storage Accessible
      localStorage.removeItem('Data');                      //Remove previous data from storage    
      localStorage.removeItem('Storagetime');
    }
  }
  return DatafromApicovid();
}


//Similarily Fetching Data for notification 

const DatafromApinotification = async () => {
  const fullData = await BaseUrl.get('/updatelog/log.json');
  if (localStorage) {
    localStorage.setItem('NotifyData', JSON.stringify(fullData.data));
    const NotiStoragetime = new Date().getMinutes();
    localStorage.setItem(NotiStoragetime, JSON.stringify(NotiStoragetime));
  }
  return fullData.data;
}

export const CheckUpdateStorageNotify = async () => {
  if (localStorage && localStorage.getItem('NotifyData')) {
    const previoustime = JSON.parse(localStorage.getItem('NotiStoragetime'));
    const Datenow = new Date().getMinutes();
    const dateDifference = Math.abs(Datenow - previoustime);
    if (dateDifference > ExpiryTimeApiNotification) {
      const collectData = localStorage.getItem('NotifyData');            //if call is before set time use already stored data and return it
      const Data = JSON.parse(collectData);
      return Data;
    }
    if (localStorage) {                                                 //if local Storage Accessible
      localStorage.removeItem('NotifyData');                            //Remove previous data from storage    
      localStorage.removeItem('Storagetime');
    }
  }
  return DatafromApinotification();
}

const htmlEl = document.getElementsByTagName('html')[ 0 ];
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : localStorage.setItem('theme', 'light');

if (currentTheme) {
  htmlEl.dataset.theme = currentTheme;
}
export const toggleTheme = (theme) => {
  htmlEl.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}
