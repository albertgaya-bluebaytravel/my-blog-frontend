export default {
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

  async getComments({ commit }, postId) {
    const response = await this.$services.postService.allComments(postId);
    commit('SET_COMMENTS', response.data.comments);
  },

  async createComment({ commit }, { postId, data }) {
    const response = await this.$services.postService.createComment(
      postId,
      data
    );
    commit('ADD_COMMENT', response.data.comment);
  },

  async updateComment({ commit }, { postId, commentId, data }) {
    const response = await this.$services.postService.updateComment(
      postId,
      commentId,
      data
    );
    commit('UPDATE_COMMENT', {
      id: commentId,
      comment: response.data.comment,
    });
  },

  deleteComment({ commit }, { postId, commentId }) {
    this.$services.postService.deleteComment(postId, commentId);
    commit('DELETE_COMMENT', commentId);
  },

  async createCommentReply({ commit }, { postId, commentId, data }) {
    const response = await this.$services.postService.createCommentReply(
      postId,
      commentId,
      data
    );

    commit('ADD_COMMENT_REPLY', {
      id: commentId,
      reply: response.data.comment,
    });
  },

  async updateCommentReply({ commit }, { postId, commentId, replyId, data }) {
    const response = await this.$services.postService.updateCommentReply(
      postId,
      commentId,
      replyId,
      data
    );

    commit('UPDATE_COMMENT_REPLY', {
      commentId,
      replyId,
      reply: response.data.comment,
    });
  },
};
