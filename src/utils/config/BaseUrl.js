import axios from 'axios';

const BaseUrl = axios.create({
  baseURL: 'https://api.covid19india.org',
});

export default BaseUrl;
