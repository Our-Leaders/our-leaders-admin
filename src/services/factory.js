import authServices from './authServices';
import adminServices from './adminServices';
import pagesServices from './pagesServices';
import politicianServices from './politicianServices';
import politicalPartyServices from './politicalPartyServices';
import statisticsServices from './statisticsServices';

const services = {
  auth: authServices,
  admins: adminServices,
  pages: pagesServices,
  politicians: politicianServices,
  politicalParty: politicalPartyServices,
  statistics: statisticsServices,
};

export default services;
