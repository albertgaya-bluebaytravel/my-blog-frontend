
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
    <small class="text-muted">{{ author }}</small>

    <div class="body">
      <p>{{ post.body }}</p>
    </div>

    <app-post-comment-list :postId="post.id" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppPostCommentList from '@/components/Posts/PostCommentList';

export default {
  components: { AppPostCommentList },

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
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    ...mapState({
      post: (state) => state.posts.post,
    }),

    author() {
      return this.post.user
        ? `Posted by: ${this.post.user.name} | ` +
            this.$moment(this.post.created_at).format('LLL')
        : null;
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
</style>