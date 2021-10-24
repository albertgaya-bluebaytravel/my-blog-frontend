<template>
  <div>
    <app-comment-box
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :commentUser="comment.user"
      class="comment-box"
    />
  </div>
</template>

<script>
import AppCommentBox from '@/components/Comment/Box';

export default {
  components: {
    AppCommentBox,
  },

  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-box:not(:last-child) {
  margin-bottom: 30px;
}
</style>