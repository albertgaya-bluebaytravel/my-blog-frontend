<template>
  <div class="container mt-5">
    <div class="offset-3 col-6">
      <b-overlay :show="submitted" v-if="!success">
        <b-card header="Create Post">
          <b-form ref="form" @submit.stop.prevent="onSubmit" novalidate>
            <b-form-group label="Title" label-for="title">
              <b-form-input
                id="title"
                name="title"
                type="text"
                v-model="$v.form.title.$model"
                :state="gmValidateState('title')"
              />

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
                :state="gmValidateState('body')"
              />

              <b-form-invalid-feedback>
                This is a required field.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Image" label-for="image">
              <b-form-file
                v-model="form.image"
                id="image"
                name="image"
                placeholder="Choose a file"
              />
            </b-form-group>

            <div class="d-flex">
              <b-button type="submit" variant="info" :disabled="submitted">
                Submit
              </b-button>

              <b-button variant="link" :disabled="submitted" to="/">
                Cancel
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  middleware: ['authenticated'],

  data() {
    return {
      success: false,
      submitted: false,
      form: {
        title: '',
        body: '',
        image: null,
      },
    };
  },

  validations: {
    form: {
      title: {
        required,
      },
      body: {
        required,
      },
      image: {},
    },
  },

  methods: {
    ...mapActions({
      createPost: 'posts/createPost',
    }),

    async onSubmit() {
      this.$v.form.$touch();
      this.error = '';

      if (this.$v.form.$invalid) return;

      this.submitted = true;

      try {
        await this.createPost(new FormData(this.$refs.form));
        this.success = true;
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }

      this.submitted = false;
    },
  },
};
</script>