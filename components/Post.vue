<template>
  <b-card no-body>
    <b-card-body>
      <b-card-title class="title" @click="onClickTitle">
        {{ post.title }}
      </b-card-title>
      <b-card-text>
        {{ c_body }}

        <small class="text-secondary font-italic d-block mt-3">
          {{ c_created_at }}
        </small>
      </b-card-text>
    </b-card-body>

    <template #footer>
      <div class="d-flex">
        <small>
          <b-icon-person-circle class="author-icon" /> {{ post.user.name }}
        </small>

        <div class="ml-auto">
          <b-icon-pencil-square
            v-show="showEdit"
            @click="onClickEdit"
            class="action-icon"
          />
          <b-icon-chat-dots-fill class="action-icon" />
        </div>
      </div>
    </template>
  </b-card>
</template>

<script>
export default {
  emits: ['onClickTitle', 'onClickEdit'],

  props: {
    post: {
      required: true,
      type: Object,
    },

    showEdit: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    c_body() {
      const strLength = 100;

      if (this.post.body.length < strLength) {
        return this.post.body;
      }

      let trimBody = this.post.body.substr(0, strLength);
      return trimBody.substr(0, trimBody.lastIndexOf(' ')) + ' ...';
    },

    c_created_at() {
      const datePost = this.$moment(this.post.created_at);
      const dateNow = this.$moment();

      return this.$moment(dateNow).diff(datePost, 'days') < 1
        ? datePost.fromNow()
        : datePost.format('LL');
    },
  },

  methods: {
    onClickTitle() {
      this.$emit('onClickTitle', this.post.id);
    },

    onClickEdit() {
      this.$emit('onClickEdit', this.post.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  cursor: pointer;
}

small {
  font-size: 0.8rem;

  .author-icon {
    transform: translateY(-1px);
  }
}

.action-icon {
  cursor: pointer;

  &:not(:first-child) {
    margin-left: 5px;
  }
}
</style>