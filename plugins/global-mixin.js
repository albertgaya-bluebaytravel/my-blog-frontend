import Vue from 'vue'

Vue.mixin({
  computed: {
    /**
     * Check if there's a user loggin
     *
     * @returns {Boolean}
     */
    gm_authorized() {
      return this.$store.getters.authorized
    },

    /**
     * Get current login user data
     *
     * @returns Object
     */
    gm_login_user() {
      return this.$store.getters.auth_user
    },
  },

  methods: {
    /**
     * Vuelidate - validate field
     * @param {String} name
     * @returns {*}
     */
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
  },
})
