<template>
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
        >
        </b-form-textarea>

        <b-form-invalid-feedback>
          This is a required field.
        </b-form-invalid-feedback>
      </b-form-group>

      <div>
        <b-button variant="info" :disabled="isSubmitting" type="submit">
          Submit
        </b-button>

        <b-button
          v-if="Boolean(this.comment)"
          variant="link"
          :disabled="isSubmitting"
          @click="onCancel"
          type="button"
        >
          Cancel
        </b-button>
      </div>
    </b-form>
  </b-overlay>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  emits: ['onSubmit', 'onCancel', 'onCommentBoxClear'],

  props: {
    isSubmitting: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      form: {
        body: this.comment ? this.comment.body : '',
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

    onCancel() {
      this.$emit('onCancel');
    },
  },

  created() {
    this.$parent.$on('onCommentBoxClear', this.onClear);
  },
};
</script>