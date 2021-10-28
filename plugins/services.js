import postService from '@/services/postService';

export default ({ $axios }, inject) => {
  inject('services', {
    postService: postService($axios),
  });
};
