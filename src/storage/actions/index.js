import BaseUrl from '../../utils/config/BaseUrl';
import { tabledatatoarr } from '../../utils/MaptoArr';

export const CovidData = () => async dispatch => {
  const response = await BaseUrl.get('/v4/min/data.min.json');
  const data = tabledatatoarr(response.data);
  dispatch({ type: 'FETCH_DATA', payload: data });
};

