<template>
  <div>
    <div v-if="!success">
      <div class="container mt-5">
        <div class="offset-3 col-6">
          <b-overlay :show="submitted">
            <b-card header="Create Account">
              <b-form @submit.stop.prevent="onSubmit" novalidate>
                <b-form-group label="Name" label-for="name">
                  <b-form-input
                    id="name"
                    name="name"
                    type="text"
                    v-model="$v.form.name.$model"
                    :state="gm_validateState('name')"
                  />

                  <b-form-invalid-feedback>
                    This is a required field.
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Email" label-for="email">
                  <b-form-input
                    id="email"
                    name="email"
                    type="email"
                    v-model="$v.form.email.$model"
                    :state="gm_validateState('email')"
                  />

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
                    name="password"
                    type="password"
                    v-model.trim="$v.form.password.$model"
                    :state="gm_validateState('password')"
                  />

                  <b-form-invalid-feedback>
                    This is a required field.
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                  label="Confirm Password"
                  label-for="password_confirmation"
                >
                  <b-form-input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    v-model.trim="$v.form.password_confirmation.$model"
                    :state="gm_validateState('password_confirmation')"
                  />

                  <b-form-invalid-feedback
                    v-show="!$v.form.password_confirmation.required"
                  >
                    This is a required field.
                  </b-form-invalid-feedback>

                  <b-form-invalid-feedback
                    v-show="!$v.form.password_confirmation.sameAsPassword"
                  >
                    Password doesn't match.
                  </b-form-invalid-feedback>
                </b-form-group>

                <div>
                  <b-button type="submit" variant="info" :disabled="submitted">
                    Submit
                  </b-button>

                  <nuxt-link to="/login" class="float-right mt-2">
                    Already have an account?
                  </nuxt-link>
                </div>
              </b-form>
            </b-card>
          </b-overlay>
        </div>
      </div>
    </div>

    <div class="container mt-5 text-center" v-if="submitted && success">
      <h1>You successfully registered</h1>
      <p>Kindly check you email to verify your account.</p>
      <nuxt-link to="/login" class="btn btn-info">Back to Login</nuxt-link>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      success: false,
      submitted: false,
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    };
  },

  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
        email,
        // TODO: Unique email validation
      },
      password: {
        required,
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },

  methods: {
    async onSubmit() {
      this.$v.form.$touch();
      this.error = '';

      if (this.$v.form.$invalid) return;

      this.submitted = true;

      await this.$axios.get('sanctum/csrf-cookie');
      this.$axios
        .$post('/v1/users/register', this.form)
        .then(() => {
          this.success = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>