export default ($axios) => ({
  all() {
    return $axios.$get('/v1/posts');
  },

  find(postId) {
    return $axios.$get(`/v1/posts/${postId}`);
  },

  create(data) {
    return $axios.$post('/v1/posts', data);
  },

  update(postId, data) {
    return $axios.$post(`/v1/posts/${postId}`, data);
  },

  delete(postId) {
    return $axios.$delete(`/v1/posts/${postId}`);
  },

  allComments(postId) {
    return $axios.$get(`/v1/posts/${postId}/comments`);
  },

  createComment(postId, data) {
    return $axios.$post(`/v1/posts/${postId}/comments`, data);
  },

  updateComment(postId, commentId, data) {
    return $axios.$patch(`/v1/posts/${postId}/comments/${commentId}`, data);
  },

  deleteComment(postId, commentId) {
    return $axios.$delete(`/v1/posts/${postId}/comments/${commentId}`);
  },

  createCommentReply(postId, commentId, data) {
    return $axios.$post(
      `/v1/posts/${postId}/comments/${commentId}/replies`,
      data
    );
  },

  updateCommentReply(postId, commentId, replyId, data) {
    return $axios.$patch(
      `/v1/posts/${postId}/comments/${commentId}/replies/${replyId}`,
      data
    );
  },

  deleteCommentReply(postId, commentId, replyId) {
    return $axios.$delete(
      `/v1/posts/${postId}/comments/${commentId}/replies/${replyId}`
    );
  },
});
