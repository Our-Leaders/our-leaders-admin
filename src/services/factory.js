import authServices from './authServices';
import politicianServices from './politicianServices';
import politicalPartyServices from './politicalPartyServices';
import statisticsServices from './statisticsServices';

const services = {
  auth: authServices,
  politicians: politicianServices,
  politicalParty: politicalPartyServices,
  statistics: statisticsServices,
};

export default services;
