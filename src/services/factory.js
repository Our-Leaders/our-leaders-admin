import authServices from './authServices';
import adminServices from './adminServices';
import pagesServices from './pagesServices';
import politicianServices from './politicianServices';
import politicalPartyServices from './politicalPartyServices';
import statisticsServices from './statisticsServices';
import jobServices from './jobServices';
import feedServices from './feedServices';

const services = {
  auth: authServices,
  admins: adminServices,
  pages: pagesServices,
  politicians: politicianServices,
  politicalParty: politicalPartyServices,
  statistics: statisticsServices,
  jobs: jobServices,
  feeds: feedServices,
};

export default services;
