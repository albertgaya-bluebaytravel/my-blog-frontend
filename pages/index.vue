<template>
  <div class="container mt-5">
    <div class="post">
      <div v-for="post in posts" :key="post.id" class="post__box">
        <nuxt-link
          v-if="gm_authorized && post.user.id === gm_login_user.id"
          :to="{ name: 'posts-id', params: { id: post.id } }"
          class="post__action"
        >
          <b-icon-pencil-square />
        </nuxt-link>
        <app-post
          :title="post.title"
          :body="post.body"
          :author="post.user.name"
          class="post__card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppPost from '@/components/Post';

export default {
  components: {
    AppPost,
  },

  data() {
    return {
      posts: [],
    };
  },

  mounted() {
    this.$axios.$get('/v1/posts').then(({ data }) => {
      this.posts = data.posts;
    });
  },
};
</script>

<style lang="scss" scoped>
.post {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  &__box {
    position: relative;
  }

  &__action {
    position: absolute;
    z-index: 1;
    right: 5px;
    top: 5px;
    color: inherit;
  }

  &__card {
    height: 100%;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
