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
    const { data } = await this.$services.comments.allPostComments(postId);
    commit('SET_POST_COMMENTS', data.comments);
  },

  async createPostComment({}, { postId, data }) {
    await this.$services.comments.createPostComment(postId, data);
  },

  async updateComment({}, { commentId, data }) {
    await this.$services.comments.updateComment(commentId, data);
  },

  async deleteComment({}, commentId) {
    await this.$services.comments.deleteComment(commentId);
  },
};
