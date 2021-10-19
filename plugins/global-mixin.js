import Vue from 'vue'

Vue.mixin({
  computed: {
    gm_authorized() {
      return this.$store.getters.authorized
    },

    gm_current_route() {
      return this.$route.name
    },
  },
})
