export default {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },

  SET_POST(state, post) {
    state.post = post;
  },

  SET_COMMENTS(state, comments) {
    state.comments = comments;
  },

  ADD_COMMENT(state, comment) {
    state.comments.unshift(comment);
  },

  UPDATE_COMMENT(state, { id, comment }) {
    const index = state.comments.findIndex((comment) => comment.id === id);
    state.comments.splice(index, 1, comment);
  },

  DELETE_COMMENT(state, id) {
    state.comments = state.comments.filter((comment) => comment.id !== id);
  },

  ADD_COMMENT_REPLY(state, { id, reply }) {
    const comment = state.comments.find((comment) => comment.id === id);
    const index = state.comments.findIndex((comment) => comment.id === id);

    comment.replies.unshift(reply);
    state.comments.splice(index, 1, comment);
  },

  UPDATE_COMMENT_REPLY(state, { commentId, replyId, reply }) {
    const comment = state.comments.find((comment) => comment.id === commentId);
    const commentIndex = state.comments.findIndex(
      (comment) => comment.id === commentId
    );
    const replyIndex = comment.replies.findIndex(
      (reply) => reply.id === replyId
    );

    comment.replies.splice(replyIndex, 1, reply);
    state.comments.splice(commentIndex, 1, comment);
  },

  DELETE_COMMENT_REPLY(state, { commentId, replyId }) {
    let comment = state.comments.find((comment) => comment.id === commentId);
    const index = state.comments.findIndex(
      (comment) => comment.id === commentId
    );

    comment.replies = comment.replies.filter((reply) => reply.id !== replyId);
    state.comments.splice(index, 1, comment);
  },
};
