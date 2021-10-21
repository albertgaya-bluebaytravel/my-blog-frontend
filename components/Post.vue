<template>
  <b-card :title="title">
    {{ c_body }}
    <small class="text-secondary font-italic d-block mt-3">{{
      c_created_at
    }}</small>

    <template #footer>
      <div class="d-flex">
        <small><b-icon-person-circle class="icon" /> {{ author }}</small>
        <b-icon-chat-dots-fill class="ml-auto" />
      </div>
    </template>
  </b-card>
</template>

<script>
export default {
  props: {
    author: {
      required: true,
      type: String,
    },
    body: {
      required: true,
      type: String,
    },
    created_at: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },

  computed: {
    c_body() {
      const strLength = 100;

      if (this.body.length < strLength) {
        return this.body;
      }

      let trimBody = this.body.substr(0, strLength);
      return trimBody.substr(0, trimBody.lastIndexOf(' ')) + ' ...';
    },

    c_created_at() {
      const datePost = this.$moment(this.created_at);
      const dateNow = this.$moment();

      return this.$moment(dateNow).diff(datePost, 'days') < 1
        ? datePost.fromNow()
        : datePost.format('LL');
    },
  },
};
</script>

<style lang="scss" scoped>
small {
  font-size: 0.8rem;

  .icon {
    transform: translateY(-1px);
  }
}
</style>