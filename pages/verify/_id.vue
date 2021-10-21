<template>
  <div class="container mt-5 text-center">
    <div v-if="!error && !success">
      <h1>Verifying your account</h1>
      <p>Please wait...</p>
      <b-spinner label="Loading..."></b-spinner>
    </div>

    <div v-if="error">
      <h1>{{ error }}</h1>
      <p>Click below to login</p>
      <nuxt-link to="/login" class="btn btn-info">Login</nuxt-link>
    </div>

    <div v-if="success && !error">
      <h1>Account verified!</h1>
      <p>Click below to login</p>
      <nuxt-link to="/login" class="btn btn-info">Login</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      success: false,
      error: '',
    }
  },

  mounted() {
    const { id } = this.$route.params
    const { token } = this.$route.query

    this.success = false
    this.error = ''

    this.$axios
      .$get(`/v1/users/${id}/verify/${token}`)

      .then(() => {
        this.success = true
        this.$router.push('/')
      })

      .catch((error) => {
        console.log(error)
        this.error = error.response.data.message
      })
  },
}
</script>