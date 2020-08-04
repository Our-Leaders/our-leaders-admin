export default {
  currentUser: null,
  jwtToken: '',
  politicians: [],
  politicianCount: 0,
  activeModal: null,
  activeModalProps: {},
  politicalParties: [],
  politicalPartyCount: 0,
  politicalPartyPagination: {
    page: 1,
    numberPerPage: 18,
  },
  politicianPagination: {
    page: 1,
    numberPerPage: 18,
  },
  statistics: {
    parties: 0,
    admins: 0,
    currentLeaders: 0,
    leaders: 0,
    signUps: [],
    signUpStats: [],
    visitStats: [],
    upcomingLeaders: 0,
    topLocations: [],
    topPages: [],
  },
  admins: [],
  info: {
    header: null,
    details: null,
    display: false,
    type: 'info',
  },
  page: {
    aboutUs: '',
    socials: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
    contact: {
      address: '',
      phoneNumber: '',
      email: '',
    },
  },
  // stored as { category: Array<job> }
  jobsByCategory: {},
};
