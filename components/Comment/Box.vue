<template>
  <div class="d-flex">
    <b-avatar class="mr-3" />
    <div>
      <strong class="d-block">{{ commentUser.name }}</strong>
      <p>{{ comment.body }}</p>
      <small class="text-secondary font-italic">
        {{ c_created_at }}
      </small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    commentUser: {
      type: Object,
      required: true,
    },
  },

  computed: {
    c_created_at() {
      return this.gmDatetimeHumanreadable(this.comment.created_at);
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
}
</style>