import React from 'react';
import { WaveLoading } from 'react-loadingg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../common/Header';
import FrontCards from '../../common/FrontCards';
import CovidTable from '../../common/Table';
import Error from '../../common/Error';
import Page404 from '../../common/Error/Page404';

import { STATECODES } from '../../utils/config/States';
import { dataSorting } from '../../utils/config/Sorting';
import { CheckUpdateStorageCovid } from '../../utils/config/DataFetch';

import './statePage.css';

class StatePage extends React.Component {

  cases = {
    confirmedCases: 0,
    activeCases: 0,
    recoveredCases: 0,
    deceasedCases: 0,
    vaccinated: 0,
    tested: 0
  };
  state = {
    stateData: [],
    dataArrived: false,
    redirectError: false,
    notFound: false,
    isSort: {
      isAsc: true,
      curId: 'st'
    }
  }

  componentDidMount() {
    this.fetchCovidData();
  }


  fetchCovidData = async () => {
    try {
      const { stateCode } = this.props.match.params;                //Extract the state code from url
      const Data = await CheckUpdateStorageCovid();

      if (!Data) {
        console.log("Data is not Provided By API");
        this.setState({ redirectError: true });
        return;
      }
      const dataState = Data[ stateCode ];

      const stateCases = dataState[ 'total' ];
      const confirmedCases = stateCases.confirmed;
      const recoveredCases = stateCases.recovered ? stateCases.recovered : 0;
      const deceasedCases = stateCases.deceased ? stateCases.deceased : 0;
      const tested = stateCases.tested ? stateCases.tested : 0;
      const vaccinated = stateCases.vaccinated
      const other = stateCases.other ? stateCases.other : 0;
      const activeCases = confirmedCases - (recoveredCases + deceasedCases + other);

      const stateData = [];
      for (let data in dataState[ 'districts' ]) {
        const Districtobjects = {
          id: data,
          name: data,                                        //for district id will be district name type
          Data: dataState[ 'districts' ][ data ]
        }
        stateData.push(Districtobjects);
      }

      this.cases = {
        confirmedCases,
        activeCases,
        recoveredCases,
        deceasedCases,
        vaccinated,
        tested
      };

      setTimeout(() => {                                  //TimeOut for some delay when moving to statepage
        this.setState({
          stateData,
          dataArrived: true
        });
      }, 800);

    } catch (err) {
      console.log('Data Fetching failed');
      this.setState({ notFound: true });
    }
  }

  ShowItems = () => {

    const cases = this.cases;
    const { stateData, isSort } = this.state;
    const { stateCode } = this.props.match.params;
    const isdistrictData = stateData[ 0 ].id;

    return (
      <>
        <div className="ap102HeaderSearchBarNotifi">

          <Header State={true} header={STATECODES[ stateCode ]} />

          <FrontCards
            Tested={cases[ 'tested' ]}
            totalCases={cases[ 'confirmedCases' ]}
            deceased={cases[ 'deceasedCases' ]}
            recovered={cases[ 'recoveredCases' ]}
            activeCase={cases[ 'activeCases' ]}
            vaccine={cases[ 'vaccinated' ]}
          />
        </div>
        <div>
          {isdistrictData === "Unknown" ?
            <div className="st121DistrictNotAvailable">
              <div className="st132disclaimer">
                <FontAwesomeIcon icon="exclamation-triangle" />  District-wise data not available in state bulletin
            </div>
            </div>
            :
            <CovidTable fullData={stateData} isState={false} sortData={this.sortData} isSorted={isSort} />
          }
        </div>
      </>
    );
  }

  sortData = (event) => {

    const { isSort, stateData } = this.state;
    const tempObj = { ...isSort };
    const id = event.target.getAttribute('id');

    if (!id) return;

    if (tempObj.curId === id) {
      const arrangedData = dataSorting(id, stateData, !tempObj.isAsc);
      tempObj.isAsc = !tempObj.isAsc;
      this.setState({ stateData: arrangedData, isSort: tempObj });
    }
    else {
      const arrangedData = dataSorting(id, stateData, tempObj.isAsc);
      tempObj.curId = id;
      this.setState({ stateData: arrangedData, isSort: tempObj });
    }
  }
  render() {
    const { redirectError, dataArrived, notFound } = this.state;
    if (redirectError) {
      return <Error />;
    }
    else if (notFound) {
      return <Page404 />;
    }
    return (
      <>
        {dataArrived ? (this.ShowItems()) : <WaveLoading />}
      </>
    );
  }
}

export default StatePage;
