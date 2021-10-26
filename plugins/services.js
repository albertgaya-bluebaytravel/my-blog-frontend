import posts from '@/services/posts';
import comments from '@/services/comments';

export default ({ $axios }, inject) => {
  inject('services', {
    posts: posts($axios),
    comments: comments($axios),
  });
};
