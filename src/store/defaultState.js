export default {
  currentUser: null,
  jwtToken: '',
  politicians: [],
  activeModal: null,
  activeModalProps: {},
  politicalParties: [],
  politicalPartyCount: 0,
  statistics: {},
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
