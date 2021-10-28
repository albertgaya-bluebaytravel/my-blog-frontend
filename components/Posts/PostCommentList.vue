<template>
  <div>
    <app-strike-through-text text="Comments" />

    <app-comment-form
      v-if="gmIsAuthenticated"
      :isSubmitting="isSubmittingForm"
      @onSubmit="onSubmitForm"
      ref="commentForm"
      class="comment-form"
    />

    <app-comment-box
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :onSubmitEditForm="onSubmitEditForm"
      :onDelete="onDelete"
      :onSubmitReplyForm="onSubmitReplyForm"
      :onSubmitReplyEditForm="onSubmitReplyEditForm"
      hasReply
      class="comment-box"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppStrikeThroughText from '@/components/Utilities/StrikeThroughText';
import AppCommentForm from '@/components/Comments/CommentForm';
import AppCommentBox from '@/components/Comments/CommentBox';

export default {
  components: {
    AppStrikeThroughText,
    AppCommentForm,
    AppCommentBox,
  },

  props: {
    postId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isSubmittingForm: false,
    };
  },

  async beforeMount() {
    try {
      await this.$store.dispatch('posts/getComments', this.postId);
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    ...mapState({
      comments: (state) => state.posts.comments,
    }),
  },

  methods: {
    ...mapActions({
      createComment: 'posts/createComment',
      updateComment: 'posts/updateComment',
      deleteComment: 'posts/deleteComment',
      createCommentReply: 'posts/createCommentReply',
      updateCommentReply: 'posts/updateCommentReply',
    }),

    async onSubmitForm(body) {
      this.isSubmittingForm = true;
      try {
        await this.createComment({
          postId: this.postId,
          data: { body },
        });
        this.isSubmittingForm = false;
      } catch (error) {
        console.log(error);
      }

      this.$refs.commentForm.onClear();
    },

    async onSubmitEditForm(commentId, body) {
      try {
        await this.updateComment({
          postId: this.postId,
          commentId,
          data: { body },
        });
      } catch (error) {
        console.log(error);
      }
    },

    onDelete(commentId) {
      this.deleteComment({
        postId: this.postId,
        commentId,
      });
    },

    async onSubmitReplyForm(commentId, body) {
      try {
        await this.createCommentReply({
          postId: this.postId,
          commentId,
          data: { body },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async onSubmitReplyEditForm(commentId, replyId, body) {
      try {
        await this.updateCommentReply({
          postId: this.postId,
          commentId,
          replyId,
          data: { body },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  &-form {
    margin-top: 20px;
  }

  &-box {
    margin-top: 40px;
  }
}
</style>