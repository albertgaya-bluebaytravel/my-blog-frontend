export const state = () => ({
  postComments: [],
});

export const mutations = {
  SET_POST_COMMENTS(state, postComments) {
    state.postComments = postComments;
  },
};

export const actions = {
  async getPostComments({ commit }, postId) {
    const { data } = await this.$services.postCommentService.all(postId);
    commit('SET_POST_COMMENTS', data.comments);
  },

  async createPostComment({}, { postId, data }) {
    await this.$services.postCommentService.create(postId, data);
  },

  async updatePostComment({}, { postId, commentId, data }) {
    await this.$services.postCommentService.update(postId, commentId, data);
  },

  async deletePostComment({}, { postId, commentId }) {
    await this.$services.postCommentService.delete(postId, commentId);
  },
};
