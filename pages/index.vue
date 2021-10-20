<template>
  <div class="container mt-5">
    <div class="Post">
      <app-post
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :body="post.body"
        class="Post__card"
      />
    </div>
  </div>
</template>

<script>
import AppPost from '@/components/Post'

export default {
  components: {
    AppPost,
  },

  data() {
    return {
      posts: [],
    }
  },

  mounted() {
    this.$axios
      .$get('/v1/posts')

      .then(({ data }) => {
        this.posts = data.posts
      })
  },
}
</script>

<style lang="scss" scoped>
.Post {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  &__card {
    height: 100%;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
