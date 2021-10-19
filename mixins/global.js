export default {
  computed: {
    authorized() {
      return this.$store.getters.authorized
    },
  },
}
