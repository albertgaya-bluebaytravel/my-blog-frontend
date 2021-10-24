<template>
  <div class="container mt-5">
    <div class="offset-3 col-6">
      <b-overlay :show="submitted" v-if="!success">
        <b-card header="Edit Post">
          <b-form ref="form" @submit.stop.prevent="onSubmit" novalidate>
            <b-form-group label="Title" label-for="title">
              <b-form-input
                id="title"
                name="title"
                type="text"
                v-model="$v.form.title.$model"
                :state="gm_validateState('title')"
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
                :state="gm_validateState('body')"
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

              <b-button
                variant="danger"
                class="ml-auto"
                :disabled="submitted"
                @click="onDelete"
              >
                Delete
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  async middleware({ $axios, store, route, redirect }) {
    await $axios
      .$get(`/v1/posts/${route.params.id}`)
      .then((response) => {
        const post = response.data.post;

        if (post.user_id !== store.getters.auth_user.id) {
          redirect('/');
        }
      })
      .catch((error) => {
        console.log(error);
        redirect('/');
      });
  },

  async beforeMount() {
    await this.$axios
      .$get(`/v1/posts/${this.$route.params.id}`)
      .then((response) => {
        const post = response.data.post;
        this.post = post;
        this.form.title = post.title;
        this.form.body = post.body;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  data() {
    return {
      success: false,
      submitted: false,
      post: {},
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
    onSubmit() {
      this.$v.form.$touch();
      this.error = '';

      if (this.$v.form.$invalid) return;

      this.submitted = true;

      this.$axios
        .$patch(`/v1/posts/${this.$route.params.id}`, this.form)
        .then(() => {
          this.success = true;
          this.$router.push('/');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.submitted = false;
        });
    },

    onDelete() {
      this.submitted = true;

      this.$axios
        .$delete(
          `/v1/posts/${this.$route.params.id}`,
          new FormData(this.$refs.form),
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then(() => {
          this.success = true;
          this.$router.push('/');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.submitted = false;
        });
    },
  },
};
</script>