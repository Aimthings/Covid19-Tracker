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

  cases = { confirmedCases: 0, activeCases: 0, recoveredCases: 0, deceasedCases: 0, vaccinated: 0, Tested: 0 };
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
      const DataState = Data[ stateCode ];
      const StateCases = DataState[ 'total' ];
      const confirmedCases = StateCases.confirmed;
      const recoveredCases = StateCases.recovered ? StateCases.recovered : 0;
      const deceasedCases = StateCases.deceased ? StateCases.deceased : 0;
      const Tested = StateCases.tested ? StateCases.tested : 0;
      const vaccinated = StateCases.vaccinated
      const other = StateCases.other ? StateCases.other : 0;
      const activeCases = confirmedCases - (recoveredCases + deceasedCases + other);

      const stateData = [];
      for (let data in DataState[ 'districts' ]) {
        const Districtobjects = {
          id: data,                                        //for district id will be district name type
          Data: DataState[ 'districts' ][ data ]
        }
        stateData.push(Districtobjects);
      }

      this.cases = { confirmedCases, activeCases, recoveredCases, deceasedCases, vaccinated, Tested };

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
      <div>
        <div className="ap102HeaderSearchBarNotifi">
          <Header State={true} header={STATECODES[ stateCode ]} />
          <FrontCards Tested={Cases[ 'Tested' ]} totalCases={Cases[ 'confirmedCases' ]} deceased={Cases[ 'deceasedCases' ]}
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
      </div>
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
