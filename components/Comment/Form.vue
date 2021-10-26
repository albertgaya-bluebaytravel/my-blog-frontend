a<template>
  <b-overlay :show="isSubmitting">
    <b-form @submit.stop.prevent="onSubmit" novalidate>
      <b-form-group>
        <b-form-textarea
          id="body"
          name="body"
          rows="3"
          no-resize
          v-model="$v.form.body.$model"
          placeholder="Submit your comments"
          :state="gmValidateState('body')"
        />

        <b-form-invalid-feedback>
          This is a required field.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="info" :disabled="isSubmitting">
        Submit
      </b-button>
    </b-form>
  </b-overlay>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  props: {
    isSubmitting: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        body: '',
      },
    };
  },

  validations: {
    form: {
      body: {
        required,
      },
    },
  },

  methods: {
    onSubmit() {
      this.$v.form.$touch();

      if (this.$v.form.$invalid) return;

      this.$emit('onSubmit', this.form.body);
    },

    onClear() {
      this.$v.form.$reset();
      this.form.body = '';
    },
  },

  created() {
    this.$parent.$on('onCommentBoxClear', this.onClear);
  },
};
</script>