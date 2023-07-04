
const authReducer = (state = {}, action = {}) => {
  /* eslint-disable indent */
  switch (action.type) {
    case 'SET_SITE_SETTINGS': {
      return {
        ...state,
        siteSettings: { ...action.payload }
      };
    }
    case 'SET_MY_PROFILE': {
      return {
        ...state,
        myProfile: { ...action.payload }
      };
    }
    case 'SET_P2P_SETTINGS': {
      return {
        ...state,
        p2pSettings: { ...action.payload }
      };
    }
  }

  /* eslint-enable indent */
};

export default authReducer;
