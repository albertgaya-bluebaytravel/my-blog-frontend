
<template>
  <div class="container my-5" v-if="post">
    <b-button to="/" class="back-button">
      <b-icon-arrow-left-short />
      Go back
    </b-button>

    <div
      v-if="post.image_full_url"
      :style="{ backgroundImage: `url(${post.image_full_url})` }"
      class="banner"
    ></div>

    <h1>{{ post.title }}</h1>
    <small class="text-muted">{{ c_author }}</small>

    <div class="body">
      <p>{{ post.body }}</p>
    </div>

    <app-strike-through-text class="comment-title" />

    <app-comment-form
      :isSubmitting="commentBox.isSubmitting"
      @onSubmit="onCommentBoxSubmit"
      v-if="gmIsAuthenticated"
      class="comment-form"
    />

    <app-comment-list :comments="comments" class="comment-list" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppCommentForm from '@/components/Comment/Form';
import AppCommentList from '@/components/Comment/List';
import AppStrikeThroughText from '@/components/Utilities/StrikeThroughText';

export default {
  components: { AppCommentForm, AppCommentList, AppStrikeThroughText },

  data() {
    return {
      commentBox: {
        isSubmitting: false,
      },
    };
  },

  async fetch({ store, params }) {
    try {
      await store.dispatch('posts/getPost', params.id);
      await store.dispatch('postsComments/getPostComments', params.id);
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    ...mapState({
      post: (state) => state.posts.post,
      comments: (state) => state.postsComments.postComments,
    }),

    c_author() {
      return this.post.user
        ? `Posted by: ${this.post.user.name} | ` +
            this.$moment(this.post.created_at).format('LLL')
        : null;
    },
  },

  methods: {
    ...mapActions({
      createPostComment: 'postsComments/createPostComment',
      getPostComments: 'postsComments/getPostComments',
    }),

    async onCommentBoxSubmit(body) {
      this.commentBox.isSubmitting = true;
      const postId = this.$route.params.id;

      try {
        await this.createPostComment({
          postId,
          data: { body },
        });
        this.commentBox.isSubmitting = false;
        await this.getPostComments(postId);
      } catch (error) {
        console.log(error);
      }

      this.$emit('onCommentBoxClear');
    },
  },
};
</script>

<style lang="scss" scoped>
.back-button {
  margin-bottom: 20px;
}

.banner {
  height: 300px;
  background-position: center;
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