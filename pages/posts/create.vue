<template>
  <div class="container mt-5">
    <div class="offset-3 col-6">
      <b-overlay :show="submitted" v-if="!success">
        <b-card header="Create Post">
          <b-form @submit.stop.prevent="onSubmit" novalidate>
            <b-form-group label="Title" label-for="title">
              <b-form-input
                id="title"
                name="title"
                type="text"
                v-model="$v.form.title.$model"
                :state="validateState('title')"
              ></b-form-input>

              <b-form-invalid-feedback>
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Body" label-for="body">
              <b-form-textarea
                id="body"
                name="body"
                rows="3"
                no-resize
                v-model="$v.form.body.$model"
                :state="validateState('body')"
              ></b-form-textarea>

              <b-form-invalid-feedback>
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>

            <div>
              <b-button type="submit" variant="info" :disabled="submitted">
                Submit
              </b-button>

              <nuxt-link to="/">
                <b-button variant="link" :disabled="submitted">
                  Cancel
                </b-button>
              </nuxt-link>
            </div>
          </b-form>
        </b-card>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  middleware: ['authenticated'],

  data() {
    return {
      success: false,
      submitted: false,
      form: {
        title: '',
        body: '',
      },
    }
  },

  validations: {
    form: {
      title: {
        required,
      },
      body: {
        required,
      },
    },
  },

  methods: {
    onSubmit() {
      this.$v.form.$touch()
      this.error = ''

      if (this.$v.form.$invalid) return

      this.submitted = true

      this.$axios
        .$post('/v1/posts', this.form)

        .then(() => {
          this.success = true
          this.$router.push('/')
        })

        .catch((error) => {
          console.log(error)
        })

        .finally(() => {
          this.submitted = false
        })
    },
  },
}
</script>