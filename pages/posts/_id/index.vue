
<template>
  <div class="container mt-5">
    <b-button to="/" class="back-button">
      <b-icon-arrow-left-short />
      Go back
    </b-button>

    <h1>{{ post.title }}</h1>
    <small class="text-muted">{{ c_author }}</small>

    <div class="body">
      <p>{{ post.body }}</p>
    </div>

    <app-comment-form
      :isSubmitting="commentBox.isSubmitting"
      @onSubmit="onCommentBoxSubmit"
      class="comment-form"
    />

    <app-comment-list class="comment-list" />
  </div>
</template>

<script>
import AppCommentForm from '@/components/Comment/Form';
import AppCommentList from '@/components/Comment/List';

export default {
  components: { AppCommentForm, AppCommentList },

  data() {
    return {
      post: {},
      commentBox: {
        isSubmitting: false,
      },
    };
  },

  computed: {
    c_author() {
      return this.post.user
        ? `Posted by: ${this.post.user.name} | ` +
            this.$moment(this.post.created_at).format('LL')
        : null;
    },
  },

  async asyncData({ $axios, route }) {
    const post = await $axios
      .$get(`/v1/posts/${route.params.id}`)
      .then((response) => response.data.post)
      .catch((error) => {
        console.log(error);
      });

    return { post };
  },

  methods: {
    onCommentBoxSubmit(body) {
      this.commentBox.isSubmitting = true;

      this.$axios
        .$post(`/v1/posts/${this.$route.params.id}/comments`, { body })
        .then(() => {
          this.commentBox.isSubmitting = false;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$emit('onCommentBoxClear');
        });
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

.comment-form {
  margin-top: 50px;
}

.comment-list {
  margin-top: 40px;
}
</style>