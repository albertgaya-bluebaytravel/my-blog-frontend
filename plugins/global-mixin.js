import Vue from 'vue';
import { mapState } from 'vuex';

Vue.mixin({
  computed: {
    ...mapState({
      gmIsAuthenticated: (state) => state.auth.loggedIn,
      gmAuthUser: (state) => state.auth.user,
    }),
  },

  methods: {
    gmValidateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    gmDatetimeHumanreadable(datetime) {
      const date = this.$moment(datetime);
      const dateNow = this.$moment();

      return this.$moment(dateNow).diff(date, 'days') < 1
        ? date.fromNow()
        : date.format('LL');
    },
  },
});
