import authServices from './authServices';
import adminServices from './adminServices';
import politicianServices from './politicianServices';
import politicalPartyServices from './politicalPartyServices';
import statisticsServices from './statisticsServices';

const services = {
  auth: authServices,
  admins: adminServices,
  politicians: politicianServices,
  politicalParty: politicalPartyServices,
  statistics: statisticsServices,
};

export default services;
