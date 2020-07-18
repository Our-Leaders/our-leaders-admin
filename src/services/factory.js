import authServices from './authServices';
import adminServices from './adminServices';
import userServices from './userServices';
import pagesServices from './pagesServices';
import politicianServices from './politicianServices';
import politicalPartyServices from './politicalPartyServices';
import statisticsServices from './statisticsServices';
import jobServices from './jobServices';
import feedServices from './feedServices';
import donationServices from './donationServices';

const services = {
  auth: authServices,
  admins: adminServices,
  pages: pagesServices,
  politicians: politicianServices,
  politicalParty: politicalPartyServices,
  statistics: statisticsServices,
  jobs: jobServices,
  feeds: feedServices,
  users: userServices,
  donations: donationServices,
};

export default services;
