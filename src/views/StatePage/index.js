import React from 'react';
import { connect } from 'react-redux';
import { WaveLoading } from 'react-loadingg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../common/Header';
import FrontCards from '../../common/FrontCards';
import CovidTable from '../../common/Table';
import Error from '../../common/Error';

import { STATECODES } from '../../utils/config/States';

import './statePage.css';
class StatePage extends React.Component {

  cases = {
    confirmedCases: 0,
    activeCases: 0,
    recoveredCases: 0,
    deceasedCases: 0,
    vaccinated: 0,
    Tested: 0
  };

  stateData = [];

  fetchCovidData = (Data) => {

    const { stateCode } = this.props.match.params;                //Extract the state code from url
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

    this.cases = {
      confirmedCases,
      activeCases,
      recoveredCases,
      deceasedCases,
      vaccinated,
      Tested
    };


    this.stateData = stateData;
  }

  ShowItems = () => {

    this.fetchCovidData(this.props.covidData.list);

    const Cases = this.cases;
    const stateData = this.stateData;
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

    const redirectError = this.props.covidData.error;
    const loading = this.props.covidData.loading
    console.log(redirectError);
    if (redirectError) {
      return <Error />;
    }
    return (
      <div>
        {loading ? <WaveLoading /> : (this.ShowItems())}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    covidData: state.covidData
  }
};

export default connect(mapStateToProps)(StatePage);

