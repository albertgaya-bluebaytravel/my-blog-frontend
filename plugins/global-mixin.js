import Vue from 'vue';

Vue.mixin({
  computed: {
    /**
     * Check if there's a user loggin
     *
     * @returns {Boolean}
     */
    gm_is_authenticated() {
      return this.$store.getters.authorized;
    },

    /**
     * Get current login user data
     *
     * @returns Object
     */
    gm_login_user() {
      return this.$store.getters.auth_user;
    },
  },

  methods: {
    /**
     * Vuelidate - validate field
     * @param {String} name
     * @returns {*}
     */
    gm_validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    /**
     * Get substring of a text
     * @param {String} text
     * @param {Integer} maxLength
     * @returns {String}
     */
    gm_short_text(text, maxLength) {
      if (text.length < maxLength) {
        return text;
      }

      let trimText = text.substr(0, maxLength);
      return trimText.substr(0, trimText.lastIndexOf(' ')) + '...';
    },

    gm_datetime_humanreadable(datetime) {
      const date = this.$moment(datetime);
      const dateNow = this.$moment();

      return this.$moment(dateNow).diff(date, 'days') < 1
        ? date.fromNow()
        : date.format('LL');
    },
  },
});
