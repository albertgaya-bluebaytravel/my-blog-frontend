export default ($axios) => ({
  allPostComments(postId) {
    return $axios.$get(`/v1/comments/posts/${postId}`);
  },

  createPostComment(postId, data) {
    return $axios.$post(`/v1/comments/posts/${postId}`, data);
  },

  updateComment(commentId, data) {
    return $axios.$patch(`/v1/comments/${commentId}`, data);
  },

  deleteComment(commentId) {
    return $axios.$delete(`/v1/comments/${commentId}`);
  },
});
