import React from 'react';
import { WaveLoading } from 'react-loadingg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../common/Header';
import FrontCards from '../../common/FrontCards';
import CovidTable from '../../common/Table';
import Error from '../../common/Error';

import { STATECODES } from '../../utils/config/States';
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
    redirectError: false
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
          id: data,                                        //for district id will be district name type
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
      console.log(err);
      this.setState({ redirectError: true });
      console.log('Data Fetching failed');
    };
  }

  ShowItems = () => {

    const Cases = this.cases;
    const { stateData } = this.state;
    const { stateCode } = this.props.match.params;
    const isdistrictData = stateData[ 0 ].id;

    return (
      <React.Fragment>
        <div className="ap102HeaderSearchBarNotifi">
          <Header State={true} header={STATECODES[ stateCode ]} />
          <FrontCards Tested={Cases[ 'tested' ]} totalCases={Cases[ 'confirmedCases' ]} deceased={Cases[ 'deceasedCases' ]}
            recovered={Cases[ 'recoveredCases' ]} activeCase={Cases[ 'activeCases' ]} vaccine={Cases[ 'vaccinated' ]} />
        </div>
        <div>
          {isdistrictData === "Unknown" ?
            <div className="st121DistrictNotAvailable">
              <div className="st132disclaimer">
                <FontAwesomeIcon icon="exclamation-triangle" />  District-wise data not available in state bulletin
           </div>
            </div>
            :
            <div>
              <CovidTable fullData={stateData} isState={false} />
            </div>
          }
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { redirectError, dataArrived } = this.state;
    if (redirectError) {
      return <Error />;
    }
    return (
      <div>
        {dataArrived ? (this.ShowItems()) : <WaveLoading />}
      </div>
    );
  }
}

export default StatePage;
