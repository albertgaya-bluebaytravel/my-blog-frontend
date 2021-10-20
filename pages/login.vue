<template>
  <b-overlay :show="submitted">
    <div class="container mt-5">
      <div class="offset-3 col-6">
        <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>

        <b-card header="Login">
          <b-form @submit.stop.prevent="onSubmit" novalidate>
            <b-form-group label="Email" label-for="email">
              <b-form-input
                id="email"
                name="email"
                type="email"
                v-model="$v.form.email.$model"
                :state="validateState('email')"
              ></b-form-input>

              <b-form-invalid-feedback v-show="!$v.form.email.required">
                This is a required field.
              </b-form-invalid-feedback>

              <b-form-invalid-feedback v-show="!$v.form.email.email">
                Invalid email format.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                type="password"
                v-model.trim="$v.form.password.$model"
                :state="validateState('password')"
              ></b-form-input>

              <b-form-invalid-feedback>
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>

            <div>
              <b-button type="submit" variant="info" :disabled="submitted">
                Submit
              </b-button>

              <nuxt-link to="/signup" class="float-right mt-2">
                Create account
              </nuxt-link>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
  </b-overlay>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      error: '',
      submitted: false,
      form: {
        email: '',
        password: '',
      },
    }
  },

  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },

  mounted() {
    if (this.$store.getters.authorized) {
      this.$router.push('/')
    }
  },

  methods: {
    onSubmit() {
      this.$v.form.$touch()
      this.error = ''

      if (this.$v.form.$invalid) return

      this.submitted = true

      this.$auth
        .loginWith('laravelSanctum', {
          data: this.form,
        })

        .then(() => {
          this.$router.push('/')
        })

        .catch((error) => {
          console.log(error)
          this.error = error.response.data.message
        })

        .finally(() => {
          this.submitted = false
        })
    },
  },
}
</script>