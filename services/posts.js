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
});
