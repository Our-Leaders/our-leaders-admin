import authServices from './authServices';
import politicianServices from './politicianServices';
import politicalPartyServices from './politicalPartyServices';

const services = {
  auth: authServices,
  politicians: politicianServices,
  politicalParty: politicalPartyServices,
};

export default services;
