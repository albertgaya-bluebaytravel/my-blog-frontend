export const state = () => ({});

export const getters = {
  /**
   * Check if there's a user loggin
   *
   * @param {*} state
   * @returns {Boolean}
   */
  authorized(state) {
    return state.auth.loggedIn;
  },

  /**
   * Get current login user data
   *
   * @param {*} state
   * @returns {Object}
   */
  auth_user(state) {
    return state.auth.user;
  },
};

export const mutations = {};
export const actions = {};
