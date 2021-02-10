import React from 'react';
import { Link } from 'react-router-dom';
import { WaveLoading } from 'react-loadingg';
import { Badge } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Notification from '../../common/Notification';
import FrontCards from '../../common/FrontCards';
import CovidTable from '../../common/Table';
import SearchBar from '../../common/SearchBar';
import Header from '../../common/Header';
import Error from '../../common/Error';

import { CheckUpdateStorageCovid } from '../../utils/config/DataFetch';
import { CheckUpdateStorageNotify } from '../../utils/config/DataFetch';
import { STATECODES } from '../../utils/config/States';
import { datenumeric } from '../../utils/Helpers/FormatNumber';
import { month } from '../../utils/Helpers/FormatNumber';

import './homePage.css';

class Homepage extends React.Component {
  cases = {
    confirmedCases: 0,
    activeCases: 0,
    recoveredCases: 0,
    deceasedCases: 0,
    vaccinated: 0,
    tested: 0
  };
  fullData = []; notifiData = [];
  state = {
    inputSearch: '',
    searchboxData: [],
    openBell: false,
    openNotification: false,
    redirectError: false,
    dataArrived: false
  }

  componentDidMount() {
    this.fetchCovidData();
    this.fetchNotifyData();
  }

  fetchCovidData = async () => {                                //covid data fetching
    try {
      const Data = await CheckUpdateStorageCovid();
      if (!Data) {                                              //if empty data sent make redirect to true
        console.error("Data is not Provided By API");
        this.setState({ redirectError: true });
        return;
      }

      const dataIndia = Data[ 'TT' ][ 'total' ];               //Extract india's data from the api provided content
      const confirmedCases = dataIndia.confirmed;
      const recoveredCases = dataIndia.recovered;
      const deceasedCases = dataIndia.deceased;
      const tested = dataIndia.tested;
      const vaccinated = dataIndia.vaccinated;
      const other = dataIndia.other;
      const activeCases = confirmedCases - (recoveredCases + deceasedCases + other);   //active cases calc includes other also present in india data
      const fullData = [];

      for (let data in Data) {
        if (data === 'TT')                 //India data already stored so no need to store
          continue;                        //Create Required Object to push into the array of objects format
        const stateobjects = {
          id: data,
          name: STATECODES[ data ],
          Data: Data[ data ]
        }
        fullData.push(stateobjects);
      }

      this.cases = {
        confirmedCases,
        activeCases,
        recoveredCases,
        deceasedCases,
        vaccinated,
        tested
      };

      this.fullData = fullData;

      this.setState({
        dataArrived: true                                         //data successfully arrived so set to true
      });

    } catch (err) {                                              //if fetching fails catch the error and redirect to error page
      console.error('Data Fetching Error');
      this.setState({ redirectError: true });
    };
  }

  fetchNotifyData = async () => {
    try {
      const Data = await CheckUpdateStorageNotify();
      const notifiData = [ ...Data ];                                   //Create new notification data array
      notifiData.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1);  //Sort the array according to time stamps of each object

      this.notifiData = notifiData;

    } catch (err) {
      console.error('Notification Data Fetching Error');
    };
  }

  onChange = (text) => {                                           //trigger when value changes inside searchbar input
    this.setState({ inputSearch: text });
    this.Handlesearch(text);
  };

  Handlesearch = searchString => {

    let searchboxData = [];
    if (searchString.length > 0) {
      const stateNames = [ ...this.fullData ];
      const regex = new RegExp(`^${searchString}`, 'i');              //case insensitive search 'i' 
      searchboxData = stateNames.filter(x => regex.test(x.name)).sort((a, b) => a.name.localeCompare(b.name));
    };

    this.setState({ searchboxData, inputSearch: searchString });
  }

  renderSuggestions() {

    const { searchboxData } = this.state;

    if (searchboxData.length === 0)                                          //show all suggestion list according to input in dropdown
      return null;
    return (
      <div className="hp101suggestions">
        <ul>
          {searchboxData.map(({ id, name }) => {
            return (                                                  //index of object with that particualr state name and then its id as URL statecode
              <Link key={id} to={`/state/${id}`}>
                <span  ><li onClick={() => this.suggestionSelected(name)}>{name}</li></span>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }

  suggestionSelected(value) {                           //When suggestion is clicked empty the searchbox and change value
    this.setState({
      inputSearch: value,
      searchboxData: []
    })
  }

  toggleNote = () => {                                 //Notification icon click toggle the state
    const { openNotification } = this.state;
    this.setState({ openNotification: !openNotification, openBell: true });
  }

  containerClick = () => {
    const { openNotification } = this.state;
    if (openNotification) {
      this.setState({ openNotification: false });
    }
  }
  ShowItems = () => {

    const cases = this.cases;
    const fullData = this.fullData;
    const notifiData = this.notifiData;
    const { openNotification, searchboxData, inputSearch, openBell } = this.state;
    const currentDate = new Date();                                                                          //Date time format 
    const datenum = datenumeric(currentDate);
    const monthname = month(currentDate);
    const currentime = currentDate.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

    return (
      <div>
        <div className="ap102HeaderSearchBarNotifi" onClick={this.containerClick}>
          <div className="hp111IconHeading">
            <Header State={false} />
            <div className="hp121Bell">
              <Badge color="secondary" variant="dot" invisible={openBell}>
                {openNotification ?
                  <FontAwesomeIcon onClick={this.toggleNote} icon='bell-slash' size="3x" /> :
                  <FontAwesomeIcon onClick={this.toggleNote} icon='bell' size="3x" />}
              </Badge>
            </div>
          </div>
          <div className="hp112DateTime">{`${datenum} ${monthname}`} , {currentime} IST</div>

          <SearchBar onChange={e => this.onChange(e.target.value)} value={inputSearch} Data={searchboxData}
            suggested={this.renderSuggestions()} />

          <Notification notifiData={notifiData} OpenNote={openNotification} />

          <FrontCards Tested={cases[ 'tested' ]} totalCases={cases[ 'confirmedCases' ]} deceased={cases[ 'deceasedCases' ]}
            recovered={cases[ 'recoveredCases' ]} activeCase={cases[ 'activeCases' ]} vaccine={cases[ 'vaccinated' ]} />

        </div>
        <div>
          <CovidTable fullData={fullData} isState={true} />
        </div>
      </div>
    );
  }

  render() {

    const { redirectError, dataArrived } = this.state;

    if (redirectError) {                                        //if redirect true show the error page
      return <Error />;
    }                                                           //data not arrived loading page else show content
    return (
      <div>
        {dataArrived ? (this.ShowItems()) : <WaveLoading />}
      </div>
    );
  }
};

export default Homepage;
