export const state = () => ({
  posts: [],
  post: {},
});

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },

  SET_POST(state, post) {
    state.post = post;
  },
};

export const actions = {
  async getPosts({ commit }) {
    const { data } = await this.$services.postService.all();
    commit('SET_POSTS', data.posts);
  },

  async getPost({ commit, state }, postId) {
    let post = state.posts.find((post) => post.id === postId);

    if (!post) {
      post = (await this.$services.postService.find(postId)).data.post;
    }

    commit('SET_POST', post);
  },

  async createPost({}, data) {
    await this.$services.postService.create(data);
  },

  async updatePost({ commit }, { postId, data }) {
    await this.$services.postService.update(postId, data);
    commit('SET_POST', {});
  },

  async deletePost({ commit }, postId) {
    await this.$services.postService.delete(postId);
    commit('SET_POST', {});
  },
};
