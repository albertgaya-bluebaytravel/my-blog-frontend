
<template>
  <div class="container my-5" v-if="post">
    <b-button to="/" class="back-button">
      <b-icon-arrow-left-short />
      Go back
    </b-button>

    <h1>{{ post.title }}</h1>
    <small class="text-muted">{{ c_author }}</small>

    <div class="body">
      <p>{{ post.body }}</p>
    </div>

    <app-strike-through-text class="comment-title" />

    <app-comment-form
      :isSubmitting="commentBox.isSubmitting"
      @onSubmit="onCommentBoxSubmit"
      v-if="gm_is_authenticated"
      class="comment-form"
    />

    <app-comment-list :comments="comments" class="comment-list" />
  </div>
</template>

<script>
import AppCommentForm from '@/components/Comment/Form';
import AppCommentList from '@/components/Comment/List';
import AppStrikeThroughText from '@/components/Utilities/StrikeThroughText';

export default {
  components: { AppCommentForm, AppCommentList, AppStrikeThroughText },

  data() {
    return {
      post: null,
      comments: [],
      commentBox: {
        isSubmitting: false,
      },
    };
  },

  computed: {
    c_author() {
      return this.post.user
        ? `Posted by: ${this.post.user.name} | ` +
            this.$moment(this.post.created_at).format('LLL')
        : null;
    },
  },

  async beforeCreate() {
    this.post = await this.$axios
      .$get(`/v1/posts/${this.$route.params.id}`)
      .then((response) => response.data.post)
      .catch((error) => console.log(error));

    this.getComments();
  },

  methods: {
    onCommentBoxSubmit(body) {
      this.commentBox.isSubmitting = true;

      this.$axios
        .$post(`/v1/comments/posts/${this.$route.params.id}`, { body })
        .then(() => {
          this.commentBox.isSubmitting = false;
          this.getComments();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$emit('onCommentBoxClear');
        });
    },

    async getComments() {
      return await this.$axios
        .$get(`/v1/comments/posts/${this.post.id}`)
        .then((response) => (this.comments = response.data.comments))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.back-button {
  margin-bottom: 20px;
}

.body {
  margin-top: 40px;
}

.comment-title {
  margin-top: 50px;
}

.comment-form {
  margin-top: 20px;
}

.comment-list {
  margin-top: 40px;
}
</style>