export default ($axios) => ({
  all(postId) {
    return $axios.$get(`/v1/posts/${postId}/comments`);
  },

  create(postId, data) {
    return $axios.$post(`/v1/posts/${postId}/comments`, data);
  },

  update(postId, commentId, data) {
    return $axios.$patch(`/v1/posts/${postId}/comments/${commentId}`, data);
  },

  delete(postId, commentId) {
    return $axios.$delete(`/v1/posts/${postId}/comments/${commentId}`);
  },
});
