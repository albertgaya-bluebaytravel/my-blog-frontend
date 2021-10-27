import postService from '@/services/postService';
import postCommentService from '@/services/postCommentService';

export default ({ $axios }, inject) => {
  inject('services', {
    postService: postService($axios),
    postCommentService: postCommentService($axios),
  });
};
