export default ($axios) => ({
  allPostComments(postId) {
    return $axios.$get(`/v1/comments/posts/${postId}`);
  },

  createPostComment(postId, data) {
    return $axios.$post(`/v1/comments/posts/${postId}`, data);
  },
});
