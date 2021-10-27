<template>
  <div>
    <div class="d-flex">
      <b-avatar class="mr-3" />
      <div class="w-100">
        <strong class="d-block">{{ user.name }}</strong>

        <div v-if="!isEditting">
          <p>{{ body }}</p>
          <div v-if="c_isOwner">
            <b-link @click="showEditForm">Edit</b-link>
            |
            <b-link @click="onDelete" class="text-danger">Delete</b-link>
          </div>
        </div>

        <div v-else>
          <app-comment-form
            :isSubmitting="isSubmitting"
            :comment="comment"
            @onSubmit="onSubmit"
            @onCancel="onCancel"
          />
        </div>

        <small class="text-secondary font-italic">
          {{ c_createdAt }}
        </small>
      </div>
    </div>

    <!-- <div class="reply"></div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppCommentForm from '@/components/Comment/Form';

export default {
  components: { AppCommentForm },

  props: {
    comment: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      body: this.comment.body,
      isEditting: false,
      isSubmitting: false,
    };
  },

  computed: {
    c_createdAt() {
      return this.gmDatetimeHumanreadable(this.comment.created_at);
    },

    c_isOwner() {
      return (
        this.gmIsAuthenticated && this.comment.user_id === this.gmAuthUser.id
      );
    },
  },

  methods: {
    ...mapActions({
      updatePostComment: 'postsComments/updatePostComment',
      deletePostComment: 'postsComments/deletePostComment',
    }),

    showEditForm() {
      this.isEditting = true;
    },

    async onSubmit(body) {
      this.isSubmitting = true;
      try {
        await this.updatePostComment({
          postId: this.$route.params.id,
          commentId: this.comment.id,
          data: { body },
        });
        this.isSubmitting = false;
      } catch (error) {
        console.log(error);
      }
      this.body = body;
      this.isSubmitting = false;
      this.onCancel();
      this.$emit('onCommentBoxClear');
    },

    onCancel() {
      this.isEditting = false;
    },

    onDelete() {
      this.deletePostComment({
        postId: this.$route.params.id,
        commentId: this.comment.id,
      });
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
}

// .reply {
//   border-left: 1px solid #ccc;
//   margin-left: 20px;
//   margin-top: 15px;
//   padding-left: 20px;
//   padding-top: 15px;
//   padding-bottom: 10px;
// }
</style>