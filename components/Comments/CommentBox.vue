<template>
  <div>
    <div class="d-flex">
      <b-avatar class="mr-3" />
      <div class="w-100">
        <strong class="d-block">{{ comment.user.name }}</strong>

        <div v-if="!isEditting">
          <p>{{ comment.body }}</p>

          <div>
            <b-link v-if="canReply" @click="showReplyForm">Reply</b-link>
            <span v-if="canReply && (canEdit || canDelete)" class="text-light">
              |
            </span>
            <b-link v-if="canEdit" @click="showEditForm">Edit</b-link>
            <span v-if="canEdit" class="text-light">|</span>
            <b-link v-if="canDelete" @click="_onDelete" class="text-danger">
              Delete
            </b-link>
          </div>
        </div>

        <div v-else>
          <app-comment-form
            :isSubmitting="isSubmitting"
            :comment="comment"
            @onSubmit="_onSubmitEditForm"
            @onCancel="onCancel"
            canCancel
            placeholder=""
            ref="commentForm"
          />
        </div>

        <small class="text-secondary font-italic">
          {{ createdAt }}
        </small>

        <div v-if="reply.isEditting" class="mt-3">
          <app-comment-form
            :isSubmitting="reply.isSubmitting"
            @onSubmit="_onSubmitReplyForm"
            @onCancel="onReplyCancel"
            canCancel
            placeholder="Submit your replies"
          />
        </div>
      </div>
    </div>

    <div v-if="showReplies" class="reply">
      <app-comment-box
        v-for="comment in comment.replies"
        :key="comment.id"
        :comment="comment"
        :onSubmitEditForm="_onSubmitReplyEditForm"
        :onDelete="_onReplyDelete"
        :canEdit="canEditReply(comment)"
        :canDelete="canDeleteReply(comment)"
        class="reply-box"
      />
    </div>
  </div>
</template>

<script>
import AppCommentForm from '@/components/Comments/CommentForm';

export default {
  components: {
    AppCommentForm,
    AppCommentBox: () => import('@/components/Comments/CommentBox'),
  },

  props: {
    comment: {
      type: Object,
      required: true,
      default: () => ({
        user: {
          id: 0,
          name: '',
        },
        body: '',
        created_at: '',
        replies: () => [],
      }),
    },
    onSubmitEditForm: {
      type: Function,
      default: () => {},
    },
    onDelete: {
      type: Function,
      default: () => {},
    },
    canReply: {
      type: Boolean,
      default: false,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
    canEditReply: {
      type: Function,
      default: () => {},
    },
    canDeleteReply: {
      type: Function,
      default: () => {},
    },
    onSubmitReplyForm: {
      type: Function,
      default: () => {},
    },
    onSubmitReplyEditForm: {
      type: Function,
      default: () => {},
    },
    onReplyDelete: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      isEditting: false,
      isSubmitting: false,
      reply: {
        isEditting: false,
        isSubmitting: false,
      },
    };
  },

  computed: {
    createdAt() {
      return this.gmDatetimeHumanreadable(this.comment.created_at);
    },

    showReplies() {
      return this.comment.replies ? this.comment.replies.length > 0 : false;
    },
  },

  methods: {
    showEditForm() {
      this.isEditting = true;
    },

    async _onSubmitEditForm(body) {
      this.isSubmitting = true;
      await this.onSubmitEditForm(this.comment.id, body);
      this.body = body;
      this.isSubmitting = false;
      this.isEditting = false;
      this.$refs.commentForm.onClear();
    },

    onCancel() {
      this.isEditting = false;
    },

    _onDelete() {
      this.onDelete(this.comment.id);
    },

    showReplyForm() {
      this.reply.isEditting = true;
    },

    async _onSubmitReplyForm(body) {
      this.reply.isSubmitting = true;
      await this.onSubmitReplyForm(this.comment.id, body);
      this.reply.isSubmitting = false;
      this.reply.isEditting = false;
    },

    onReplyCancel() {
      this.reply.isEditting = false;
    },

    async _onSubmitReplyEditForm(replyId, data) {
      await this.onSubmitReplyEditForm(this.comment.id, replyId, data);
    },

    _onReplyDelete(replyId) {
      this.onReplyDelete(this.comment.id, replyId);
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
}

.reply {
  border-left: 1px solid #ccc;
  margin-left: 20px;
  margin-top: 15px;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 10px;

  .reply-box:not(:last-child) {
    margin-bottom: 30px;
  }
}
</style>