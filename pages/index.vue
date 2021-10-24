<template>
  <div class="container mt-5">
    <div class="post">
      <div v-for="post in posts" :key="post.id" class="post__box">
        <app-post
          :post="post"
          :showEdit="showEdit(post)"
          @onClickTitle="onClickTitle"
          @onClickEdit="onClickEdit"
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

  methods: {
    onClickTitle(id) {
      this.$router.push({ name: 'posts-id', params: { id } });
    },

    onClickEdit(id) {
      this.$router.push({ name: 'posts-id-edit', params: { id } });
    },

    showEdit(post) {
      return this.gm_is_authenticated && post.user.id === this.gm_login_user.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  grid-column: max-content;

  &__card {
    height: 100%;
    box-shadow: 0 0 1px 1px rgba(black, 0);
    position: relative;
    margin-top: 0;
    transition: all 0.3s ease-out;

    &:hover {
      box-shadow: 0 0 1px 1px rgba(black, 0.5);
      margin-top: -5px;
    }

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
